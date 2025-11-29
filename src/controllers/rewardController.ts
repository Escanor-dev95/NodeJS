import { CrudFactory } from '../utils/crudFactory';
import { RewardInterface } from '../db/schemas';
import Reward from '../models/rewardModel';

const rewardCRUD = new CrudFactory(Reward);

export async function getRewards(req: any, res: any): Promise<RewardInterface[]> {
	return rewardCRUD.getAll(req, res);
}

export async function getReward(req: any, res: any): Promise<RewardInterface> {
	return rewardCRUD.getOne(req, res);
}

export async function createReward(req: any, res: any): Promise<void> {
	return rewardCRUD.create(req, res);
}

export async function updateReward(req: any, res: any): Promise<void> {
	return rewardCRUD.update(req, res);
}

export async function deleteReward(req: any, res: any) {
	return rewardCRUD.delete(req, res);
}
