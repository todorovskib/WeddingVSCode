import express from 'express';
import * as productController from '../controllers/productController';

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/categories', productController.getCategories);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/:id', productController.getProductById);

export default router;
