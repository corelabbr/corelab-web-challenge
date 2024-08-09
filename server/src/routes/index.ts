import express from "express";
import colorRoutes from "./colorRoutes";
import taskRouter from "./taskRoutes";

const router = express.Router();

router.use("/tasks", taskRouter);
router.use("/colors", colorRoutes);

export default router;
