import { CrudFactory } from '../utils/crudFactory';
import { BadgeInterface } from '../db/schemas';
import Badge from '../models/badgeModel';
import badgeService from '../services/badgeService';
import User from '../models/userModel';
import Challenge from '../models/challengeModel';
import ApiResponse from '../utils/apiResponse';
import { verifyId } from '../utils';

const badgeCRUD = new CrudFactory(Badge);

export async function getBadges(req: any, res: any): Promise<BadgeInterface[]> {
	return badgeCRUD.getAll(req, res);
}

export async function getBadge(req: any, res: any): Promise<BadgeInterface> {
	return badgeCRUD.getOne(req, res);
}

export async function createBadge(req: any, res: any): Promise<BadgeInterface> {
	if (!verifyId(req.body.challenge)) return ApiResponse.invalidId(res);
	if (req.body.challenge) {
		const challenge = await Challenge.findById(req.body.challenge);
		if (!challenge) return ApiResponse.notFound(res, 'Challenge not found');
	}
	return badgeCRUD.create(req, res);
}

export async function updateBadge(req: any, res: any): Promise<BadgeInterface> {
	if (!verifyId(req.body.challenge)) return ApiResponse.invalidId(res);
	if (req.body.challenge) {
		const challenge = await Challenge.findById(req.body.challenge);
		if (!challenge) return ApiResponse.notFound(res, 'Challenge not found');
	}
	return badgeCRUD.update(req, res);
}

export async function deleteBadge(req: any, res: any): Promise<BadgeInterface> {
	return badgeCRUD.delete(req, res);
}

export async function recalculateBadges(req: any, res: any): Promise<void> {
	try {
		const users = await User.find({}, '_id');
		const results = [];
		for (const user of users) {
			const userResults = await badgeService.recalculateBadgesForUser(user._id.toString());
			results.push({ userId: user._id, results: userResults });
		}
		res.status(200).json({ success: true, data: results });
	} catch (err: any) {
		res.status(500).json({ success: false, error: err.message });
	}
}
