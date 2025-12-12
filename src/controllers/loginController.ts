import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import privateKey from "../auth/private_key";
import ApiResponse from "../utils/apiResponse";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return ApiResponse.error(res, "Email et mot de passe requis.", 400);
        }
        // on recherche de l'utilisateur par email et peuplement du rôle
        const user = await User.findOne({ email }).populate("role");
        if (!user) {
            return ApiResponse.error(res, "Utilisateur non trouvé.", 404);
        }
        // correction du bug typage pour acceder au nom du role
        let roleName = "customer";
        if (user.role && typeof user.role === "object" && "name" in user.role) {
            roleName = (user.role as { name: string }).name;
        }
        // verification directe du mot de passe
        if (user.password !== password) {
            return ApiResponse.error(res, "Mot de passe incorrect.", 401);
        }
        // verification de l'activation du compte
        if (!user.isActive) {
            return ApiResponse.error(res, "Compte désactivé.", 403);
        }
        // Geeration du token avec le role
        const token = jwt.sign(
            {
                userId: user._id,
                role: roleName
            },
            privateKey,
            { expiresIn: "24h" }
        );
        return ApiResponse.success(res, {
            id: user._id,
            name: user.name,
            email: user.email,
            role: roleName,
            score: user.score,
            token
        });
    } catch (err) {
        return ApiResponse.error(res, "Erreur serveur lors de la connexion.", 500);
    }
};
