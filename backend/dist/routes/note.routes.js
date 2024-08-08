"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NoteController_1 = __importDefault(require("../controllers/NoteController"));
const router = (0, express_1.Router)();
router.get("/", NoteController_1.default.getData);
router.get("/search", NoteController_1.default.getSearch);
router.post("/", NoteController_1.default.createNote);
router.patch("/", NoteController_1.default.updateNote);
router.patch("/color", NoteController_1.default.updateColor);
router.delete("/:id", NoteController_1.default.deleteNote);
exports.default = router;
