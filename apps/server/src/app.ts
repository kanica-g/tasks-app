import express, { Express } from 'express';
import { tasksRouter } from './modules/tasks/task.routes';
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();

const allowedOrigins = [
    "https://tasks-ui.herokuapp.com",
    "http://localhost:5173", // for local dev
];

app.use(cors({
    origin: allowedOrigins
}));

// Apply middlewares
app.use(express.json())

// Apply endpoint routers
app.use("/api/v1/tasks", tasksRouter)

export { app };