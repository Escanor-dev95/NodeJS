import { Schema } from 'mongoose';

export interface ProgressionInterface {
	burned_calories?: number;
	actual_weight?: number;
	score: number;
	ended_challenges: number;
	user: Schema.Types.ObjectId;
}

export function getProgressionSchema(): Schema<ProgressionInterface> {
	const schema = new Schema<ProgressionInterface>(
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
			user: {
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true,
				unique: true,
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

	// on s'assure qu'un utilisateur n'a qu'une seule progression
	// schema.index({ user: 1 }, { unique: true });

	return schema;
}
