import { type Express } from "express";
import mongoose from "mongoose";

// connection string do MongoDB
export async function connectDB(
  app: Express,
  databaseUrl: string,
  port: number,
): Promise<void> {
  try {
    await mongoose.connect(databaseUrl);
    app.listen(port, () => {
      console.log(`Connected to db. Listening on port ${port}`);
    });
  } catch (e) {
    console.log("Error connecting to db:", e);
    process.exit(1);
  }
}
