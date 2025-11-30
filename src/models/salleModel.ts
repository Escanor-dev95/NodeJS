import mongoose from 'mongoose';
import { getSalleSchema } from '../db/schemas';

const Salle = mongoose.model('Salle', getSalleSchema());
export default Salle;
