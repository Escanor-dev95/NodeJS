import {Schema} from "mongoose";

export interface User {
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    score : number;
    role: Schema.Types.ObjectId;
}

export function getUserSchema() : Schema<User>{
    return new Schema<User>({
        name : {
            type : String,
            required : true,
        },
        email : {
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
        score : {
            type : Number,
            default : 0
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true
        }
    }, {
        versionKey : false,
        collection : "users",
        timestamps : {
            updatedAt: true,
        }
    });
}