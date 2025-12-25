
import React from 'react';
import { Product, Shop, Category } from '../types';

interface ProductGridProps {
  products: Product[];
  shops: Shop[];
  categories: Category[];
  onAddToCart: (p: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, shops, categories, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
        <p className="text-gray-500 font-medium">عذراً، لا توجد نتائج مطابقة لبحثك.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map(product => {
        const shop = shops.find(s => s.id === product.shopId);
        const category = categories.find(c => c.id === product.categoryId);
        
        return (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
            <div className="relative h-36 md:h-48">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              {product.offerPrice && (
                <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                  عرض خاص
                </div>
              )}
            </div>
            <div className="p-3">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{shop?.name}</span>
                <span className="text-[10px] bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded">{category?.name}</span>
              </div>
              <h3 className="font-bold text-sm text-gray-800 line-clamp-1 mb-1">{product.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black text-gray-900">{product.offerPrice || product.price} ₪</span>
                    <span className="text-[10px] text-gray-500">/{product.unit}</span>
                  </div>
                  {product.offerPrice && (
                    <span className="text-[10px] text-gray-400 line-through">{product.price} ₪</span>
                  )}
                </div>
                <button 
                  onClick={() => onAddToCart(product)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
