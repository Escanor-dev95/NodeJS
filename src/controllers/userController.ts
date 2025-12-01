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

export async function getActiveUser(req : any, res: any) : Promise<UserInterface[]> {
    try {
        const users : UserInterface[] = await User.find({isActive : true});
        if(users && users.length === 0) return ApiResponse.notFound(res, "No users found.");
        return ApiResponse.success(res, users);
    } catch (err : any) {
        return ApiResponse.serverError(res);
    }
}

export async function createUser(req:any, res:any) : Promise<UserInterface> {
    if(!verifyId(req.body.role)) return ApiResponse.invalidId(res);

    const role : RoleInterface | null = await Role.findById(req.body.role);
    if(!role){
        return ApiResponse.notFound(res ,"No role found.");
    }
    return userCRUD.create(req,res);
}

export async function updateUser(req:any, res:any) : Promise<UserInterface> {
    if(!verifyId(req.body.role)) return ApiResponse.invalidId(res);

    const role : RoleInterface | null = await Role.findById(req.body.role);
    if(!role){
        return ApiResponse.notFound(res ,"No role found.");
    }
    return userCRUD.update(req,res);
}

export async function hideUser(req:any, res:any) : Promise<UserInterface> {
    try {
        const userId = req.params.id;
        if(!verifyId(userId)) return ApiResponse.invalidId(res);

        const user = await User.findOneAndUpdate(
            { _id: userId },
            {isActive : req.body.isActive}
        );
        if(!user) return ApiResponse.notFound(res, "No user found.");

        return ApiResponse.success(res, user);
    } catch (err : any) {
        if(err.code === 11000) return ApiResponse.conflict(res, "Duplicate key.");
        return ApiResponse.serverError(res);
    }
}

export async function deleteUser(req:any, res:any) : Promise<UserInterface> {
    return userCRUD.delete(req,res);
}
