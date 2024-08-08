"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const Folder = mongoose_1.default.model("Note", new Schema({
    title: {
        type: String,
        require: true,
    },
    favorite: {
        type: Boolean,
        require: true,
    },
    color: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
}, { timestamps: true }));
exports.default = Folder;
