import { CrudFactory } from '../utils/crudFactory';
import { ChallengeInterface, ExerciceInterface, SalleInterface, UserInterface } from '../db/schemas';
import Challenge from '../models/challengeModel';

import ApiResponse from '../utils/apiResponse';
import { verifyId } from '../utils';
import User from '../models/userModel';
import Participation from '../models/participationModel';
import { Types } from 'mongoose';
import Exercice from '../models/exerciceModel';
import Salle from '../models/salleModel';

const challengeCRUD = new CrudFactory(Challenge);

export async function getChallenges(req: any, res: any): Promise<ChallengeInterface[]> {
	return challengeCRUD.getAll(req, res);
}

export async function getPublicChallenges(req: any, res: any): Promise<ChallengeInterface[]> {
	try {
		const challenges: ChallengeInterface[] = await Challenge.find({ isPublic: true });
		if (challenges && challenges.length === 0) return ApiResponse.notFound(res, 'No challenges found.');
		return ApiResponse.success(res, challenges);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}

export async function getChallenge(req: any, res: any): Promise<ChallengeInterface> {
	return challengeCRUD.getOne(req, res);
}

export async function getChallengeByUser(req: any, res: any): Promise<ChallengeInterface[]> {
	try {
		const userId = req.params.id;
		if (!verifyId(userId)) return ApiResponse.invalidId(res);

		const user: UserInterface | null = await User.findById(userId);
		if (!user) return ApiResponse.notFound(res, 'No user found.');

		const challenges: ChallengeInterface[] = await Challenge.find({ user: userId });
		if (challenges.length === 0) return ApiResponse.notFound(res, 'No challenge found.');
		return ApiResponse.success(res, challenges);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}

export async function createChallenge(req: any, res: any): Promise<void> {
	if (!verifyId(req.body.exercice) || !verifyId(req.body.salle) || !verifyId(req.body.user)) return ApiResponse.invalidId(res);

	const exercice: ExerciceInterface | null = await Exercice.findById(req.body.exercice);
	if (!exercice) {
		return ApiResponse.notFound(res, 'No exercice found.');
	}
	const salle: SalleInterface | null = await Salle.findById(req.body.salle);
	if (!salle) {
		return ApiResponse.notFound(res, 'No salle found.');
	}
	const user: UserInterface | null = await User.findById(req.body.user);
	if (!user) {
		return ApiResponse.notFound(res, 'No user found.');
	}

	return challengeCRUD.create(req, res);
}

export async function updateChallenge(req: any, res: any): Promise<void> {
	if (!verifyId(req.body.exercice) || !verifyId(req.body.salle) || !verifyId(req.body.user)) return ApiResponse.invalidId(res);

	const exercice: ExerciceInterface | null = await Exercice.findById(req.body.exercice);
	if (!exercice) {
		return ApiResponse.notFound(res, 'No exercice found.');
	}
	const salle: SalleInterface | null = await Salle.findById(req.body.salle);
	if (!salle) {
		return ApiResponse.notFound(res, 'No salle found.');
	}
	const user: UserInterface | null = await User.findById(req.body.user);
	if (!user) {
		return ApiResponse.notFound(res, 'No user found.');
	}

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

		const user = await User.findById(challenge.user);
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
		const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 5;

		const popularChallenges = await Participation.aggregate<{
			_id: Types.ObjectId;
			participationCount: number;
		}>([{ $group: { _id: '$challenge', participationCount: { $sum: 1 } } }, { $sort: { participationCount: -1 } }, { $limit: limit }]);

		const ids = popularChallenges.map((c) => c._id);

		const challenges = await Challenge.find({ _id: { $in: ids } }).lean<ChallengeInterface[]>();

		return ApiResponse.success(res, challenges);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}

export async function getChallengesByDifficulty(req: any, res: any): Promise<ChallengeInterface[]> {
	try {
		const difficulty = req.params.level;
		const challenges: ChallengeInterface[] = await Challenge.find({ difficulty: difficulty, approved: true });
		if (challenges.length === 0) return ApiResponse.notFound(res, `No challenges found with difficulty: ${difficulty}`);
		return ApiResponse.success(res, challenges);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}

export async function getChallengesByExercice(req: any, res: any): Promise<ChallengeInterface[]> {
	try {
		const exercice = req.params.id;
		if (!verifyId(exercice)) return ApiResponse.invalidId(res);
		const challenges: ChallengeInterface[] = await Challenge.find({ exercice: exercice });
		if (challenges.length === 0) return ApiResponse.notFound(res, `No challenges found for the given exercice.`);
		return ApiResponse.success(res, challenges);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}

export async function getChallengesByDuration(req: any, res: any): Promise<ChallengeInterface[]> {
	try {
		const minDuration = req.query.min ? parseInt(req.query.min as string, 10) : 0;
		const maxDuration = req.query.max ? parseInt(req.query.max as string, 10) : 100;
		const challenges: ChallengeInterface[] = await Challenge.find({ duration: { $gte: minDuration, $lte: maxDuration }, approved: true });
		if (challenges.length === 0) return ApiResponse.notFound(res, `No challenges found within the specified duration range.`);
		return ApiResponse.success(res, challenges);
	} catch (err: any) {
		return ApiResponse.serverError(res);
	}
}
