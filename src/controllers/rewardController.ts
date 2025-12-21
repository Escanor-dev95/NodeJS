import { CrudFactory } from '../utils/crudFactory';
import { BadgeInterface, RewardInterface, UserInterface } from '../db/schemas';
import Reward from '../models/rewardModel';
import { verifyId } from '../utils';
import ApiResponse from '../utils/apiResponse';
import User from '../models/userModel';
import Badge from '../models/badgeModel';
import badgeService from '../services/badgeService';
import mongoose, { Schema } from 'mongoose';

const rewardCRUD = new CrudFactory(Reward);

export async function getRewards(req: any, res: any): Promise<RewardInterface[]> {
	return rewardCRUD.getAll(req, res);
}

export async function getReward(req: any, res: any): Promise<RewardInterface> {
	return rewardCRUD.getOne(req, res);
}

async function validateRewardRequest(req: any, res: any) {
	if (!verifyId(req.body.user) || !verifyId(req.body.badge)) return ApiResponse.invalidId(res);

	const user: UserInterface | null = await User.findById(req.body.user);
	if (!user) {
		return ApiResponse.notFound(res, 'No user found.');
	}
	const badge: BadgeInterface | null = await Badge.findById(req.body.badge);
	if (!badge) {
		return ApiResponse.notFound(res, 'No badge found.');
	}
	const reward: RewardInterface[] = await Reward.find({ user: user, badge: badge });
	if (reward.length > 0) return ApiResponse.conflict(res, 'Unable to add the badge because the user already has it');

	return null;
}

export async function createReward(req: any, res: any): Promise<RewardInterface> {
	const error = await validateRewardRequest(req, res);
	if (error) return error;
	return rewardCRUD.create(req, res);
}

export async function updateReward(req: any, res: any): Promise<RewardInterface> {
	const error = await validateRewardRequest(req, res);
	if (error) return error;
	return rewardCRUD.update(req, res);
}

export async function deleteReward(req: any, res: any): Promise<RewardInterface> {
	return rewardCRUD.delete(req, res);
}

// ---

export async function listBadgesHandler(req: any, res: any) {
	try {
		const badges = await badgeService.listBadges();
		return ApiResponse.success(res, badges);
	} catch (err: any) {
		console.error('Error listing badges', err.message || err);
		return ApiResponse.serverError(res);
	}
}

export async function getRewardsByBadge(req: any, res: any) {
	try {
		const badgeId = req.params.id;
		if (!badgeId) return ApiResponse.badRequest(res, 'badgeId est requis');
		if (!verifyId(badgeId)) return ApiResponse.invalidId(res);

		const rewards: RewardInterface[] = await Reward.find({
			badge: badgeId,
			revoked: false,
		});

		return ApiResponse.success(res, rewards);
	} catch (err: any) {
		console.error('Error getting rewards by badge', err.message || err);
		return ApiResponse.serverError(res);
	}
}

export async function getUserRewardsHandler(req: any, res: any) {
	try {
		const id = req.params.id;
		if (!verifyId(id)) return ApiResponse.invalidId(res);
		const rewards = await badgeService.getUserRewards(id);
		return ApiResponse.success(res, rewards);
	} catch (err: any) {
		console.error('Error getting user rewards', err.message || err);
		return ApiResponse.serverError(res);
	}
}

export async function manualAwardHandler(req: any, res: any) {
	try {
		const { user, badge, context } = req.body || {};
		if (!user || !badge) return ApiResponse.badRequest(res, 'User and badge are required.');
		if (!verifyId(user)) return ApiResponse.invalidId(res);
		const result = await badgeService.manualAward(user, badge, context || {});
		if (result.created) return ApiResponse.success(res, result, 201);
		return ApiResponse.success(res, result);
	} catch (err: any) {
		if (err.message && err.message.indexOf('not found') !== -1) return ApiResponse.notFound(res, err.message);
		console.error("Erreur dans l'attribution du badge manuel", err.message);
		return ApiResponse.serverError(res);
	}
}
