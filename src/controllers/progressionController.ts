import { CrudFactory } from '../utils/crudFactory';
import { ProgressionInterface } from '../db/schemas';
import Progression from '../models/progressionModel';

const progressionCRUD = new CrudFactory(Progression);

export async function getProgression(req: any, res: any): Promise<ProgressionInterface> {
	return progressionCRUD.getOne(req, res);
}

export async function createProgression(req: any, res: any): Promise<void> {
	return progressionCRUD.create(req, res);
}

export async function updateProgression(req: any, res: any): Promise<void> {
	return progressionCRUD.update(req, res);
}

export async function deleteProgression(req: any, res: any) {
	return progressionCRUD.delete(req, res);
}
