import mongoose from "mongoose";
import {getRoleSchema} from "../db/schemas";

const Role = mongoose.model("Role", getRoleSchema());
export default Role;