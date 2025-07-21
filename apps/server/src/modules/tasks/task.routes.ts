import { Router } from "express"
import { db } from "../../db";
import { Task, tasksTable } from "../../db/schema";
import { eq } from "drizzle-orm"
import { ApiResponse } from "../../types";
import { createTaskSchema, deleteTaskParamsSchema } from "./task.schemas";

const router: Router = Router();

router.get("/", async (req, res) => {
    // Get tasks from DB
    const allTasks = await db.select().from(tasksTable);

    // Return result
    res.status(200).json({
        success: true,
        data: allTasks
    } satisfies ApiResponse<Task[]>)
})

router.post("/", async (req, res) => {
    // Validate request body
    const parsedBody = createTaskSchema.safeParse(req.body);

    if (!parsedBody.success) {
        return res.status(400).json({
            success: false,
            message: parsedBody.error.message
        })
    }

    const { title } = parsedBody.data;

    // Insert to DB
    const inserted = await db.insert(tasksTable).values({
        title
    }).returning();


    // Return result
    res.status(201).json({
        success: true,
        data: inserted
    })
})

router.delete("/:id", async (req, res) => {
    // Validate params
    const parsedParams = deleteTaskParamsSchema.safeParse(req.params);

    if (!parsedParams.success) {
        return res.status(400).json({
            success: false,
            message: parsedParams.error.message,
        });
    }

    const { id } = parsedParams.data;

    // Delete task from DB
    const deleted = await db.delete(tasksTable).where(eq(tasksTable.id, id)).returning();


    // Return result
    res.status(200).json({
        success: true,
        data: deleted,
    });
})

export { router as tasksRouter }