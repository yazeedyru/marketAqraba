
import React, { useState } from 'react';
import { MarketState, Product, Shop, Category, Order } from '../types';

interface AdminDashboardProps {
  data: MarketState;
  actions: {
    addProduct: (p: Product) => void;
    updateProduct: (p: Product) => void;
    deleteProduct: (id: string) => void;
    addShop: (s: Shop) => void;
    updateShop: (s: Shop) => void;
    deleteShop: (id: string) => void;
    addCategory: (c: Category) => void;
    updateCategory: (c: Category) => void;
    deleteCategory: (id: string) => void;
    updateOrderStatus: (id: string, status: Order['status']) => void;
  };
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ data, actions, onExit }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'shops' | 'categories' | 'orders'>('products');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const renderProductForm = (item?: Product) => (
    <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">{item ? 'تعديل منتج' : 'إضافة منتج جديد'}</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const productData: any = {
            id: item?.id || `p-${Date.now()}`,
            name: formData.get('name'),
            price: Number(formData.get('price')),
            offerPrice: formData.get('offerPrice') ? Number(formData.get('offerPrice')) : undefined,
            unit: formData.get('unit'),
            shopId: formData.get('shopId'),
            categoryId: formData.get('categoryId'),
            imageUrl: editingItem?.imageUrl || item?.imageUrl || 'https://picsum.photos/400/300'
          };
          item ? actions.updateProduct(productData) : actions.addProduct(productData);
          setEditingItem(null);
          setIsAdding(false);
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">اسم المنتج</label>
            <input name="name" defaultValue={item?.name} required className="w-full border rounded-lg p-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">السعر (₪)</label>
              <input name="price" type="number" defaultValue={item?.price} required className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">سعر العرض (اختياري)</label>
              <input name="offerPrice" type="number" defaultValue={item?.offerPrice} className="w-full border rounded-lg p-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">الوحدة (كغم، قطعة...)</label>
            <input name="unit" defaultValue={item?.unit} required className="w-full border rounded-lg p-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">المحل</label>
              <select name="shopId" defaultValue={item?.shopId} required className="w-full border rounded-lg p-2">
                {data.shops.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">القسم</label>
              <select name="categoryId" defaultValue={item?.categoryId} required className="w-full border rounded-lg p-2">
                {data.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">الصورة</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setEditingItem({ ...editingItem, imageUrl: url }))} className="w-full border rounded-lg p-2" />
          </div>
          <div className="flex gap-2 pt-4">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold">حفظ</button>
            <button type="button" onClick={() => { setEditingItem(null); setIsAdding(false); }} className="flex-1 bg-gray-100 py-2 rounded-lg font-bold">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-xl flex flex-col z-10">
        <div className="p-6 border-b">
          <h1 className="text-xl font-black text-blue-600">لوحة تحكم عقربا</h1>
          <p className="text-xs text-gray-400 mt-1">أهلاً بك يا يزيد</p>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {[
            { id: 'products', label: 'المنتجات', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { id: 'shops', label: 'المحلات', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1' },
            { id: 'categories', label: 'الأقسام', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
            { id: 'orders', label: 'الطلبات', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              {tab.label}
              {tab.id === 'orders' && data.orders.filter(o => o.status === 'جديد').length > 0 && (
                <span className="mr-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {data.orders.filter(o => o.status === 'جديد').length}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 mt-auto border-t">
          <button onClick={onExit} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            خروج من النظام
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === 'products' ? 'إدارة المنتجات' : activeTab === 'shops' ? 'إدارة المحلات' : activeTab === 'categories' ? 'إدارة الأقسام' : 'الطلبات الواردة'}
            </h2>
            <p className="text-gray-500 text-sm">إدارة محتوى المتجر وتحديث البيانات</p>
          </div>
          {activeTab !== 'orders' && (
            <button 
              onClick={() => setIsAdding(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              إضافة جديد
            </button>
          )}
        </header>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          {activeTab === 'products' && (
            <table className="w-full text-right border-collapse">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-bold text-sm text-gray-600">المنتج</th>
                  <th className="p-4 font-bold text-sm text-gray-600">السعر</th>
                  <th className="p-4 font-bold text-sm text-gray-600">المحل</th>
                  <th className="p-4 font-bold text-sm text-gray-600">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map(p => (
                  <tr key={p.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-medium text-sm">{p.name}</span>
                    </td>
                    <td className="p-4 text-sm font-bold">{p.offerPrice || p.price} ₪</td>
                    <td className="p-4 text-sm text-gray-500">{data.shops.find(s => s.id === p.shopId)?.name}</td>
                    <td className="p-4 space-x-2 space-x-reverse">
                      <button onClick={() => setEditingItem(p)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg">تعديل</button>
                      <button onClick={() => actions.deleteProduct(p.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg">حذف</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'orders' && (
            <div className="divide-y">
              {data.orders.length === 0 ? (
                <div className="p-20 text-center text-gray-400">لا توجد طلبات بعد</div>
              ) : (
                data.orders.map(o => (
                  <div key={o.id} className="p-6 hover:bg-gray-50 transition-all">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">#{o.id}</span>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${o.status === 'جديد' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                            {o.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-lg text-gray-800">{o.customerName}</h4>
                        <p className="text-gray-500 text-sm">الهاتف: {o.phone}</p>
                        <p className="text-gray-500 text-sm">العنوان: {o.address}</p>
                        <p className="text-gray-400 text-xs mt-1">التاريخ: {o.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-gray-900">{o.total} ₪</p>
                        <div className="mt-4 flex gap-2">
                          <select 
                            value={o.status}
                            onChange={(e) => actions.updateOrderStatus(o.id, e.target.value as any)}
                            className="text-sm border rounded-lg px-3 py-1 outline-none"
                          >
                            <option value="جديد">جديد</option>
                            <option value="قيد التجهيز">قيد التجهيز</option>
                            <option value="مكتمل">مكتمل</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border rounded-xl p-4">
                      <h5 className="text-sm font-bold text-gray-600 mb-3">المنتجات المطلوبة:</h5>
                      <div className="space-y-2">
                        {o.items.map(item => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name} (x{item.quantity})</span>
                            <span className="font-bold">{(item.offerPrice || item.price) * item.quantity} ₪</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Simple CRUD logic for Shops/Categories (can be extended similarly to products) */}
          {(activeTab === 'shops' || activeTab === 'categories') && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {(activeTab === 'shops' ? data.shops : data.categories).map((item: any) => (
                  <div key={item.id} className="border rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={item.imageUrl} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="font-bold">{item.name}</span>
                    </div>
                    <button 
                      onClick={() => activeTab === 'shops' ? actions.deleteShop(item.id) : actions.deleteCategory(item.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                    >حذف</button>
                  </div>
                ))}
             </div>
          )}
        </div>
      </main>

      {(isAdding || editingItem) && activeTab === 'products' && renderProductForm(editingItem)}
      
      {/* Simple Form for Shop/Category */}
      {isAdding && (activeTab === 'shops' || activeTab === 'categories') && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6">
            <h3 className="text-xl font-bold mb-4">{activeTab === 'shops' ? 'إضافة محل جديد' : 'إضافة قسم جديد'}</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newItem = {
                id: `${activeTab[0]}-${Date.now()}`,
                name: formData.get('name') as string,
                imageUrl: editingItem?.imageUrl || 'https://picsum.photos/400/300'
              };
              activeTab === 'shops' ? actions.addShop(newItem) : actions.addCategory(newItem);
              setIsAdding(false);
              setEditingItem(null);
            }} className="space-y-4">
              <input name="name" placeholder="الاسم" required className="w-full border rounded-lg p-2" />
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setEditingItem({ ...editingItem, imageUrl: url }))} className="w-full border rounded-lg p-2" />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg">حفظ</button>
                <button type="button" onClick={() => setIsAdding(false)} className="flex-1 bg-gray-100 py-2 rounded-lg">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
