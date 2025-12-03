import { Schema } from 'mongoose';

export interface ChallengeInterface {
	title: string;
	description?: string;
	difficulty: string;
	duration?: number;
	objectives: string[];
	recommended: boolean;
	winnable_points: number;
	salle_id: Schema.Types.ObjectId;
	user_id: string;
	exercice_id?: Schema.Types.ObjectId;
	approved?: boolean;
}

export function getChallengeSchema(): Schema<ChallengeInterface> {
	return new Schema<ChallengeInterface>(
		{
			title: {
				type: String,
				required: true,
			},
			description: {
				type: String,
			},
			difficulty: {
				type: String,
				required: true,
			},
			duration: {
				type: Number,
			},
			objectives: {
				type: [String],
				required: true,
			},
			recommended: {
				type: Boolean,
				default: false,
			},
			winnable_points: {
				type: Number,
				required: true,
			},
			salle_id: {
				type: Schema.Types.ObjectId,
				ref: 'Salle',
				required: true,
			},
			user_id: {
				type: String,
				ref: 'User',
				required: true,
			},
			exercice_id: {
				type: Schema.Types.ObjectId,
				ref: 'Exercice',
			},
			approved: {
				type: Boolean,
				default: false,
			},
		},
		{
			versionKey: false,
			collection: 'challenges',
			timestamps: {
				updatedAt: true,
			},
		}
	);
}
