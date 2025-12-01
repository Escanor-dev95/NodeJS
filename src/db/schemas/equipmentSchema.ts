import { Schema } from 'mongoose';

export interface EquipmentInterface {
	name: string;
	max_weight?: number;
	quantity: number;
	salle: Schema.Types.ObjectId;
}

export function getEquipmentSchema(): Schema<EquipmentInterface> {
	return new Schema<EquipmentInterface>(
		{
			name: {
				type: String,
				required: true,
			},
			max_weight: {
				type: Number,
			},
			quantity: {
				type: Number,
				required: true,
			},
			salle: {
				type: Schema.Types.ObjectId,
				ref: 'Salle',
				required: true,
			},
		},
		{
			versionKey: false,
			collection: 'equipments',
			timestamps: {
				updatedAt: true,
			},
		}
	);
}
