import {Schema} from "mongoose";

export interface User {
    nickname: string;
    password: string;
    isActive: boolean;
}

export function getUserSchema() : Schema<User>{
    // new Schema
    // 1er paramètre -> La definition de la collection
    // 2eme paramètre -> les options
    return new Schema<User>({
        nickname : {
            type : String,
            required : true,
            unique : true
        },
        password: {
            type : String,
            required : true,
        },
        isActive : {
            type : Boolean,
            default: true
        },
    }, {
        versionKey : false,
        // nom de la table dans mongodb
        collection : "user",
        timestamps : {
            updatedAt: true,
        }
    });
}