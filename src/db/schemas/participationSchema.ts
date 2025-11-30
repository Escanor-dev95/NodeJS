import { Schema } from 'mongoose';

export interface ParticipationInterface {
	user_id: Schema.Types.ObjectId;
	challenge_id: Schema.Types.ObjectId;
	finished: boolean;
}

export function getParticipationSchema(): Schema<ParticipationInterface> {
	return new Schema<ParticipationInterface>(
		{
			user_id: {
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
			challenge_id: {
				type: Schema.Types.ObjectId,
				ref: 'Challenge',
				required: true,
			},
			finished: {
				type: Boolean,
				default: false,
			},
		},
		{
			versionKey: false,
			collection: 'exercices',
			timestamps: {
				updatedAt: true,
			},
		}
	);
}
