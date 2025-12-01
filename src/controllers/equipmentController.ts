import { CrudFactory } from '../utils/crudFactory';
import Equipment from '../models/equipmentModel';
import {EquipmentInterface, SalleInterface} from '../db/schemas';
import Salle from "../models/salleModel";
import ApiResponse from "../utils/apiResponse";
import {verifyId} from "../utils";

const equipmentCRUD = new CrudFactory(Equipment);

export async function getEquipments(req: any, res: any): Promise<EquipmentInterface[]> {
	return equipmentCRUD.getAll(req, res);
}

export async function getEquipment(req: any, res: any): Promise<EquipmentInterface> {
	return equipmentCRUD.getOne(req, res);
}

export async function getEquipmentBySalle(req: any, res: any): Promise<EquipmentInterface[]> {
    const id = req.params.id;
    if(!verifyId(id)) return ApiResponse.invalidId(res);

    const equipments : EquipmentInterface[] | null = await Equipment.find({ salle: id});
    if(!equipments || equipments.length === 0) return ApiResponse.notFound(res, "No equipments found");

    return ApiResponse.success(res, equipments);
}

export async function createEquipment(req: any, res: any): Promise<EquipmentInterface> {
    if(!verifyId(req.body.salle)) return ApiResponse.invalidId(res);

    const salle : SalleInterface | null = await Salle.findById(req.body.salle);
    if(!salle){
        return ApiResponse.notFound(res ,"No salle found.");
    }
    if(!salle.approved){
        return ApiResponse.conflict(res, "Cannot add equipment to a non-approved salle");
    }
    return equipmentCRUD.create(req, res);
}

export async function updateEquipment(req: any, res: any): Promise<EquipmentInterface> {
    if(!verifyId(req.body.salle)) return ApiResponse.invalidId(res);

    const salle : SalleInterface | null = await Salle.findById(req.body.salle);
    if(!salle){
        return ApiResponse.notFound(res ,"No salle found.");
    }
    if(!salle.approved){
        return ApiResponse.conflict(res, "Cannot add equipment to a non-approved salle");
    }

    return equipmentCRUD.update(req, res);
}

export async function deleteEquipment(req: any, res: any) : Promise<EquipmentInterface> {
	return equipmentCRUD.delete(req, res);
}

export async function deleteEquipmentBySalle(req: any, res: any): Promise<EquipmentInterface[]> {
    try {
        const salleId = req.params.id;
        if(!verifyId(salleId)) return ApiResponse.invalidId(res);

        const salle : SalleInterface | null = await Salle.findById(salleId);
        if (!salle) {
            return ApiResponse.notFound(res, "Salle not found.");
        }

        const result = await Equipment.deleteMany({ salle: salleId });

        return ApiResponse.success(res, result.deletedCount);
    } catch (err : any) {
        return ApiResponse.serverError(res);
    }
}
