"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Note_1 = __importDefault(require("../models/Note"));
const titleValidation_1 = __importDefault(require("../helpers/validations/titleValidation"));
const contentValidation_1 = __importDefault(require("../helpers/validations/contentValidation"));
const booleanValidation_1 = __importDefault(require("../helpers/validations/booleanValidation"));
class NoteController {
    static async getData(req, res) {
        try {
            const data = await Note_1.default.find();
            const favoriteNotes = await data.filter((note) => note.favorite);
            const otherNotes = await data.filter((note) => !note.favorite);
            res.status(200).json({
                favoriteNotes,
                otherNotes
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Erro com o banco de dados.', error });
        }
    }
    static async getSearch(req, res) {
        const title = req.query.search;
        let data;
        if (!title) {
            data = await Note_1.default.find();
        }
        else {
            data = await Note_1.default.find({
                title: { $regex: title, $options: 'i' }
            });
        }
        const favoriteNotes = await data.filter((note) => note.favorite);
        const otherNotes = await data.filter((note) => !note.favorite);
        res.status(200).json({
            favoriteNotes,
            otherNotes
        });
    }
    static async createNote(req, res) {
        let { title, favorite, content } = req.body;
        title = title.trim();
        title = title.charAt(0).toUpperCase() + title.slice(1);
        content = content.trim();
        const validData = await Note_1.default.find({ title: title });
        if (validData.length > 0) {
            return res.status(409).json({
                message: "O título já existe.",
                type: "error",
            });
        }
        const validTitle = await (0, titleValidation_1.default)(title);
        if (validTitle !== "Valid title.") {
            return res.status(422).json({
                message: validTitle,
                type: "error",
            });
        }
        if (!(0, booleanValidation_1.default)(favorite)) {
            return res.status(422).json({
                message: "Tipo favorito não é o correto.",
                type: "error",
            });
        }
        const validContent = await (0, contentValidation_1.default)(content);
        if (validContent !== "Valid content.") {
            return res.status(422).json({
                message: validContent,
                type: "error",
            });
        }
        try {
            await Note_1.default.create({
                title: title,
                favorite: favorite,
                color: "#FFFFFF",
                content: content
            });
            res.status(201).json({
                message: "Anotação criada.",
                type: "success",
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
                type: "error",
            });
        }
    }
    static async updateNote(req, res) {
        let { _id, title, oldTitle, favorite, oldFavorite, content, oldContent } = req.body;
        title = title.trim();
        title = title.charAt(0).toUpperCase() + title.slice(1);
        content = content.trim();
        if (title === oldTitle && favorite === oldFavorite && content === oldContent) {
            return res.status(409).json({
                message: "Por favor, atualize uma informação antes.",
                type: "error",
            });
        }
        const validTitle = await (0, titleValidation_1.default)(title);
        if (validTitle !== "Valid title.") {
            return res.status(422).json({
                message: validTitle,
                type: "error",
            });
        }
        if (title !== oldTitle) {
            const validData = await Note_1.default.find({ title: title });
            if (validData.length > 0) {
                return res.status(409).json({
                    message: "O título já existe.",
                    type: "error",
                });
            }
        }
        const validContent = await (0, contentValidation_1.default)(content);
        if (validContent !== "Valid content.") {
            return res.status(422).json({
                message: validContent,
                type: "error",
            });
        }
        const data = {
            _id,
            title,
            favorite,
            content
        };
        try {
            await Note_1.default.findByIdAndUpdate(_id, data);
            res.status(200).json({
                message: "Anotação atualizada com sucesso!",
                type: "success",
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
                type: "error",
            });
        }
    }
    static async updateColor(req, res) {
        let { _id, color } = req.body;
        try {
            await Note_1.default.findByIdAndUpdate(_id, { color: color });
            res.status(200).json({
                message: "Cor da anotação atualizada!",
                type: "success",
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
                type: "error",
            });
        }
    }
    static async deleteNote(req, res) {
        const _id = req.params.id;
        try {
            await Note_1.default.deleteOne({ _id: _id });
            res.status(200).json({
                message: "Anotação deletada com sucesso!",
                type: "success",
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
                type: "error",
            });
        }
    }
}
exports.default = NoteController;
