import { CrudFactory } from '../utils/crudFactory';
import { ChallengeInterface } from '../db/schemas';
import Challenge from '../models/challengeModel';
import ApiResponse from '../utils/apiResponse';
import { verifyId } from '../utils';
import User from '../models/userModel';
import Participation from '../models/participationModel';
import { Types } from 'mongoose';

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

export async function getUnapprovedChallenges(req: any, res: any): Promise<ChallengeInterface[]> {
	try {
		const unapprovedChallenges: ChallengeInterface[] = await Challenge.find({ approved: false });
		if (unapprovedChallenges.length === 0) return ApiResponse.notFound(res, 'No unapproved challenges found.');
		return ApiResponse.success(res, unapprovedChallenges);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}

export async function getApprovedChallenges(req: any, res: any): Promise<ChallengeInterface[]> {
	try {
		const approvedChallenges: ChallengeInterface[] = await Challenge.find({ approved: true });
		if (approvedChallenges.length === 0) return ApiResponse.notFound(res, 'No approved challenges found.');
		return ApiResponse.success(res, approvedChallenges);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}

export async function approveChallenge(req: any, res: any): Promise<ChallengeInterface> {
	try {
		const id = req.params.id;
		if (!verifyId(id)) return ApiResponse.invalidId(res);

		const challenge: ChallengeInterface | null = await Challenge.findOneAndUpdate({ _id: id, approved: false }, { approved: true }, { new: true });

		if (!challenge) return ApiResponse.conflict(res, 'Challenge already approved or not found');

		const user = await User.findById(challenge.user_id);
		if (!user) return ApiResponse.notFound(res, 'User not found.');
		user.score += 10;
		await user.save();

		return ApiResponse.success(res, challenge);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}

export async function getPopularChallenges(req: any, res: any): Promise<ChallengeInterface[]> {
	try {
		const limit = req.params.limit ? parseInt(req.params.limit, 10) : 5;

		const popularChallenges = await Participation.aggregate<{
			_id: Types.ObjectId;
			participationCount: number;
		}>([{ $group: { _id: '$challenge_id', participationCount: { $sum: 1 } } }, { $sort: { participationCount: -1 } }, { $limit: limit }]);

		const ids = popularChallenges.map((c) => c._id);

		const challenges = await Challenge.find({ _id: { $in: ids } }).lean<ChallengeInterface[]>();

		return ApiResponse.success(res, challenges);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}

export async function getChallengesByDifficulty(req: any, res: any): Promise<ChallengeInterface[]> {
	try {
		const difficulty = req.params.difficulty;
		const challenges: ChallengeInterface[] = await Challenge.find({ difficulty: difficulty, approved: true });
		if (challenges.length === 0) return ApiResponse.notFound(res, `No challenges found with difficulty: ${difficulty}`);
		return ApiResponse.success(res, challenges);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}

export async function getChallengesByExercise(req: any, res: any): Promise<ChallengeInterface[]> {
	try {
		const exercice_id = req.params.exercice_id;
		if (!verifyId(exercice_id)) return ApiResponse.invalidId(res);
		const challenges: ChallengeInterface[] = await Challenge.find({ exercice_id: exercice_id, approved: true });
		if (challenges.length === 0) return ApiResponse.notFound(res, `No challenges found for the given exercise.`);
		return ApiResponse.success(res, challenges);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}

export async function getChallengesByDuration(req: any, res: any): Promise<ChallengeInterface[]> {
	try {
		const minDuration = req.params.min;
		const maxDuration = req.params.max;
		const challenges: ChallengeInterface[] = await Challenge.find({ duration: { $gte: minDuration, $lte: maxDuration }, approved: true });
		if (challenges.length === 0) return ApiResponse.notFound(res, `No challenges found within the specified duration range.`);
		return ApiResponse.success(res, challenges);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}
