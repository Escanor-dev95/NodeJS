import User from "../models/userModel";
import ApiResponse from "../utils/apiResponse";
import Role from "../models/roleModel";
import {RoleInterface, UserInterface} from "../db/schemas";
import {verifyId} from "../utils";
import {CrudFactory} from "../utils/crudFactory";

const userCRUD = new CrudFactory(User);

export async function getUsers(req : any, res: any) : Promise<UserInterface[]> {
    return userCRUD.getAll(req, res);
}

export async function getUser(req : any, res: any) : Promise<UserInterface> {
    return userCRUD.getOne(req, res);
}

export async function createUser(req:any, res:any) {
    if(!verifyId(req.body.role)) return ApiResponse.invalidId(res);

    const role : RoleInterface | null = await Role.findById(req.body.role);
    if(!role){
        return ApiResponse.notFound(res ,"No role found.");
    }
    return userCRUD.create(req,res);
}

export async function updateUser(req:any, res:any) {
    if(!verifyId(req.body.role)) return ApiResponse.invalidId(res);

    const role : RoleInterface | null = await Role.findById(req.body.role);
    if(!role){
        return ApiResponse.notFound(res ,"No role found.");
    }
    return userCRUD.update(req,res);
}

export async function deleteUser(req:any, res:any) {
    return userCRUD.delete(req,res);
}
