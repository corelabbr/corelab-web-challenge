import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from 'cors'
import notesController from "./controllers/notes";

const app = express();
const port = 3333;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/notes', notesController);
app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`);
});