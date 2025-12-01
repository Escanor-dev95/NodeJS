import express from 'express';
import {config} from "dotenv";
import { connectDB } from "./db";
import userRoutes from "./routes/userRoute";
import roleRoute from "./routes/roleRoute";
import salleRoute from "./routes/salleRoute";
import equipmentRoute from "./routes/equipmentRoute";

const app = express();

config({quiet: true});

app.use(express.json());

// Connexion Mongo
connectDB();

// Routes
app.use("/users", userRoutes);
app.use("/roles", roleRoute);
app.use("/salles", salleRoute);
app.use("/equipments", equipmentRoute);

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on port ${process.env.API_PORT}`);
});
