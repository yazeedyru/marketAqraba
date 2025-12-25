
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Product, Shop, Category, Order, CartItem, MarketState } from './types';
import { INITIAL_STATE, ADMIN_PASSWORD } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

const App: React.FC = () => {
  // Persistence using local storage for demonstration; can be replaced with a secure backend API
  const [data, setData] = useState<MarketState>(() => {
    try {
      const saved = localStorage.getItem('aqraba_store_data');
      return saved ? JSON.parse(saved) : INITIAL_STATE;
    } catch (e) {
      console.error("Error loading stored data", e);
      return INITIAL_STATE;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aqraba_store_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedShop, setSelectedShop] = useState<string | null>(null);

  // Sync with storage securely
  useEffect(() => {
    localStorage.setItem('aqraba_store_data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('aqraba_store_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateCartQuantity = useCallback((productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const placeOrder = useCallback((customerInfo: { name: string; phone: string; address: string }) => {
    const total = cart.reduce((sum, item) => sum + (item.offerPrice || item.price) * item.quantity, 0);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      ...customerInfo,
      customerName: customerInfo.name,
      items: [...cart],
      total,
      date: new Date().toLocaleString('ar-EG'),
      status: 'جديد'
    };

    setData(prev => ({
      ...prev,
      orders: [newOrder, ...prev.orders]
    }));
    clearCart();
    setShowCart(false);
    alert('تم تقديم طلبك بنجاح! شكراً لتسوقك معنا.');
  }, [cart, clearCart]);

  const filteredProducts = useMemo(() => {
    return data.products.filter(p => {
      const query = searchQuery.toLowerCase();
      const shopName = data.shops.find(s => s.id === p.shopId)?.name.toLowerCase() || '';
      const catName = data.categories.find(c => c.id === p.categoryId)?.name.toLowerCase() || '';
      
      const matchesSearch = p.name.toLowerCase().includes(query) ||
                            shopName.includes(query) ||
                            catName.includes(query);
      const matchesCategory = selectedCategory ? p.categoryId === selectedCategory : true;
      const matchesShop = selectedShop ? p.shopId === selectedShop : true;
      return matchesSearch && matchesCategory && matchesShop;
    });
  }, [data, searchQuery, selectedCategory, selectedShop]);

  const adminActions = {
    addProduct: (p: Product) => setData(prev => ({ ...prev, products: [...prev.products, p] })),
    updateProduct: (p: Product) => setData(prev => ({ ...prev, products: prev.products.map(item => item.id === p.id ? p : item) })),
    deleteProduct: (id: string) => setData(prev => ({ ...prev, products: prev.products.filter(p => p.id !== id) })),
    addShop: (s: Shop) => setData(prev => ({ ...prev, shops: [...prev.shops, s] })),
    updateShop: (s: Shop) => setData(prev => ({ ...prev, shops: prev.shops.map(item => item.id === s.id ? s : item) })),
    deleteShop: (id: string) => setData(prev => ({ ...prev, shops: prev.shops.filter(s => s.id !== id) })),
    addCategory: (c: Category) => setData(prev => ({ ...prev, categories: [...prev.categories, c] })),
    updateCategory: (c: Category) => setData(prev => ({ ...prev, categories: prev.categories.map(item => item.id === c.id ? c : item) })),
    deleteCategory: (id: string) => setData(prev => ({ ...prev, categories: prev.categories.filter(c => c.id !== id) })),
    updateOrderStatus: (id: string, status: Order['status']) => setData(prev => ({
      ...prev,
      orders: prev.orders.map(o => o.id === id ? { ...o, status } : o)
    }))
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPassword.trim() === ADMIN_PASSWORD) {
      setIsAdminMode(true);
      setShowLoginModal(false);
      setLoginPassword('');
      setLoginError('');
    } else {
      setLoginError('كلمة السر غير صحيحة');
    }
  };

  if (isAdminMode) {
    return (
      <AdminDashboard 
        data={data}
        actions={adminActions}
        onExit={() => setIsAdminMode(false)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col antialiased">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAdminClick={() => setShowLoginModal(true)}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onCartClick={() => setShowCart(true)}
      />

      <main className="flex-grow container mx-auto px-4 py-6">
        <Hero 
          products={data.products.filter(p => p.offerPrice)} 
          onAddToCart={addToCart}
        />
        
        <div className="flex overflow-x-auto gap-3 py-4 mb-6 scrollbar-hide no-tap-highlight">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${!selectedCategory ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 border hover:bg-gray-50'}`}
          >
            الكل
          </button>
          {data.categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${selectedCategory === cat.id ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 border hover:bg-gray-50'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <ProductGrid 
          products={filteredProducts} 
          shops={data.shops}
          categories={data.categories}
          onAddToCart={addToCart}
        />
      </main>

      <Footer />

      {showCart && (
        <CartDrawer 
          items={cart}
          onClose={() => setShowCart(false)}
          onUpdateQty={updateCartQuantity}
          onRemove={removeFromCart}
          onCheckout={placeOrder}
        />
      )}

      {/* Admin Login Modal - No automatic prompts or permissions used here */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLoginModal(false)} />
          <div className="relative bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">تسجيل دخول المسؤول</h2>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 text-right">كلمة المرور</label>
                <input 
                  type="password" 
                  autoFocus
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${loginError ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="ادخل كلمة السر..."
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setLoginError('');
                  }}
                />
                {loginError && <p className="text-red-500 text-xs mt-2 font-bold text-right">{loginError}</p>}
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                دخول
              </button>
              <button 
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="w-full text-gray-400 text-sm font-medium py-2 hover:text-gray-600 transition-colors"
              >
                إلغاء
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Cart Button (Mobile) */}
      <button 
        onClick={() => setShowCart(true)}
        className="fixed bottom-6 left-6 md:hidden bg-blue-600 text-white p-4 rounded-full shadow-2xl z-40 flex items-center justify-center active:scale-90 transition-transform"
      >
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
            {cart.reduce((s, i) => s + i.quantity, 0)}
          </span>
        )}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>
    </div>
  );
};

export default App;
