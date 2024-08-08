"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const connect_1 = __importDefault(require("./database/connect"));
const note_routes_1 = __importDefault(require("./routes/note.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ credentials: true, origin: `${process.env.FRONT_HOST}` }));
app.use("/", note_routes_1.default);
(0, connect_1.default)()
    .then(() => {
    const port = process.env.PORT ? Number(process.env.PORT) : 5000;
    app.listen(port);
})
    .catch((error) => {
    console.log(error.message);
});
exports.default = app;
