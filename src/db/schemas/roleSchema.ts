import {Schema} from "mongoose";

export interface RoleInterface {
    name: string;
}

export function getRoleSchema() : Schema<RoleInterface>{
    return new Schema<RoleInterface>({
        name : {
            type : String,
            required : true,
        },
    }, {
        versionKey : false,
        collection : "roles",
        timestamps : {
            updatedAt: true,
        }
    });
}