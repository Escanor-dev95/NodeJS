import mongoose from 'mongoose';
import { getProgressionSchema } from '../db/schemas';

const Progression = mongoose.model('Progression', getProgressionSchema());
export default Progression;
