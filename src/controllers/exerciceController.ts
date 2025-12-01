import { CrudFactory } from '../utils/crudFactory';
import {EquipmentInterface, ExerciceInterface, SalleInterface} from '../db/schemas';
import Exercice from '../models/exerciceModel';
import {verifyId} from "../utils";
import ApiResponse from "../utils/apiResponse";
import Salle from "../models/salleModel";
import Equipment from "../models/equipmentModel";

const exerciceCRUD = new CrudFactory(Exercice);

export async function getExercices(req: any, res: any): Promise<ExerciceInterface[]> {
	return exerciceCRUD.getAll(req, res);
}

export async function getExercice(req: any, res: any): Promise<ExerciceInterface> {
	return exerciceCRUD.getOne(req, res);
}

export async function getExerciceBySalle(req: any, res: any): Promise<ExerciceInterface[]> {
    try {
        const salleId = req.params.id;
        if(!verifyId(salleId)) return ApiResponse.invalidId(res);

        const salle : SalleInterface | null = await Salle.findById(salleId);
        if(!salle) return ApiResponse.notFound(res, "No salle found.");

        const exercices : ExerciceInterface[] = await Exercice.find({salle : salleId });
        if(exercices.length === 0) return ApiResponse.notFound(res, "No exercice found.");
        return ApiResponse.success(res, exercices);
    } catch (err : any) {
        return ApiResponse.serverError(res);
    }
}

export async function createExercice(req: any, res: any): Promise<ExerciceInterface> {
    if(!verifyId(req.body.salle)) return ApiResponse.invalidId(res);

    if(req.body.equipment != null && !verifyId(req.body.equipment)) return ApiResponse.invalidId(res);

    const salle : SalleInterface | null = await Salle.findById(req.body.salle);
    if(!salle){
        return ApiResponse.notFound(res ,"No salle found.");
    }

    if(req.body.equipment != null){
        const equipment : EquipmentInterface | null = await Equipment.findById(req.body.equipment);
        if(!equipment){
            return ApiResponse.notFound(res ,"No equipment found.");
        }
        if(equipment.salle.toString() !== salle._id?.toString()){
            return ApiResponse.conflict(res, "The equipment does not exist in the salle.");
        }
    }

    return exerciceCRUD.create(req, res);
}

export async function updateExercice(req: any, res: any): Promise<ExerciceInterface> {

    if(!verifyId(req.body.salle)) return ApiResponse.invalidId(res);

    if(req.body.equipment != null && !verifyId(req.body.equipment)) return ApiResponse.invalidId(res);

    const salle : SalleInterface | null = await Salle.findById(req.body.salle);
    if(!salle){
        return ApiResponse.notFound(res ,"No salle found.");
    }

    if(req.body.equipment != null){
        const equipment : EquipmentInterface | null = await Equipment.findById(req.body.equipment);
        if(!equipment){
            return ApiResponse.notFound(res ,"No equipment found.");
        }
        if(equipment.salle.toString() !== salle._id?.toString()){
            return ApiResponse.conflict(res, "The equipment does not exist in the salle.");
        }
    }

    return exerciceCRUD.update(req, res);
}

export async function deleteExercice(req: any, res: any) : Promise<ExerciceInterface> {
	return exerciceCRUD.delete(req, res);
}

export async function deleteExerciceBySalle(req: any, res: any): Promise<EquipmentInterface[]> {
    try {
        const salleId = req.params.id;
        if(!verifyId(salleId)) return ApiResponse.invalidId(res);

        const salle : SalleInterface | null = await Salle.findById(salleId);
        if (!salle) {
            return ApiResponse.notFound(res, "Salle not found.");
        }

        const result = await Exercice.deleteMany({ salle: salleId });

        return ApiResponse.success(res, result.deletedCount);
    } catch (err : any) {
        return ApiResponse.serverError(res);
    }
}