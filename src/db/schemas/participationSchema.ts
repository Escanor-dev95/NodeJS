import { Schema } from 'mongoose';

export interface ParticipationInterface {
	user: Schema.Types.ObjectId;
	challenge: Schema.Types.ObjectId;
	finished: boolean;
}

export function getParticipationSchema(): Schema<ParticipationInterface> {
	return new Schema<ParticipationInterface>(
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
			challenge: {
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
			collection: 'participations',
			timestamps: {
				updatedAt: true,
			},
		}
	);
}
