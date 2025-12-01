import { Schema } from 'mongoose';

export interface ExerciceInterface {
	name: string;
	description?: string;
	muscle_group: string;
	difficulty: string;
    salle: Schema.Types.ObjectId;
    equipment?: Schema.Types.ObjectId;
}

export function getExerciceSchema(): Schema<ExerciceInterface> {
	return new Schema<ExerciceInterface>(
		{
			name: {
				type: String,
				required: true,
			},
			description: {
				type: String,
			},
			muscle_group: {
				type: String,
				required: true,
			},
			difficulty: {
				type: String,
				required: true,
			},
			salle: {
				type: Schema.Types.ObjectId,
				ref: 'Salle',
				required: true,
			},
			equipment: {
				type: Schema.Types.ObjectId,
				ref: 'Equipment',
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
