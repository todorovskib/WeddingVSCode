import express from 'express';
import * as weddingController from '../controllers/weddingController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Protected routes
router.post('/', authenticate, weddingController.createWedding);
router.get('/my-weddings', authenticate, weddingController.getMyWeddings);
router.get('/:id', weddingController.getWeddingById);
router.put('/:id', authenticate, weddingController.updateWedding);
router.post('/:id/publish', authenticate, weddingController.publishWedding);
router.delete('/:id', authenticate, weddingController.deleteWedding);
router.get('/:id/stats', weddingController.getWeddingStats);

export default router;
