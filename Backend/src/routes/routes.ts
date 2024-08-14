import { Router } from 'express';
import NotasController from '../controllers/NotasController';
import CoresController from '../controllers/CoresController';

const router = Router();

router.get('/notas', NotasController.getNotas);
router.get('/notas/:id', NotasController.getNota);
router.post('/notas', NotasController.createNota);
router.put('/notas/:id', NotasController.updateNota);
router.delete('/notas/:id', NotasController.deleteNota);

router.get('/cores', CoresController.getCores);

export default router;
