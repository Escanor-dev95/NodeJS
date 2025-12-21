import { Schema } from 'mongoose';

export interface BadgeInterface {
	_id: Schema.Types.ObjectId;
	name: string;
	description: string;
	type: 'progression' | 'participation'; // Type de badge
	challenge?: Schema.Types.ObjectId; // Optionnel: ID du challenge pour les badges de participation
	category: 'burned_calories' | 'actual_weight' | 'score' | 'ended_challenges';
	criteria: number;
	operator: '>=' | '<=' | '==';
}

export function getBadgeSchema(): Schema<BadgeInterface> {
	return new Schema<BadgeInterface>(
		{
			name: {
				type: String,
				required: true,
			},
			description: {
				type: String,
				required: true,
			},
			type: {
				type: String,
				required: true,
				enum: ['progression', 'participation'],
			},
			challenge: {
				type: Schema.Types.ObjectId,
				ref: 'Challenge',
				required: false, // Requis seulement si type='participation'
			},
			category: {
				type: String,
				required: true,
				enum: ['burned_calories', 'actual_weight', 'score', 'ended_challenges'],
			},
			criteria: {
				type: Number, //10
				required: true,
			},
			operator: {
				type: String,
				required: true,
				enum: ['>=', '<=', '=='],
			},
		},
		{
			versionKey: false,
			collection: 'badges',
			timestamps: {
				updatedAt: true,
			},
		}
	);
}
