import fs from 'fs';
import path from 'path';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const migrationsDir = path.join(__dirname, '../migrations');

export async function runMigrations() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    // Cria a tabela de controle de migrações, se necessário
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        run_on TIMESTAMP DEFAULT NOW()
      );
    `);

    const files = fs
      .readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    for (const file of files) {
      const alreadyRan = await client.query(
        'SELECT 1 FROM migrations WHERE name = $1',
        [file]
      );

      if (alreadyRan.rowCount > 0) {
        console.log(`✔ Migração já executada: ${file}`);
        continue;
      }

      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
      console.log(`🚀 Executando migração: ${file}`);
      await client.query(sql);
      await client.query(
        'INSERT INTO migrations (name) VALUES ($1)',
        [file]
      );
    }

    console.log('✅ Todas as migrações aplicadas com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao rodar migrações:', err);
  } finally {
    await client.end();
  }
}
