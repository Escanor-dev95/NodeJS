import { Schema } from 'mongoose';

export enum RoleName {
	ADMIN = 'admin',
	OWNER = 'owner',
	CUSTOMER = 'customer',
}

export interface RoleInterface {
	name: RoleName;
}

export function getRoleSchema(): Schema<RoleInterface> {
	return new Schema<RoleInterface>(
		{
			name: {
				type: String,
				enum: Object.values(RoleName),
				required: true,
			},
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
