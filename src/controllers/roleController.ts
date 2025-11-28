import mongoose from "mongoose";
import ApiResponse from "../utils/apiResponse";
import Role from "../models/roleModel";

export async function getRoles(req : any, res: any) : Promise<any> {
    try {
        const roles = await Role.find();

        if (roles.length === 0) {
            return ApiResponse.notFound("No roles found.");
        }

        return ApiResponse.success(res, roles);
    } catch (err) {
        return ApiResponse.serverError(res);
    }
}

export async function getRole(req : any, res: any) : Promise<any> {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.role_id)) {
            return ApiResponse.invalidId(res);
        }

        const role = await Role.findById(req.params.role_id);

        if(!role){
            return ApiResponse.notFound(res ,"No role found.");
        }

        return ApiResponse.success(res, role);
    } catch (err) {
        return ApiResponse.serverError(res);
    }
}

export async function createRole(req:any, res:any) {
    try {
        const role = new Role(req.body);
        await role.save();
        return ApiResponse.success(res, role, 201);
    } catch (err : any) {
        return ApiResponse.serverError(res);
    }
}

export async function updateRole(req:any, res:any) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.role_id)) {
            return ApiResponse.invalidId(res);
        }

        const role = await Role.findOneAndUpdate(
            {_id : req.params.role_id},
            {$set : req.body},
            {new : true}
        );

        if(!role){
            return ApiResponse.notFound(res,"Role not found");
        }

        return ApiResponse.success(res, role);
    } catch (err : any){
        return ApiResponse.serverError(res);
    }
}

export async function deleteRole(req:any, res:any) {
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.role_id)) {
            return ApiResponse.invalidId(res);
        }

        const role = await Role.findOneAndDelete({_id : req.params.role_id});

        if(!role){
            return ApiResponse.notFound(res,"Role not found");
        }

        return ApiResponse.success(res, role);
    } catch (err : any){
        return ApiResponse.serverError(res);
    }
}
