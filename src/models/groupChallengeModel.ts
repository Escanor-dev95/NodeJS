import mongoose from 'mongoose';
import { getGroupChallengeSchema } from '../db/schemas';

const GroupChallenge = mongoose.model('GroupChallenge', getGroupChallengeSchema());
export default GroupChallenge;
