import express from 'express';
import { tasksRouter } from './modules/tasks/task.routes';
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Apply middlewares
app.use(express.json())

// Apply endpoint routers
app.use("/api/v1/tasks", tasksRouter)

export { app };