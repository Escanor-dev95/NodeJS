import { Schema } from 'mongoose';

export interface RewardInterface {
	badge: Schema.Types.ObjectId;
	user: Schema.Types.ObjectId;
	awardedAt?: Date;
	context?: any;
	source?: string;
	revoked?: boolean;
}

export function getRewardSchema(): Schema<RewardInterface> {
	const schema = new Schema<RewardInterface>(
		{
			badge: {
				type: Schema.Types.ObjectId,
				ref: 'Badge',
				required: true,
			},
			user: {
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
			context: {
				type: Schema.Types.Mixed,
				default: {},
			},
			source: {
				type: String,
				enum: ['system', 'manual'],
				default: 'system',
			},
			revoked: {
				type: Boolean,
				default: false,
			},
		},
		{
			versionKey: false,
			collection: 'rewards',
			// on utilire la meme date pour la date d'optention du b
			timestamps: { createdAt: 'awardedAt', updatedAt: false },
		}
	);

	// on rend unique pour empecher les duplicata
	schema.index({ user: 1, badge: 1 }, { unique: true });

	return schema;
}
