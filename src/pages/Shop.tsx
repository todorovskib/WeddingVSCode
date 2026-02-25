import React from 'react';
import { ProductCatalog } from '../components/ProductCatalog';

export const Shop: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Macedonian Wedding Shop</h1>
        <p className="text-gray-600">
          Discover beautiful wedding products and partner with local vendors for services
        </p>
      </div>

      <ProductCatalog />
    </div>
  );
};
