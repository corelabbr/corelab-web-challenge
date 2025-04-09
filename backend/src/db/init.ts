import { Client } from "pg";
import dotenv from 'dotenv';
import coresJson from '../data/cores.json';

dotenv.config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

export async function initDataBase() {
    try {
        await client.connect();

        // Crio as tabelas se elas nao existem
        await client.query(`
            CREATE TABLE IF NOT EXISTS cores (
            id SERIAL PRIMARY KEY,
            cor VARCHAR(8)
        )`);

        await client.query(`
            CREATE TABLE IF NOT EXISTS notas (
            id SERIAL PRIMARY KEY,
            titulo VARCHAR(100) NOT NULL,
            conteudo TEXT,
            favorito BOOLEAN,
            cor_id INTEGER REFERENCES cores(id)
        )`);

        const res = await client.query(`SELECT COUNT(*) FROM cores`);
        const count = parseInt(res.rows[0].count);

        if(count === 0){
            console.log('Inserindo as cores ...');
            for( const c of coresJson ){
                await client.query(`INSERT INTO cores (cor) VALUES ($1)`, [c.toString()]);
            }
        } else {
            console.log('Ja existem as cores ... ');
        }

    } catch (error) {
        console.error('Erro ao iniciar o Banco de Dados: ', error);
    } finally {
        await client.end();
    }
    
}