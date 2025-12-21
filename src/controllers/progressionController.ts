import { CrudFactory } from '../utils/crudFactory';
import { ProgressionInterface } from '../db/schemas';
import Progression from '../models/progressionModel';
import badgeService from '../services/badgeService';
import ApiResponse from '../utils/apiResponse';
import User from '../models/userModel';
import { verifyId } from '../utils';

const progressionCRUD = new CrudFactory(Progression);
export async function getProgressions(req: any, res: any): Promise<ProgressionInterface[]> {
	return progressionCRUD.getAll(req, res);
}

export async function getProgression(req: any, res: any): Promise<ProgressionInterface> {
	return progressionCRUD.getOne(req, res);
}

export async function getProgressionByUserId(req: any, res: any): Promise<ProgressionInterface[]> {
	const user = req.params.id;
	try {
		const progressions = await Progression.find({ user: user });
		if (!progressions) return ApiResponse.notFound(res, 'User not found.');
		if (progressions.length === 0) return ApiResponse.notFound(res, 'No progressions found for this user.');
		return ApiResponse.success(res, progressions);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}

export async function createProgression(req: any, res: any): Promise<void> {
	if (!verifyId(req.body.user)) return ApiResponse.invalidId(res);
	const user = await User.findById(req.body.user);
	if (!user) return ApiResponse.notFound(res, 'User not found.');
	const result = await progressionCRUD.create(req, res);
	try {
		const body = req.body || {};
		const user_id = body.user || (result && result._id ? result.user : null);
		if (user_id) {
			await badgeService.evaluateAndAwardBadgesForUser({ type: 'progression', user_id: user_id, progressionId: (result && result._id) || undefined });
		}
	} catch (err: any) {
		console.error("Erreur lors de l'évaluation de badges create echoué:", err.message || err);
	}
	return result;
}

export async function updateProgression(req: any, res: any): Promise<void> {
	if (!verifyId(req.body.user)) return ApiResponse.invalidId(res);
	const user = await User.findById(req.body.user);
	if (!user) return ApiResponse.notFound(res, 'User not found.');
	const result = await progressionCRUD.update(req, res);
	try {
		const body = req.body || {};
		const user_id = body.user;
		if (user_id) {
			await badgeService.evaluateAndAwardBadgesForUser({ type: 'progression', user_id: user_id, progressionId: req.params.id });
		}
	} catch (err: any) {
		console.error('Erreur lor de levaluation de badges update echoué :', err.message || err);
	}
	return result;
}

export async function deleteProgression(req: any, res: any) {
	return progressionCRUD.delete(req, res);
}
