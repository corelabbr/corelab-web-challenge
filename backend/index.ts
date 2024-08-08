import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoDB from "./database/connect";
import noteRoutes from "./routes/note.routes";

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(cors({ credentials: true, origin: `${process.env.FRONT_HOST}` }));

app.use("/", noteRoutes);

mongoDB()
  .then(() => {
    const port = process.env.PORT ? Number(process.env.PORT) : 5000;
    app.listen(port);
  })
  .catch((error) => {
    console.log(error.message);
  });

export default app;