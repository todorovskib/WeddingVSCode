import express from 'express';
import * as weddingController from '../controllers/weddingController';
import * as weddingFeatureController from '../controllers/weddingFeatureController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Protected routes
router.post('/', authenticate, weddingController.createWedding);
router.get('/my-weddings', authenticate, weddingController.getMyWeddings);
router.get('/:id/:feature(checklist|timeline|budget|faq|gallery|registry)', weddingFeatureController.listFeatureItems);
router.post('/:id/:feature(checklist|timeline|budget|faq|gallery|registry)', authenticate, weddingFeatureController.createFeatureItem);
router.put('/:id/:feature(checklist|timeline|budget|faq|gallery|registry)/:itemId', authenticate, weddingFeatureController.updateFeatureItem);
router.delete('/:id/:feature(checklist|timeline|budget|faq|gallery|registry)/:itemId', authenticate, weddingFeatureController.deleteFeatureItem);
router.get('/:id', weddingController.getWeddingById);
router.put('/:id', authenticate, weddingController.updateWedding);
router.post('/:id/publish', authenticate, weddingController.publishWedding);
router.delete('/:id', authenticate, weddingController.deleteWedding);
router.get('/:id/stats', weddingController.getWeddingStats);

export default router;
