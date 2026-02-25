import { query } from '../config/database';

interface ProductData {
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  stockQuantity: number;
  vendorId?: number;
  isOwnProduct?: boolean;
  customizable?: boolean;
}

export const createProduct = async (data: ProductData) => {
  const result = await query(
    `INSERT INTO products 
    (name, description, category, price, image_url, stock_quantity, vendor_id, is_own_product, customizable) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING *`,
    [data.name, data.description, data.category, data.price, data.imageUrl, 
     data.stockQuantity, data.vendorId || null, data.isOwnProduct !== false, data.customizable || false]
  );

  return result.rows[0];
};

export const getProductsByCategory = async (category: string) => {
  const result = await query(
    'SELECT * FROM products WHERE category = $1 AND stock_quantity > 0 ORDER BY created_at DESC',
    [category]
  );
  return result.rows;
};

export const getAllProducts = async () => {
  const result = await query(
    'SELECT * FROM products WHERE stock_quantity > 0 ORDER BY category, name'
  );
  return result.rows;
};

export const getProductById = async (id: number) => {
  const result = await query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0];
};

export const updateProduct = async (id: number, updates: any) => {
  const fields = Object.keys(updates).map((key, i) => `${key} = $${i + 1}`).join(', ');
  const values = Object.values(updates);
  
  const result = await query(
    `UPDATE products SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length + 1} RETURNING *`,
    [...values, id]
  );

  return result.rows[0];
};

export const getProductCategories = async () => {
  const result = await query(
    'SELECT DISTINCT category FROM products ORDER BY category'
  );
  return result.rows.map(r => r.category);
};
