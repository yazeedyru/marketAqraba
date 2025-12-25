
export interface Product {
  id: string;
  name: string;
  price: number;
  offerPrice?: number;
  unit: string;
  shopId: string;
  categoryId: string;
  imageUrl: string;
  description?: string;
}

export interface Shop {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'جديد' | 'قيد التجهيز' | 'مكتمل';
}

export interface MarketState {
  products: Product[];
  shops: Shop[];
  categories: Category[];
  orders: Order[];
}
