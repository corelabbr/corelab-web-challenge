import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

//const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

