export default class ApiResponse {

    static success(res : any, data : any, status : number = 200) {
        return res.status(status).json({
            success: true,
            data: data
        })
    }

    static error(res : any, message : string, status : number) {
        return res.status(status).json({
            success: false,
            error: message
        })
    }

    static serverError(res : any, message : string = "Server Error") {
        return this.error(res, message, 500)
    }

    static notFound(res: any, message: string = "Resource not found") {
        return this.error(res, message, 404);
    }

    static badRequest(res: any, message: string = "Bad request") {
        return this.error(res, message, 400);
    }

    static invalidId(res: any) {
        return this.error(res, "Invalid ID format", 400)
    }

    static conflict(res: any, message: string = "Conflict") {
        return this.error(res, message, 409);
    }
}