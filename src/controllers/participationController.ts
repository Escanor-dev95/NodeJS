import { CrudFactory } from '../utils/crudFactory';
import { ParticipationInterface } from '../db/schemas';
import Participation from '../models/participationModel';

const participationCRUD = new CrudFactory(Participation);

export async function getParticipations(req: any, res: any): Promise<ParticipationInterface[]> {
	return participationCRUD.getAll(req, res);
}

export async function getParticipation(req: any, res: any): Promise<ParticipationInterface> {
	return participationCRUD.getOne(req, res);
}

export async function createParticipation(req: any, res: any): Promise<void> {
	return participationCRUD.create(req, res);
}

export async function updateParticipation(req: any, res: any): Promise<void> {
	return participationCRUD.update(req, res);
}

export async function deleteParticipation(req: any, res: any) {
	return participationCRUD.delete(req, res);
}
