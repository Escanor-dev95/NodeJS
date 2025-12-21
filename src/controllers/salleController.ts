import { SalleInterface, UserInterface } from '../db/schemas';
import { CrudFactory } from '../utils/crudFactory';
import Salle from '../models/salleModel';
import { verifyId } from '../utils';
import ApiResponse from '../utils/apiResponse';
import User from '../models/userModel';

const salleCRUD = new CrudFactory(Salle);

export async function getSalles(req: any, res: any): Promise<SalleInterface[]> {
	return salleCRUD.getAll(req, res);
}

export async function getSalle(req: any, res: any): Promise<SalleInterface> {
	return salleCRUD.getOne(req, res);
}

export async function getSalleApproved(req: any, res: any): Promise<SalleInterface[]> {
	try {
		const sallesApproved: SalleInterface[] = await Salle.find({ approved: true });
		console.log(sallesApproved);
		if (sallesApproved.length === 0) {
			return ApiResponse.notFound(res, 'No salle approved');
		}
		return ApiResponse.success(res, sallesApproved);
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
	if (!user) {
		return ApiResponse.notFound(res, 'No user found.');
	}
	return salleCRUD.update(req, res);
}

export async function deleteSalle(req: any, res: any): Promise<SalleInterface> {
	return salleCRUD.delete(req, res);
}
