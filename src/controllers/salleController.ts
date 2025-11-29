import { SalleInterface } from '../db/schemas';
import { CrudFactory } from '../utils/crudFactory';
import Salle from '../models/salleModel';

const salleCRUD = new CrudFactory(Salle);

export async function getSalles(req: any, res: any): Promise<SalleInterface[]> {
	return salleCRUD.getAll(req, res);
}

export async function getSalle(req: any, res: any): Promise<SalleInterface> {
	return salleCRUD.getOne(req, res);
}

export async function createSalle(req: any, res: any): Promise<void> {
	return salleCRUD.create(req, res);
}

export async function updateSalle(req: any, res: any): Promise<void> {
	return salleCRUD.update(req, res);
}

export async function deleteSalle(req: any, res: any) {
	return salleCRUD.delete(req, res);
}
