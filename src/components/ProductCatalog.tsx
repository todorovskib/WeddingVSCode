import React, { useEffect, useMemo, useState } from 'react';
import { productService } from '../services/api';
import { Product } from '../types';

export const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{ productId: number; quantity: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, categoryData] = await Promise.all([
          productService.getAll(),
          productService.getCategories(),
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
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const filteredProducts = useMemo(() => {
    const byCategory = selectedCategory
      ? products.filter((p) => p.category === selectedCategory)
      : products;
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return byCategory;
    return byCategory.filter(
      (p) =>
        p.name.toLowerCase().includes(normalizedQuery) ||
        (p.description || '').toLowerCase().includes(normalizedQuery)
    );
  }, [products, selectedCategory, query]);

  const cartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  if (loading) {
    return <div className="card-surface p-8 text-center text-stone-600">Loading products...</div>;
  }

  return (
    <div className="space-y-5">
      <div className="card-surface p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('')}
              className={selectedCategory === '' ? 'btn-primary' : 'btn-secondary'}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products"
            className="field w-full lg:max-w-xs"
            aria-label="Search products"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <article key={product.id} className="card-surface overflow-hidden">
            <div className="relative aspect-[4/3] w-full bg-stone-100">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-stone-500">Product image</div>
              )}
              <span className={`absolute left-3 top-3 chip ${product.stockQuantity === 0 ? 'text-red-700' : 'text-stone-700'}`}>
                {product.stockQuantity === 0 ? 'Out of stock' : product.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-stone-900">{product.name}</h3>
              <p className="mt-1 line-clamp-2 min-h-[2.75rem] text-sm leading-5 text-stone-600">
                {product.description || 'Wedding product'}
              </p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="text-xl font-bold text-stone-900">${Number(product.price).toFixed(2)}</span>
                <button
                  type="button"
                  onClick={() => addToCart(product.id)}
                  disabled={product.stockQuantity === 0}
                  className={product.stockQuantity === 0 ? 'btn-secondary' : 'btn-primary'}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="card-surface p-8 text-center text-stone-600">No products match your filters.</div>
      )}

      {cart.length > 0 && (
        <aside className="card-surface-strong p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-stone-900">Cart summary</h3>
              <p className="text-sm text-stone-600">
                {cartItems} item{cartItems === 1 ? '' : 's'} selected
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-stone-500">Estimated total</p>
              <p className="text-2xl font-bold text-stone-900">${cartTotal.toFixed(2)}</p>
            </div>
          </div>
          <button type="button" className="btn-primary mt-4 w-full sm:w-auto">
            Proceed to Checkout
          </button>
        </aside>
      )}
    </div>
  );
};

