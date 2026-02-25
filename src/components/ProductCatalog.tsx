import React, { useEffect, useState } from 'react';
import { productService } from '../services/api';
import { Product } from '../types';

export const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{ productId: number; quantity: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, categoryData] = await Promise.all([
          productService.getAll(),
          productService.getCategories()
        ]);

        setProducts(productData.products || []);
        setCategories(categoryData.categories || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  if (loading) return <div className="text-center py-8">Loading products...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Wedding Shop</h2>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded font-medium ${
              selectedCategory === ''
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded font-medium ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">No image</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm mb-1">{product.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">${product.price}</span>
                <button
                  onClick={() => addToCart(product.id)}
                  disabled={product.stockQuantity === 0}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                >
                  Add to Cart
                </button>
              </div>
              {product.stockQuantity === 0 && (
                <p className="text-red-600 text-xs mt-2">Out of stock</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Cart ({cart.length} items)</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};
