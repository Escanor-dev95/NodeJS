import { CrudFactory } from '../utils/crudFactory';
import { ChallengeInterface } from '../db/schemas';
import Challenge from '../models/challengeModel';

const challengeCRUD = new CrudFactory(Challenge);

export async function getChallenges(req: any, res: any): Promise<ChallengeInterface[]> {
	return challengeCRUD.getAll(req, res);
}

export async function getChallenge(req: any, res: any): Promise<ChallengeInterface> {
	return challengeCRUD.getOne(req, res);
}

export async function createChallenge(req: any, res: any): Promise<void> {
	return challengeCRUD.create(req, res);
}

export async function updateChallenge(req: any, res: any): Promise<void> {
	return challengeCRUD.update(req, res);
}

export async function deleteChallenge(req: any, res: any) {
	return challengeCRUD.delete(req, res);
}
