import mongoose from 'mongoose';
import { getExerciceSchema } from '../db/schemas';

const Exercice = mongoose.model('Exercice', getExerciceSchema());
export default Exercice;
