import User from "../models/userModel";
import mongoose from "mongoose";
import ApiResponse from "../utils/apiResponse";
import Role from "../models/roleModel";

export async function getUsers(req : any, res: any) : Promise<any> {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return ApiResponse.notFound("No users found.");
        }

        return ApiResponse.success(res, users);
    } catch (err) {
        return ApiResponse.serverError(res);
    }
}

export async function getUser(req : any, res: any) : Promise<any> {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.user_id)) {
            return ApiResponse.invalidId(res);
        }

        const user = await User.findById(req.params.user_id);

        if(!user){
            return ApiResponse.notFound(res ,"No user found.");
        }

        return ApiResponse.success(res, user);
    } catch (err) {
        return ApiResponse.serverError(res);
    }
}

export async function createUser(req:any, res:any) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.role)) {
            return ApiResponse.invalidId(res);
        }

        const role = await Role.findById(req.body.role);
        if(!role){
            return ApiResponse.notFound(res ,"No role found.");
        }

        const user = new User(req.body);
        await user.save();
        return ApiResponse.success(res, user, 201);
    } catch (err : any) {
        if(err.code === 11000) {
            return ApiResponse.conflict(res, "Email already exists.");
        }
        return ApiResponse.serverError(res);
    }
}

export async function updateUser(req:any, res:any) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.user_id) ||
            !mongoose.Types.ObjectId.isValid(req.body.role)) {
            return ApiResponse.invalidId(res);
        }

        const role = await Role.findById(req.body.role);
        if(!role){
            return ApiResponse.notFound(res ,"No role found.");
        }

        const user = await User.findOneAndUpdate(
            {_id : req.params.user_id},
            {$set : req.body},
            {new : true}
        );

        if(!user){
            return ApiResponse.notFound(res,"User not found");
        }

        return ApiResponse.success(res, user);
    } catch (err : any){
        if(err.code === 11000) {
            return ApiResponse.conflict(res, "Email already exists.");
        }
        return ApiResponse.serverError(res);
    }
}

export async function deleteUser(req:any, res:any) {
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.user_id)) {
            return ApiResponse.invalidId(res);
        }

        const user = await User.findOneAndDelete({_id : req.params.user_id});

        if(!user){
            return ApiResponse.notFound(res,"User not found");
        }

        return ApiResponse.success(res, user);
    } catch (err : any){
        return ApiResponse.serverError(res);
    }
}
