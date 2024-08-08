"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const titleValidation = async (title) => {
    if (!title) {
        return "Título é requerido.";
    }
    if (title.length < 3) {
        return "Ao menos 3 caracteres são necessários.";
    }
    if (title.length > 30) {
        return "Máximo de 30 caracteres permitido.";
    }
    return "Valid title.";
};
exports.default = titleValidation;
