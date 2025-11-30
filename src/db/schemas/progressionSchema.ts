import { Schema } from 'mongoose';

export interface ProgressionInterface {
	burned_calories?: number;
	actual_weight?: number;
	score: number;
	ended_challenges: number;
	user_id: Schema.Types.ObjectId;
}

export function getProgressionSchema(): Schema<ProgressionInterface> {
	return new Schema<ProgressionInterface>(
		{
			burned_calories: {
				type: Number,
			},
			actual_weight: {
				type: Number,
			},
			score: {
				type: Number,
				required: true,
			},
			ended_challenges: {
				type: Number,
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
			collection: 'progressions',
			timestamps: {
				updatedAt: true,
			},
		}
	);
}
