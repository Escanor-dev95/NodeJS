import Badge from '../models/badgeModel';
import Reward from '../models/rewardModel';
import Participation from '../models/participationModel';
import Progression from '../models/progressionModel';
import User from '../models/userModel';
import { Types } from 'mongoose';

export type BadgeEvent = {
	type: 'participation' | 'progression';
	userId: string;
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

async function awardBadgeToUser(userId: string, badgeId: string, context: any = {}, source: 'system' | 'manual' = 'system'): Promise<AwardResult> {
	// s'assurer que l'utilisateur et le badge existent
	const user = await User.findById(userId);
	if (!user) throw new Error('User not found');
	const badge = await Badge.findById(badgeId);
	if (!badge) throw new Error('Badge not found');

	try {
		const existing: any = await (Reward as any).findOne({ user: user._id, badge: badge._id });
		if (existing) {
			return { badgeId: badgeId, created: false, rewardId: existing._id.toString() };
		}

		const reward: any = new Reward({ user: user._id, badge: badge._id, context, source });
		await reward.save();
		return { badgeId: badgeId, created: true, rewardId: reward._id.toString() };
	} catch (err: any) {
		// duplication de clé unique
		if (err.code === 11000) {
			const existing: any = await (Reward as any).findOne({ user: userId, badge: badgeId });
			if (existing) return { badgeId: badgeId, created: false, rewardId: existing._id.toString() };
		}
		throw err;
	}
}

async function evaluateBadgeForEvent(badge: any, event: BadgeEvent): Promise<boolean> {
	// logique pour l'attribution des badges
	const criteria = badge.criteria || {};
	const type = criteria.type || badge.type || 'first_completion';

	switch (type) {
		case 'first_completion': {
			// award when user has at least 1 completed participation or a progression
			let uid: any = event.userId;
			if (Types.ObjectId.isValid(event.userId)) uid = new Types.ObjectId(event.userId);
			const partCount = await Participation.countDocuments({ user_id: uid, finished: true } as any);
			const progCount = await Progression.countDocuments({ user_id: uid } as any);
			return partCount + progCount > 0;
		}
		case 'n_completions': {
			const n = (criteria.params && criteria.params.n) || 1;
			let uid: any = event.userId;
			if (Types.ObjectId.isValid(event.userId)) uid = new Types.ObjectId(event.userId);
			const partCount = await Participation.countDocuments({ user_id: uid, finished: true } as any);
			const progCount = await Progression.countDocuments({ user_id: uid } as any);
			return partCount + progCount >= n;
		}
		case 'specific_challenge': {
			const target = criteria.params && criteria.params.challengeId;
			if (!target) return false;
			if (event.challengeId && event.challengeId.toString() === target.toString()) return true;
			// vérifier dans la base
			let uid: any = event.userId;
			if (Types.ObjectId.isValid(event.userId)) uid = new Types.ObjectId(event.userId);
			const found = await Participation.findOne({ user_id: uid, challenge_id: target.toString(), finished: true } as any);
			return !!found;
		}
		default:
			// critere inconnu
			return false;
	}
}

export async function evaluateAndAwardBadgesForUser(event: BadgeEvent): Promise<AwardResult[]> {
	// load candidate badges - for simplicity load all badges
	const badges = await (Badge as any).find();
	const results: AwardResult[] = [];

	for (const badge of badges) {
		try {
			const ok = await evaluateBadgeForEvent(badge, event);
			if (!ok) continue;

			const res = await awardBadgeToUser(event.userId, badge._id.toString(), { event }, 'system');
			results.push(res);
		} catch (err: any) {
			// log and continue
			console.error('Error evaluating/awarding badge', badge._id?.toString(), err.message || err);
		}
	}

	return results;
}

export async function listBadges() {
	return (Badge as any).find();
}

export async function getUserRewards(userId: string) {
	return (Reward as any).find({ user: userId }).populate('badge');
}

export async function manualAward(userId: string, badgeCodeOrId: string, context: any = {}) {
	let badge: any;
	if (Types.ObjectId.isValid(badgeCodeOrId)) {
		badge = await (Badge as any).findById(badgeCodeOrId);
	} else {
		badge = await (Badge as any).findOne({ code: badgeCodeOrId });
	}
	if (!badge) throw new Error('Badge not found');
	return awardBadgeToUser(userId, badge._id.toString(), context, 'manual');
}

export default {
	evaluateAndAwardBadgesForUser,
	listBadges,
	getUserRewards,
	manualAward,
};
