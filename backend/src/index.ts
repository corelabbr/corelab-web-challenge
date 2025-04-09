import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';
import cors from 'cors';
import { initDataBase } from './db/init';
import { runMigrations } from './db/migrate';

dotenv.config();

//const cors = require('cors')

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(router);


(async () => {
  await runMigrations(); 
  await initDataBase(); 

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
})();