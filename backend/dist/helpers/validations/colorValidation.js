"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colorValidation = async (color) => {
    if (!color) {
        return "Cor é requerido.";
    }
    const validColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!validColor.test(color)) {
        return "Formato invalido.";
    }
    return "Valid color.";
};
exports.default = colorValidation;
