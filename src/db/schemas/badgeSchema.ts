import { Schema } from 'mongoose';

export interface BadgeInterface {
	name: string;
	description: string;
	rule: string;
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
			rule: {
				type: String,
				required: true,
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
