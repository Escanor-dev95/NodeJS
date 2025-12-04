import { CrudFactory } from '../utils/crudFactory';
import { ParticipationInterface } from '../db/schemas';
import Participation from '../models/participationModel';
import badgeService from '../services/badgeService';
import Progression from '../models/progressionModel';
import Challenge from '../models/challengeModel';

const participationCRUD = new CrudFactory(Participation);

export async function getParticipations(req: any, res: any): Promise<ParticipationInterface[]> {
	return participationCRUD.getAll(req, res);
}

export async function getParticipation(req: any, res: any): Promise<ParticipationInterface> {
	return participationCRUD.getOne(req, res);
}

export async function createParticipation(req: any, res: any): Promise<void> {
	// on creé la participation
	const result = await participationCRUD.create(req, res);
	// on lance les rewards
	try {
		const body = req.body || {};
		const userId = body.user || (result && result._id ? result.user : null) || body.userId || body.user_id;
		if (userId && body.status && (body.status === 'completed' || body.finished === true)) {
			await badgeService.evaluateAndAwardBadgesForUser({ type: 'participation', userId: userId, participationId: (result && result._id) || undefined, challengeId: body.challenge || body.challenge_id });
		}
	} catch (err: any) {
		console.error('Badgdee evaluation error on participation create:', err.message || err);
	}

	return result;
}

export async function updateParticipation(req: any, res: any): Promise<void> {
	//const oldStatus = undefined;
	const result = await participationCRUD.update(req, res);
	// on lance les rewords
	try {
		const body = req.body || {};
		const userId = body.user || body.user_id;
		if (userId && (body.status && body.status === 'completed' || body.finished === true)) {
			await badgeService.evaluateAndAwardBadgesForUser({ type: 'participation', userId: userId, participationId: req.params.id, challengeId: body.challenge || body.challenge_id });
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
	try {
		const id = req.params.id;
		// valid
		//const { verifyId } = await import('../utils/verifyId');
		//if (!verifyId(id)) return (res.status(400).json({ success: false, error: 'Invalid ID format' }));

		const participation: any = await Participation.findById(id);
		if (!participation) return (res.status(404).json({ success: false, error: 'Participation not found' }));
		if (participation.finished) return (res.status(200).json({ success: true, data: participation }));

		participation.finished = true;
		await participation.save();

		// parcourir les challenges pour récupérer les points
		const challenge: any = await Challenge.findById(participation.challenge_id);
		const points = (challenge && challenge.winnable_points) ? Number(challenge.winnable_points) : 0;

		// metre a jour la progression de l'utilisateur
		const userId = participation.user_id;
		let progression: any = await Progression.findOne({ user_id: userId });
		if (!progression) {
			// créer une nouvelle progression
			progression = new Progression({ user_id: userId, score: points, ended_challenges: 1 });
			await progression.save();
		} else {
			progression.score = (Number(progression.score) || 0) + points;
			progression.ended_challenges = (Number(progression.ended_challenges) || 0) + 1;
			await progression.save();
		}

		// trigger evaluation des badges
		try {
			await badgeService.evaluateAndAwardBadgesForUser({ type: 'progression', userId: userId.toString(), progressionId: progression._id.toString(), points });
		} catch (err: any) {
			console.error('Badge evaluation error after finishing participation:', err.message || err);
		}

		return res.status(200).json({ success: true, data: { participation, progression } });
	} catch (err: any) {
		console.error('Error finishing participation:', err.message || err);
		return res.status(500).json({ success: false, error: 'Server Error' });
	}
}
