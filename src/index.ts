import express from 'express';
import {config} from "dotenv";
import { connectDB } from "./db";
import userRoutes from "./routes/users";

const app = express();

config();

app.use(express.json());

// Connexion Mongo
connectDB();

// Routes
app.use("/users", userRoutes);

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on port ${process.env.API_PORT}`);
});
