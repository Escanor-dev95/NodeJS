import { Schema } from 'mongoose';

export interface SalleInterface {
	name: string;
	address: string;
    email?: string;
    phone?: string;
	capacity: number;
	description: string;
	approved: boolean;
	manager: Schema.Types.ObjectId;
    _id?: string;
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
            email: {
                type: String,
                required: false,
            },
            phone: {
                type: String,
                required: false,
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
