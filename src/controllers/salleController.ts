import {SalleInterface, UserInterface} from '../db/schemas';
import { CrudFactory } from '../utils/crudFactory';
import Salle from '../models/salleModel';
import {verifyId} from "../utils";
import ApiResponse from "../utils/apiResponse";
import User from "../models/userModel";

const salleCRUD = new CrudFactory(Salle);

export async function getSalles(req: any, res: any): Promise<SalleInterface[]> {
	return salleCRUD.getAll(req, res);
}

export async function getSalle(req: any, res: any): Promise<SalleInterface> {
	return salleCRUD.getOne(req, res);
}

export async function createSalle(req: any, res: any): Promise<SalleInterface> {

    if(!verifyId(req.body.manager)) return ApiResponse.invalidId(res);

    const user : UserInterface | null = await User.findById(req.body.manager);
    if(!user){
        return ApiResponse.notFound(res ,"No user found.");
    }
    return salleCRUD.create(req, res);
}

export async function updateSalle(req: any, res: any): Promise<SalleInterface> {
    if(!verifyId(req.body.manager)) return ApiResponse.invalidId(res);

    const user : UserInterface | null = await User.findById(req.body.manager);
    if(!user){
        return ApiResponse.notFound(res ,"No user found.");
    }
    return salleCRUD.update(req, res);
}

export async function deleteSalle(req: any, res: any) : Promise<SalleInterface> {
	return salleCRUD.delete(req, res);
}
