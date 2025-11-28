import mongoose from "mongoose";
import {getUserSchema} from "../db/schemas";

const User = mongoose.model("User", getUserSchema());
export default User;