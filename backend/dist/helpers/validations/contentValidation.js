"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contentValidation = async (content) => {
    if (!content) {
        return "Conteúdo é requirido.";
    }
    if (content.length < 2) {
        return "Ao menos 2 caracteres são necessários.";
    }
    return "Valid content.";
};
exports.default = contentValidation;
