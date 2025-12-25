
import React from 'react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onAdminClick: () => void;
  cartCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, onAdminClick, cartCount, onCartClick }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo Section */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">متجر عقربا</h1>
          </div>
          
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={onAdminClick} className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:max-w-xl">
          <input
            type="text"
            placeholder="ابحث عن منتج، محل أو قسم..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Actions Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={onAdminClick}
            className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm font-medium"
          >
            لوحة التحكم
          </button>
          <button 
            onClick={onCartClick}
            className="relative bg-blue-50 text-blue-600 p-2 rounded-full hover:bg-blue-100 transition-all"
          >
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
