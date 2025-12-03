import { Schema } from 'mongoose';

export enum RoleName {
	admin = 'Admin',
	manager = 'Manager',
	customer = 'Customer',
}

export interface RoleInterface {
	name: RoleName;
}

export function getRoleSchema(): Schema<RoleInterface> {
	return new Schema<RoleInterface>(
		{
			name: { type: String, enum: Object.values(RoleName), required: true, unique: true },
		},
		{
			versionKey: false,
			collection: 'roles',
			timestamps: {
				updatedAt: true,
			},
		}
	);
}
