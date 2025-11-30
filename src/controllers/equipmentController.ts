import { CrudFactory } from '../utils/crudFactory';
import Equipment from '../models/equipmentModel';
import { EquipmentInterface } from '../db/schemas';

const equipmentCRUD = new CrudFactory(Equipment);

export async function getEquipments(req: any, res: any): Promise<EquipmentInterface[]> {
	return equipmentCRUD.getAll(req, res);
}

export async function getEquipment(req: any, res: any): Promise<EquipmentInterface> {
	return equipmentCRUD.getOne(req, res);
}

export async function createEquipment(req: any, res: any): Promise<void> {
	return equipmentCRUD.create(req, res);
}

export async function updateEquipment(req: any, res: any): Promise<void> {
	return equipmentCRUD.update(req, res);
}

export async function deleteEquipment(req: any, res: any) {
	return equipmentCRUD.delete(req, res);
}
