import express from "express";
import { connectDB } from "./utils/connect";
import todosRouter from "./routes/todosRouter";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = 4000;
const databaseUrl = process.env?.MONGODB_ENDPOINT;
if (databaseUrl === undefined) {
  throw new Error("Database URL not found");
}
void connectDB(app, databaseUrl, PORT);

app.use(express.json());
app.use(cors());

app.use("/api/v1/todos", todosRouter);
