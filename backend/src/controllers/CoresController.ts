import { Request, Response } from 'express';
import pool from '../config/database';


export default class CoresController {

    public static async getCores(req: Request, res: Response) {
        try {
            const result = await pool.query('SELECT * FROM cores');
            res.status(200).json(result.rows);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
}