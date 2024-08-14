import { Request, Response } from 'express';
import pool from '../config/database';
import { Nota } from '../models/Nota';
import { error } from 'console';

export default class NotasController {

    public static async getNotas(req: Request, res: Response) {
        try {
            const result = await pool.query('SELECT * FROM notas');
            res.status(200).json(result.rows);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }

    public static async getNota(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await pool.query('SELECT * FROM notas WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Nota não encontrada' });
        }
            res.status(200).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }

    public static async createNota(req: Request, res: Response) {
        console.log(req);
        const { titulo, conteudo,cor_id, favorito }: Nota = req.body;
        try {
            const result = await pool.query(
                'INSERT INTO notas (titulo, conteudo,cor_id, favorito) VALUES ($1, $2, $3, $4) RETURNING *',
            [titulo, conteudo, cor_id, favorito]
        );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }

    public static async updateNota(req: Request, res: Response) {
        const { id } = req.params;
        const {titulo, conteudo, favorito, cor_id }: Nota = req.body;
        try {
            const result = await pool.query(
                'UPDATE notas SET titulo = $1, conteudo = $2, favorito = $3, cor_id = $4 WHERE id = $5 RETURNING *',
                [titulo, conteudo,favorito, cor_id, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Nota não encontrada' });
        }
        res.status(200).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }

    public static async deleteNota(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await pool.query('DELETE FROM notas WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Nota não encontrada' });
            }
            res.status(200).json({ message: 'Nota excluída com sucesso' });
            } catch (err) {
            res.status(500).json({ error: err });
        }
    }
}
