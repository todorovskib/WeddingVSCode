import { Request, Response } from 'express';
import * as ProductModel from '../models/Product';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, category, price, imageUrl, stockQuantity, vendorId, isOwnProduct, customizable } = req.body;

    const product = await ProductModel.createProduct({
      name,
      description,
      category,
      price,
      imageUrl,
      stockQuantity,
      vendorId,
      isOwnProduct,
      customizable
    });

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.getAllProducts();
    res.json({ products });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const products = await ProductModel.getProductsByCategory(category);

    res.json({ products });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.getProductById(parseInt(id));

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await ProductModel.getProductCategories();
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
