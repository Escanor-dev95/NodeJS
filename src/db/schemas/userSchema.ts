import { Schema } from 'mongoose';

export interface UserInterface {
	name: string;
	email: string;
	password: string;
	isActive: boolean;
	score: number;
	role: Schema.Types.ObjectId;
	_id?: Schema.Types.ObjectId;
}

export function getUserSchema(): Schema<UserInterface> {
	return new Schema<UserInterface>(
		{
			name: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
				unique: true,
			},
			password: {
				type: String,
				required: true,
			},
			isActive: {
				type: Boolean,
				default: true,
			},
			score: {
				type: Number,
				default: 0,
			},
			role: {
				type: Schema.Types.ObjectId,
				ref: 'Role',
				required: true,
			},
		},
		{
			versionKey: false,
			collection: 'users',
			timestamps: {
				updatedAt: true,
			},
		}
	);
}
