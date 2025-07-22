import express, { Express } from 'express';
import { tasksRouter } from './modules/tasks/task.routes';
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://tasks-react-app-teq7.onrender.com",
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true,
    })
);

// Apply middlewares
app.use(express.json())

// Apply endpoint routers
app.use("/api/v1/tasks", tasksRouter)

export { app };