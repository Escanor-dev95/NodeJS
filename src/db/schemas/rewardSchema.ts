import { Schema } from 'mongoose';

export interface RewardInterface {
	badge_id: Schema.Types.ObjectId;
	user_id: Schema.Types.ObjectId;
}

export function getRewardSchema(): Schema<RewardInterface> {
	return new Schema<RewardInterface>(
		{
			badge_id: {
				type: Schema.Types.ObjectId,
				ref: 'Badge',
				required: true,
			},
			user_id: {
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
