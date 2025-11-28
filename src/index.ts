import express from 'express';
import {config} from "dotenv";
import { connectDB } from "./db";
import userRoutes from "./routes/userRoute";
import roleRoute from "./routes/roleRoute";

const app = express();

config({quiet: true});

app.use(express.json());

// Connexion Mongo
connectDB();

// Routes
app.use("/users", userRoutes);
app.use("/roles", roleRoute)

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on port ${process.env.API_PORT}`);
});
