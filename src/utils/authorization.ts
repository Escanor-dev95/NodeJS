import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import privateKey from "../auth/private_key";
import ApiResponse from "./apiResponse";

export function authorizeRoles(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return ApiResponse.error(res, "Token manquant ou invalide.", 401);
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return ApiResponse.error(res, "Token manquant ou invalide.", 401);
        }
        try {
            const decoded = jwt.verify(token, privateKey as string) as any;
            if (!decoded || typeof decoded !== "object" || !decoded.userId || !decoded.role) {
                return ApiResponse.error(res, "Token invalide (structure incorrecte).", 401);
            }
            if (!allowedRoles.includes(decoded.role)) {
                return ApiResponse.error(res, "Accès refusé: rôle insuffisant.", 403);
            }
            // on les infos utilisateur à la requete pour usage ultérieur
            (req as any).user = decoded;
            next();
        } catch (err) {
            return ApiResponse.error(res, "Token invalide ou expiré.", 401);
        }
    };
}
