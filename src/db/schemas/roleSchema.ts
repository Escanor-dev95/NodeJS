import {Schema} from "mongoose";

export interface Role {
    name: string;
}

export function getRoleSchema() : Schema<Role>{
    return new Schema<Role>({
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