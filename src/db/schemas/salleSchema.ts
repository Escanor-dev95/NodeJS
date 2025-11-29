import { Schema } from 'mongoose';

export interface SalleInterface {
	name: string;
	address: string;
	capacity: number;
	description: string;
	approved: boolean;
	manager: Schema.Types.ObjectId;
}

export function getSalleSchema(): Schema<SalleInterface> {
	return new Schema<SalleInterface>(
		{
			name: {
				type: String,
				required: true,
			},
			address: {
				type: String,
				required: true,
			},
			capacity: {
				type: Number,
				required: true,
			},
			description: {
				type: String,
				required: true,
			},
			approved: {
				type: Boolean,
				default: false,
			},
			manager: {
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
		},
		{
			versionKey: false,
			collection: 'salles',
			timestamps: {
				updatedAt: true,
			},
		}
	);
}
