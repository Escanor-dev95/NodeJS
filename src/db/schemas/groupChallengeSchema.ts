import { Schema } from 'mongoose';

export interface GroupChallengeInterface {
	description: string;
	users_id: Schema.Types.ObjectId[];
}

export function getGroupChallengeSchema(): Schema<GroupChallengeInterface> {
	return new Schema<GroupChallengeInterface>(
		{
			description: {
				type: String,
				required: true,
			},
			users_id: [
				{
					type: Schema.Types.ObjectId,
					ref: 'User',
				},
			],
		},
		{
			versionKey: false,
			collection: 'groupChallenges',
			timestamps: {
				updatedAt: true,
			},
		}
	);
}
