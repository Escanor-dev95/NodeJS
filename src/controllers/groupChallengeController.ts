import { CrudFactory } from '../utils/crudFactory';
import { GroupChallengeInterface } from '../db/schemas';
import GroupChallenge from '../models/groupChallengeModel';

const groupChallengeCRUD = new CrudFactory(GroupChallenge);

export async function getGroupChallenges(req: any, res: any): Promise<GroupChallengeInterface[]> {
	return groupChallengeCRUD.getAll(req, res);
}

export async function getGroupChallenge(req: any, res: any): Promise<GroupChallengeInterface> {
	return groupChallengeCRUD.getOne(req, res);
}

export async function createGroupChallenge(req: any, res: any): Promise<void> {
	return groupChallengeCRUD.create(req, res);
}

export async function updateGroupChallenge(req: any, res: any): Promise<void> {
	return groupChallengeCRUD.update(req, res);
}

export async function deleteGroupChallenge(req: any, res: any) {
	return groupChallengeCRUD.delete(req, res);
}
