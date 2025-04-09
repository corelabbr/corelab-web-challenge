import { Router } from 'express';
import NotasController from '../controllers/NotasController';
import CoresController from '../controllers/CoresController';

const router = Router();

router.get('/notas', NotasController.getNotas);
router.post('/create', NotasController.createNota);
router.put('/atualiza/:id', NotasController.updateNota);
router.delete('/excluir/:id', NotasController.deleteNota);

router.get('/cores', CoresController.getCores);

export default router;
