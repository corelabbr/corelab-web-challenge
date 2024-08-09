import express from "express";
import ColorsController from "../controllers/ColorsController";

const colorRoutes = express.Router();

colorRoutes.get("/", ColorsController.getAllColors);

export default colorRoutes;