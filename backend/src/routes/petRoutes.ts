import { Router } from 'express';
import * as PetController from '../controllers/petController';

const router = Router();

router.get('/', PetController.listar);
router.post('/', PetController.criar);
router.put('/:id', PetController.atualizar);
router.delete('/:id', PetController.deletar);

export default router;