import { CrudFactory } from '../utils/crudFactory';
import { ExerciceInterface } from '../db/schemas';
import Exercice from '../models/exerciceModel';

const exerciceCRUD = new CrudFactory(Exercice);

export async function getExercices(req: any, res: any): Promise<ExerciceInterface[]> {
	return exerciceCRUD.getAll(req, res);
}

export async function getExercice(req: any, res: any): Promise<ExerciceInterface> {
	return exerciceCRUD.getOne(req, res);
}

export async function createExercice(req: any, res: any): Promise<void> {
	return exerciceCRUD.create(req, res);
}

export async function updateExercice(req: any, res: any): Promise<void> {
	return exerciceCRUD.update(req, res);
}

export async function deleteExercice(req: any, res: any) {
	return exerciceCRUD.delete(req, res);
}
