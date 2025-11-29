import mongoose from 'mongoose';
import { getRewardSchema } from '../db/schemas';

const Reward = mongoose.model('Reward', getRewardSchema());
export default Reward;
