import { CrudFactory } from '../utils/crudFactory';
import {ChallengeInterface, ExerciceInterface, SalleInterface, UserInterface} from '../db/schemas';
import Challenge from '../models/challengeModel';
import {verifyId} from "../utils";
import ApiResponse from "../utils/apiResponse";
import Exercice from "../models/exerciceModel";
import Salle from "../models/salleModel";
import User from "../models/userModel";

const challengeCRUD = new CrudFactory(Challenge);

export async function getChallenges(req: any, res: any): Promise<ChallengeInterface[]> {
	return challengeCRUD.getAll(req, res);
}

export async function getChallenge(req: any, res: any): Promise<ChallengeInterface> {
	return challengeCRUD.getOne(req, res);
}

export async function getChallengeByUser(req: any, res: any): Promise<ChallengeInterface[]> {
    try {
        const userId = req.params.id;
        if(!verifyId(userId)) return ApiResponse.invalidId(res);

        const user : UserInterface | null = await User.findById(userId);
        if(!user) return ApiResponse.notFound(res, "No user found.");

        const challenges : ChallengeInterface[] = await Challenge.find({user_id : userId });
        if(challenges.length === 0) return ApiResponse.notFound(res, "No challenge found.");
        return ApiResponse.success(res, challenges);
    } catch (err : any) {
        return ApiResponse.serverError(res);
    }
}

export async function createChallenge(req: any, res: any): Promise<void> {
    if(!verifyId(req.body.exercice_id)
        || !verifyId(req.body.salle_id)
        || !verifyId(req.body.user_id)
    ) return ApiResponse.invalidId(res);

    const exercice : ExerciceInterface | null = await Exercice.findById(req.body.exercice_id);
    if(!exercice){
        return ApiResponse.notFound(res ,"No exercice found.");
    }
    const salle : SalleInterface | null = await Salle.findById(req.body.salle_id);
    if(!salle){
        return ApiResponse.notFound(res ,"No salle found.");
    }
    const user : UserInterface | null = await User.findById(req.body.user_id);
    if(!user){
        return ApiResponse.notFound(res ,"No user found.");
    }

    return challengeCRUD.create(req, res);
}

export async function updateChallenge(req: any, res: any): Promise<void> {
	return challengeCRUD.update(req, res);
}

export async function deleteChallenge(req: any, res: any) {
	return challengeCRUD.delete(req, res);
}
