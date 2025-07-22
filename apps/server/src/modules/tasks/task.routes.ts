import { Router } from "express"
import { db } from "../../db";
import { Task, tasksTable } from "../../db/schema";
import { eq, asc } from "drizzle-orm"
import { ApiResponse } from "../../types";
import { createTaskSchema, deleteTaskParamsSchema, patchTaskParamsSchema, patchTaskSchema } from "./task.schemas";

const router: Router = Router();

router.get("/", async (req, res) => {
    // Get tasks from DB
    const allTasks = await db.select().from(tasksTable).orderBy(asc(tasksTable.createdAt));

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

router.patch("/:id", async (req, res) => {
    // Validate params
    const parsedParams = patchTaskParamsSchema.safeParse(req.params);

    if (!parsedParams.success) {
        return res.status(400).json({
            success: false,
            message: parsedParams.error.message,
        });
    }

    const { id } = parsedParams.data;

    // Validate body
    const parsedBody = patchTaskSchema.safeParse(req.body);

    if (!parsedBody.success) {
        return res.status(400).json({
            success: false,
            message: parsedBody.error.message,
        });
    }

    const { done } = parsedBody.data;


    // Patch task
    const updated = await db
        .update(tasksTable)
        .set({ done })
        .where(eq(tasksTable.id, id))
        .returning();

    // Return updated task
    res.status(200).json({ success: true, data: updated });
});

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