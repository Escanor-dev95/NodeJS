import mongoose from 'mongoose';
import { getParticipationSchema } from '../db/schemas';

const Participation = mongoose.model('Participation', getParticipationSchema());
export default Participation;
