import { Router } from 'express';
import { getDeals, addDeal, updateDeal } from '../controllers/dealController';

const router = Router();

router.get('/', getDeals);
router.post('/', addDeal);
router.put('/:id', updateDeal);

export default router;
