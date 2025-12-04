import { CrudFactory } from '../utils/crudFactory';
import { ProgressionInterface } from '../db/schemas';
import Progression from '../models/progressionModel';
import badgeService from '../services/badgeService';

const progressionCRUD = new CrudFactory(Progression);

export async function getProgression(req: any, res: any): Promise<ProgressionInterface> {
	return progressionCRUD.getOne(req, res);
}

export async function createProgression(req: any, res: any): Promise<void> {
	const result = await progressionCRUD.create(req, res);
	try {
		const body = req.body || {};
		const userId = body.user || (result && result._id ? result.user : null);
		if (userId) {
			await badgeService.evaluateAndAwardBadgesForUser({ type: 'progression', userId: userId, progressionId: (result && result._id) || undefined });
		}
	} catch (err: any) {
		console.error('Erreur lor de levaluation de badges create echoué:', err.message || err);
	}
	return result;
}

export async function updateProgression(req: any, res: any): Promise<void> {
	const result = await progressionCRUD.update(req, res);
	try {
		const body = req.body || {};
		const userId = body.user;
		if (userId) {
			await badgeService.evaluateAndAwardBadgesForUser({ type: 'progression', userId: userId, progressionId: req.params.id });
		}
	} catch (err: any) {
		console.error('Erreur lor de levaluation de badges update echoué :', err.message || err);
	}
	return result;
}

export async function deleteProgression(req: any, res: any) {
	return progressionCRUD.delete(req, res);
}
