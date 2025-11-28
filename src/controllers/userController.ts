import User from "../models/userModel";
import UserModel from "../models/userModel";
import mongoose from "mongoose";
import ApiResponse from "../utils/apiResponse";

export async function getUsers(req : any, res: any) : Promise<any> {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return ApiResponse.notFound("No users found.");
        }

        return ApiResponse.succes(res, users);
    } catch (err) {
        return ApiResponse.serverError(res);
    }
}

export async function createUser(req:any, res:any) {
    try {
        const user = new User(req.body);
        await user.save();
        return ApiResponse.succes(res, user, 201);
    } catch (err : any) {
        return ApiResponse.serverError(res);
    }
}

export async function updateUser(req:any, res:any) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.user_id)) {
            return ApiResponse.invalidId(res);
        }

        const user = await User.findOneAndUpdate(
            {_id : req.params.user_id},
            {$set : req.body},
            {new : true}
        );

        if(!user){
            return ApiResponse.notFound(res,"User not found");
        }

        return ApiResponse.succes(res, user);
    } catch (err : any){
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

        return ApiResponse.succes(res, user);
    } catch (err : any){
        return ApiResponse.serverError(res);
    }
}
