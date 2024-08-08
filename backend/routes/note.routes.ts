import { Router } from "express";
import NoteController from "../controllers/NoteController";

const router = Router();

router.get("/", NoteController.getData);
router.get("/search", NoteController.getSearch);
router.post("/", NoteController.createNote);
router.patch("/", NoteController.updateNote);
router.patch("/color", NoteController.updateColor);
router.delete("/:id", NoteController.deleteNote);

export default router;