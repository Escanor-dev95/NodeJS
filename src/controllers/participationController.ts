import { CrudFactory } from '../utils/crudFactory';
import { ChallengeInterface, ParticipationInterface } from '../db/schemas';
import Participation from '../models/participationModel';
import badgeService from '../services/badgeService';
import Progression from '../models/progressionModel';
import Challenge from '../models/challengeModel';
import ApiResponse from '../utils/apiResponse';
import { verifyId } from '../utils';

const participationCRUD = new CrudFactory(Participation);

export async function getParticipations(req: any, res: any): Promise<ParticipationInterface[]> {
	return participationCRUD.getAll(req, res);
}

export async function getParticipation(req: any, res: any): Promise<ParticipationInterface> {
	return participationCRUD.getOne(req, res);
}

export async function getParticipationsByChallenge(req: any, res: any): Promise<ParticipationInterface[]> {
	const challengeId = req.params.id;
	if (!challengeId || !verifyId(challengeId)) return ApiResponse.invalidId(res);
	try {
		const challenge: ChallengeInterface | null = await Challenge.findById(challengeId);
		if (!challenge) return ApiResponse.notFound(res, 'No challenge found.');
		const participations: ParticipationInterface[] = await Participation.find({ challenge: challengeId });
		if (participations && participations.length === 0) return ApiResponse.notFound(res, 'No participations found for this challenge.');
		return ApiResponse.success(res, participations);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}

export async function createParticipation(req: any, res: any): Promise<void> {
	const challenge = await Challenge.findById(req.body.challenge);
	if (!challenge) return ApiResponse.notFound(res, 'Challenge not found');
	// on creé la participation
	const result = await participationCRUD.create(req, res);
	// on lance les rewards
	try {
		const body = req.body || {};
		const user_id = body.user || (result && result._id ? result.user : null) || body.user_id;
		if (user_id && body.status && (body.status === 'completed' || body.finished === true)) {
			await badgeService.evaluateAndAwardBadgesForUser({
				type: 'participation',
				user_id: user_id,
				participationId: (result && result._id) || undefined,
				challengeId: body.challenge,
			});
		}
	} catch (err: any) {
		console.error('Badge evaluation error on participation create:', err.message || err);
	}

	return result;
}

export async function updateParticipation(req: any, res: any): Promise<void> {
	//const oldStatus = undefined;
	const result = await participationCRUD.update(req, res);
	// on lance les rewords
	try {
		const body = req.body || {};
		const user_id = body.user || body.user_id;
		if (user_id && ((body.status && body.status === 'completed') || body.finished === true)) {
			await badgeService.evaluateAndAwardBadgesForUser({ type: 'participation', user_id: user_id, participationId: req.params.id, challengeId: body.challenge || body.challenge });
		}
	} catch (err: any) {
		console.error('Badge evaluation error on participation update:', err.message || err);
	}

	return result;
}

export async function deleteParticipation(req: any, res: any) {
	return participationCRUD.delete(req, res);
}

// Un fois qu'une participation est finie, on met a jour la progression de l'utilisateur
export async function finishParticipation(req: any, res: any) {
	if (!req.params.id || !verifyId(req.params.id)) return ApiResponse.invalidId(res);
	try {
		const id = req.params.id;
		const participation: any = await Participation.findById(id);

		if (!participation) return res.status(404).json({ success: false, error: 'Participation not found' });
		if (participation.finished) return res.status(200).json({ success: true, data: participation });

		participation.finished = true;
		await participation.save();

		// parcourir les challenges pour récupérer les points
		const challenge: any = await Challenge.findById(participation.challenge);
		const points = challenge && challenge.winnable_points ? Number(challenge.winnable_points) : 0;

		// metre a jour la progression de l'utilisateur
		const user_id = participation.user_id;
		let progression: any = await Progression.findOne({ user_id: user_id });
		if (!progression) {
			// créer une nouvelle progression
			progression = new Progression({ user_id: user_id, score: points, ended_challenges: 1 });
			await progression.save();
		} else {
			progression.score = (Number(progression.score) || 0) + points;
			progression.ended_challenges = (Number(progression.ended_challenges) || 0) + 1;
			await progression.save();
		}

		// Déclencher l'évaluation des badges
		try {
			// 1. Événement pour les badges liés à CETTE participation spécifique
			await badgeService.evaluateAndAwardBadgesForUser({
				type: 'participation',
				user_id: user_id.toString(),
				participationId: participation._id.toString(),
				challengeId: participation.challenge.toString(),
			});

			// 2. Événement pour les badges liés à la progression globale
			await badgeService.evaluateAndAwardBadgesForUser({
				type: 'progression',
				user_id: user_id.toString(),
				progressionId: progression._id.toString(),
				points,
			});
		} catch (err: any) {
			console.error('Badge evaluation error after finishing participation:', err.message || err);
		}

		return res.status(200).json({ success: true, data: { participation, progression } });
	} catch (err: any) {
		console.error('Error finishing participation:', err.message || err);
		return res.status(500).json({ success: false, error: 'Server Error' });
	}
}
