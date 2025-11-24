import mongoose from "mongoose";
import {config} from "dotenv";

config();

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'rien');
        console.log("MongoDB connecté !");
    } catch (error) {
        console.error("Erreur connexion MongoDB :", error);
    }
}
