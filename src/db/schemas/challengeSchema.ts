import { Schema } from 'mongoose';

export interface ChallengeInterface {
	title: string;
	description?: string;
	difficulty: number;
	duration?: number;
	objectives: string[];
	calories: number;
	recommended: boolean;
	winnable_points: number;
	salle: Schema.Types.ObjectId;
	user: Schema.Types.ObjectId;
	exercice?: Schema.Types.ObjectId;
	approved: boolean;
	isPublic: boolean;
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
				type: Number,
				required: true,
				min: 0,
				max: 10,
			},
			duration: {
				type: Number,
			},
			objectives: {
				type: [String],
				required: true,
			},
			calories: {
				type: Number,
				required: true,
			},
			approved: {
				type: Boolean,
				default: false,
			},
			isPublic: {
				type: Boolean,
				default: true,
			},
			recommended: {
				type: Boolean,
				default: false,
			},
			winnable_points: {
				type: Number,
				required: true,
			},
			salle: {
				type: Schema.Types.ObjectId,
				ref: 'Salle',
				required: true,
			},
			user: {
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
			exercice: {
				type: Schema.Types.ObjectId,
				ref: 'Exercice',
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
