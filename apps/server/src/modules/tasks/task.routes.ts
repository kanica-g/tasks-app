import { Router } from "express"

const router: Router = Router();

const tasks = [];

router.get("/", (req, res) => {
    res.status(200).json({
        success: true
    })
})

router.post("/", (req, res) => {
    console.log(req.body);

    res.status(200).json({
        success: true
    })
})

export { router as tasksRouter }