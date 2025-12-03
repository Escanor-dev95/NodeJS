import { ChallengeInterface, SalleInterface, UserInterface } from '../db/schemas';
import { CrudFactory } from '../utils/crudFactory';
import Salle from '../models/salleModel';
import { verifyId } from '../utils';
import ApiResponse from '../utils/apiResponse';
import User from '../models/userModel';
import { createChallenge } from './challengeController';
import Challenge from '../models/challengeModel';
import { Model } from 'mongoose';
import { updateUser } from './userController';

const salleCRUD = new CrudFactory(Salle);

export async function getSalles(req: any, res: any): Promise<SalleInterface[]> {
	return salleCRUD.getAll(req, res);
}

export async function getSalle(req: any, res: any): Promise<SalleInterface> {
	return salleCRUD.getOne(req, res);
}

export async function getApprovedSalles(req: any, res: any): Promise<SalleInterface[]> {
	try {
		const approvedSalles: SalleInterface[] = await Salle.find({ approved: true });
		if (approvedSalles.length === 0) {
			return ApiResponse.notFound(res, 'No salle approved');
		}
		return ApiResponse.success(res, approvedSalles);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}

export async function approveSalle(req: any, res: any): Promise<SalleInterface> {
	try {
		const id = req.params.id;
		if (!verifyId(id)) return ApiResponse.invalidId(res);

		const salle: SalleInterface | null = await Salle.findOneAndUpdate({ _id: id, approved: false }, { approved: true }, { new: true });

		if (!salle) return ApiResponse.conflict(res, 'Salle already approved or not found');

		return ApiResponse.success(res, salle);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}

export async function createSalle(req: any, res: any): Promise<SalleInterface> {
	if (!verifyId(req.body.manager)) return ApiResponse.invalidId(res);

	const user: UserInterface | null = await User.findById(req.body.manager);
	if (!user) {
		return ApiResponse.notFound(res, 'No user found.');
	}
	return salleCRUD.create(req, res);
}

export async function updateSalle(req: any, res: any): Promise<SalleInterface> {
	if (!verifyId(req.body.manager)) return ApiResponse.invalidId(res);

	const user: UserInterface | null = await User.findById(req.body.manager);
	if (!user) return ApiResponse.notFound(res, 'No user found.');

	return salleCRUD.update(req, res);
}

export async function deleteSalle(req: any, res: any): Promise<SalleInterface> {
	return salleCRUD.delete(req, res);
}

export async function suggestChallenge(req: any, res: any): Promise<void> {
	try {
		const salleId = req.params.id;
		if (!verifyId(salleId)) return ApiResponse.invalidId(res);
		const salle: SalleInterface | null = await Salle.findById(salleId);
		if (!salle) return ApiResponse.notFound(res, 'Salle not found.');
		if (!salle._id) return ApiResponse.serverError(res);

		const challengeData = req.body as ChallengeInterface;
		challengeData.salle_id = salle._id;
		req.body = challengeData;

		const userId = challengeData.user_id;
		if (!verifyId(userId)) return ApiResponse.invalidId(res);
		const user: UserInterface | null = await User.findById(userId);
		if (!user) return ApiResponse.notFound(res, 'User not found.');
		// TODO: check if user is manager/owner of the salle
		await updateUser({ params: { id: userId }, body: user }, res);

		return createChallenge(req, res);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}
