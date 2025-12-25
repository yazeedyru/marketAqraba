
import React from 'react';
import { Product } from '../types';

interface HeroProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const Hero: React.FC<HeroProps> = ({ products, onAddToCart }) => {
  if (products.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 border-r-4 border-red-500 pr-3">أفضل العروض اليوم</h2>
        <span className="text-sm text-blue-600 font-medium cursor-pointer">عرض الكل</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {products.map(product => (
          <div 
            key={product.id}
            className="flex-shrink-0 w-64 md:w-80 bg-white rounded-2xl overflow-hidden shadow-sm border border-red-100 snap-start flex flex-col"
          >
            <div className="relative h-40">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 offer-badge text-white text-xs font-bold px-2 py-1 rounded">
                وفر {Math.round((1 - (product.offerPrice! / product.price)) * 100)}%
              </div>
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xl font-black text-red-600">{product.offerPrice} ₪</span>
                <span className="text-sm text-gray-400 line-through">{product.price} ₪</span>
                <span className="text-xs text-gray-500">/{product.unit}</span>
              </div>
              <button 
                onClick={() => onAddToCart(product)}
                className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                أضف للسلة
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
