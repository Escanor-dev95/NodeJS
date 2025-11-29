import mongoose from 'mongoose';
import { getEquipmentSchema } from '../db/schemas';

const Equipment = mongoose.model('Equipment', getEquipmentSchema());
export default Equipment;
