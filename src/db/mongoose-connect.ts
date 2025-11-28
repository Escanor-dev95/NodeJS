import {connect} from "mongoose";
import {config} from "dotenv";

config({quiet: true});

export function connectDB() {
    try {
        // vérifier que nos variables dans le .env existent
        const vars : string[] = ["MONGODB_URI", "MONGODB_USER", "MONGODB_PASSWORD", "MONGODB_DATABASE"]

        for(const varName of vars) {
            if(typeof process.env[varName] === "undefined") {
                throw new Error(`Missing ${varName} env variable`);
            }
        }

        return connect(process.env.MONGODB_URI!, {
            auth : {
                username : process.env.MONGODB_USER!,
                password : process.env.MONGODB_PASSWORD!,
            },
            authSource: "admin",
            dbName : process.env.MONGODB_DATABASE!,
        });
    } catch (error) {
        console.error("Erreur connexion MongoDB :", error);
    }
}
