import { Schema } from 'mongoose';

export interface RewardInterface {
	badge: Schema.Types.ObjectId;
	user: Schema.Types.ObjectId;
}

export function getRewardSchema(): Schema<RewardInterface> {
	return new Schema<RewardInterface>(
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
		},
		{
			versionKey: false,
			collection: 'rewards',
			timestamps: {
				updatedAt: true,
			},
		}
	);
}
