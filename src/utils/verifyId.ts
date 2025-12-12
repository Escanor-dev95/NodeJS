import mongoose from "mongoose";

export function verifyId(id : string) : boolean {
    return mongoose.Types.ObjectId.isValid(id);

}