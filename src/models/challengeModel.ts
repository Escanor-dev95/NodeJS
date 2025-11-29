import mongoose from 'mongoose';
import { getChallengeSchema } from '../db/schemas';

const Challenge = mongoose.model('Challenge', getChallengeSchema());
export default Challenge;
