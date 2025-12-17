import { BadgeInterface } from '../db/schemas';
import { ProgressionInterface } from '../db/schemas';
import Badge from '../models/badgeModel';
import Reward from '../models/rewardModel';
import Progression from '../models/progressionModel';
import User from '../models/userModel';
import { Types } from 'mongoose';

export type BadgeEvent = {
	type: 'participation' | 'progression';
	user_id: string;
	participationId?: string;
	progressionId?: string;
	challengeId?: string;
	exerciceId?: string;
	timestamp?: Date;
	points?: number;
};

export type AwardResult = {
	badgeId: string;
	created: boolean;
	rewardId?: string;
	reason?: string;
};

async function awardBadgeToUser(user_id: string, badgeId: string, context: any = {}, source: 'system' | 'manual' = 'system'): Promise<AwardResult> {
	if (!Types.ObjectId.isValid(user_id) || !Types.ObjectId.isValid(badgeId)) {
		throw new Error('Invalid ObjectId format');
	}

	const [user, badge] = await Promise.all([User.findById(user_id), Badge.findById(badgeId)]);

	if (!user) throw new Error('User not found');
	if (!badge) throw new Error('Badge not found');

	try {
		const existingReward = await Reward.findOne({ user: user._id as any, badge: badge._id as any }).lean();
		if (existingReward) {
			return { badgeId, created: false, rewardId: existingReward._id.toString() };
		}

		const reward = await Reward.create({ user: user._id, badge: badge._id, context, source } as any);
		return { badgeId, created: true, rewardId: (reward as any)._id.toString() };
	} catch (err: any) {
		if (err.code === 11000) {
			const existingReward = await Reward.findOne({ user: user._id as any, badge: badge._id as any }).lean();
			if (existingReward) {
				return { badgeId, created: false, rewardId: existingReward._id.toString() };
			}
			return { badgeId, created: false };
		}
		throw err;
	}
}

//Route l'évaluation du badge vers la bonne fonction en fonction de son type.
async function evaluateBadgeForEvent(badge: BadgeInterface, event: BadgeEvent): Promise<boolean> {
	// On ne traite que les événements pertinents pour le type de badge
	if (badge.type !== event.type) {
		return false;
	}

	switch (badge.type) {
		case 'progression':
			const userProgression = await Progression.findOne({ user_id: new Types.ObjectId(event.user_id) as any }).lean();
			if (!userProgression) return false;
			return evaluateProgressionBadge(badge, userProgression);

		case 'participation':
			return evaluateParticipationBadge(badge, event);

		default:
			return false;
	}
}

//Évalue un badge de type 'progression'
function evaluateProgressionBadge(badge: BadgeInterface, userProgression: ProgressionInterface): boolean {
	const { category, criteria, operator } = badge;

	if (!(category in userProgression)) {
		return false;
	}

	const userValue = userProgression[category as keyof ProgressionInterface];

	if (userValue === undefined || userValue === null || typeof userValue !== 'number') {
		return false;
	}

	switch (operator) {
		case '>=':
			return userValue >= criteria;
		case '<=':
			return userValue <= criteria;
		case '==':
			return userValue === criteria;
		default:
			console.warn(`Unknown operator "${operator}" for badge ${badge._id}`);
			return false;
	}
}

//Évalue un badge de type 'participation'.
function evaluateParticipationBadge(badge: BadgeInterface, event: BadgeEvent): boolean {
	// Ce badge nécessite-t-il de terminer un challenge spécifique ?
	if (badge.challenge_id) {
		// L'événement concerne-t-il le bon challenge ?
		return badge.challenge_id.toString() === event.challengeId?.toString();
	}
	// Logique future : on pourrait vérifier d'autres aspects de la participation ici.
	return false;
}

export async function evaluateAndAwardBadgesForUser(event: BadgeEvent): Promise<AwardResult[]> {
	// Optimisation : On ne charge que les badges pertinents pour le type d'événement.
	const candidateBadges = await Badge.find({ type: event.type }).lean() as BadgeInterface[];
	const results: AwardResult[] = [];

	for (const badge of candidateBadges) {
		try {
			if (await evaluateBadgeForEvent(badge, event)) {
				const res = await awardBadgeToUser(event.user_id, badge._id.toString(), { event }, 'system');
				results.push(res);
			}
		} catch (err: any) {
			console.error(`Error evaluating/awarding badge ${badge._id?.toString()} for user ${event.user_id}:`, err.message || err);
		}
	}

	return results;
}

export async function recalculateBadgesForUser(user_id: string): Promise<AwardResult[]> {
	const user = await User.findById(user_id).lean();
	if (!user) {
		throw new Error('User not found');
	}

	const event: BadgeEvent = {
		type: 'progression',
		user_id: user_id,
	};

	// On ne recalcule que les badges de progression
	return evaluateAndAwardBadgesForUser(event);
}

export async function listBadges() {
	return Badge.find().lean();
}

export async function getUserRewards(user_id: string) {
	return Reward.find({ user: new Types.ObjectId(user_id) as any }).populate('badge').lean();
}

export async function manualAward(user_id: string, badgeCodeOrId: string, context: any = {}) {
	let badge: BadgeInterface | null;
	if (Types.ObjectId.isValid(badgeCodeOrId)) {
		badge = await Badge.findById(badgeCodeOrId).lean() as BadgeInterface | null;
	} else {
		badge = await Badge.findOne({ code: badgeCodeOrId }).lean() as BadgeInterface | null;
	}
	if (!badge) throw new Error('Badge not found');
	return awardBadgeToUser(user_id, badge._id.toString(), context, 'manual');
}

export default {
	evaluateAndAwardBadgesForUser,
	listBadges,
	getUserRewards,
	manualAward,
	recalculateBadgesForUser,
};
