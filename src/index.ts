import express from 'express';
import {config} from "dotenv";

const app = express();

config();

app.get('/hello', (req, res) => {
    res.json({ message: 'Hello from backend 👋' });
});

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on port ${process.env.API_PORT}`);
});
