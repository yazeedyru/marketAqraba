
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: (info: { name: string; phone: string; address: string }) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ items, onClose, onUpdateQty, onRemove, onCheckout }) => {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [form, setForm] = useState({ name: '', phone: '', address: '' });

  const total = items.reduce((sum, item) => sum + (item.offerPrice || item.price) * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return alert('الرجاء تعبئة كافة الحقول');
    onCheckout(form);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Content */}
      <div className="relative w-full max-w-md bg-white h-full flex flex-col animate-slide-left">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">سلة التسوق</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-100 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">سلتك فارغة حالياً</p>
              <button onClick={onClose} className="mt-4 text-blue-600 font-bold">ابدأ التسوق الآن</button>
            </div>
          ) : step === 'cart' ? (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-grow">
                    <h3 className="font-bold text-sm text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-sm font-black text-blue-600">{(item.offerPrice || item.price) * item.quantity} ₪</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-white border rounded-lg">
                        <button onClick={() => onUpdateQty(item.id, 1)} className="px-3 py-1 text-blue-600 hover:bg-gray-50">+</button>
                        <span className="px-3 py-1 font-bold text-sm">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(item.id, -1)} className="px-3 py-1 text-red-600 hover:bg-gray-50">-</button>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl mb-6">
                <p className="text-sm text-blue-800 font-medium">يرجى إدخال بيانات التوصيل لإتمام الطلب</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">الاسم الكامل</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">رقم الهاتف</label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">العنوان / المنطقة</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.address}
                  onChange={e => setForm({...form, address: e.target.value})}
                ></textarea>
              </div>
            </form>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">الإجمالي</span>
              <span className="text-2xl font-black text-gray-900">{total} ₪</span>
            </div>
            {step === 'cart' ? (
              <button 
                onClick={() => setStep('checkout')}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                المتابعة لإتمام الطلب
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            ) : (
              <div className="flex gap-3">
                <button 
                  onClick={() => setStep('cart')}
                  className="flex-1 bg-white border border-gray-300 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  رجوع للسلة
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex-[2] bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all"
                >
                  تأكيد الطلب
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
