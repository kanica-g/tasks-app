import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
});

export const deleteTaskParamsSchema = z.object({
    id: z.coerce.number().int().positive("ID must be a positive integer"),
});