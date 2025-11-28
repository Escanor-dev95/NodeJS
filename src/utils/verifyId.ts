import mongoose from "mongoose";

export function verifyId(id : string) : boolean {
    if(!mongoose.Types.ObjectId.isValid(id)){
        return false;
    }
    return true;
}