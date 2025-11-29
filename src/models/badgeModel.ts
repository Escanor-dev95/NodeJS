import mongoose from 'mongoose';
import { getBadgeSchema } from '../db/schemas';

const Badge = mongoose.model('Badge', getBadgeSchema());
export default Badge;
