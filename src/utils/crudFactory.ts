import ApiResponse from "./apiResponse";
import {verifyId} from "./verifyId";

export class CrudFactory {
    readonly Model : any;

    constructor(Model : any) {
        this.Model = Model;
    }

    async getAll(req: any, res: any): Promise<any> {
        try {
            const items = await this.Model.find();
            if(items && items.length === 0) return ApiResponse.notFound(res, "No items found.");
            return ApiResponse.success(res, items);
        } catch (err : any) {
            return ApiResponse.serverError(res);
        }
    }

    async getOne(req: any, res: any): Promise<any> {
        try {
            const id = req.params.id;
            if(!verifyId(id)) return ApiResponse.invalidId(res);

            const item = await this.Model.findById(id);
            if(!item) return ApiResponse.notFound(res, "Not found.");

            return ApiResponse.success(res, item);
        } catch (err : any) {
            return ApiResponse.serverError(res);
        }
    }

    async create(req: any, res: any): Promise<any> {
        try {
            const item = new this.Model(req.body);
            await item.save();
            return ApiResponse.success(res, item, 201);
        } catch (err : any) {
            if(err.code === 11000) return ApiResponse.conflict(res, "Duplicate key.");
            return ApiResponse.serverError(res);
        }
    }

    async update(req: any, res: any): Promise<any> {
        try {
            const id = req.params.id;
            if(!verifyId(id)) return ApiResponse.invalidId(res);

            const item = await this.Model.findOneAndUpdate(
                { _id: id },
                req.body,
                { new: true }
            );
            if(!item) return ApiResponse.notFound(res, "Not found.");

            return ApiResponse.success(res, item);
        } catch (err : any) {
            if(err.code === 11000) return ApiResponse.conflict(res, "Duplicate key.");
            return ApiResponse.serverError(res);
        }
    }

    async delete(req: any, res: any): Promise<any> {
        try {
            const id = req.params.id;
            if(!verifyId(id)) return ApiResponse.invalidId(res);

            const item = await this.Model.findOneAndDelete(
                { _id: id }
            );
            if(!item) return ApiResponse.notFound(res, "Not found.");

            return ApiResponse.success(res, item);
        } catch (err : any) {
            return ApiResponse.serverError(res);
        }
    }
}