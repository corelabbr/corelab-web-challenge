import express from "express";
import { connectDB } from "../src/utils/connect";
import todosRouter from "../src/routes/todosRouter";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const mockApp = express();

const PORT = 5000;
const databaseUrl = process.env?.MONGODB_MOCK_ENDPOINT;
if (databaseUrl === undefined) {
  throw new Error("Database URL not found");
}
void connectDB(mockApp, databaseUrl, PORT);

mockApp.use(express.json());
mockApp.use(cors());

mockApp.use("/api/v1/todos", todosRouter);

export default mockApp;
