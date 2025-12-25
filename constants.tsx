
import { MarketState } from './types';

export const ADMIN_PASSWORD = 'ya102030';

export const INITIAL_STATE: MarketState = {
  products: [
    {
      id: 'p1',
      name: 'تفاح أحمر طازج',
      price: 15,
      offerPrice: 12,
      unit: 'كيلو',
      shopId: 's1',
      categoryId: 'c1',
      imageUrl: 'https://picsum.photos/seed/apple/400/300'
    },
    {
      id: 'p2',
      name: 'أرز بسمتي فاخر',
      price: 45,
      unit: 'كيس 5 كغم',
      shopId: 's2',
      categoryId: 'c2',
      imageUrl: 'https://picsum.photos/seed/rice/400/300'
    }
  ],
  shops: [
    { id: 's1', name: 'خضروات القدس', imageUrl: 'https://picsum.photos/seed/veg/400/300' },
    { id: 's2', name: 'بقالة الأمانة', imageUrl: 'https://picsum.photos/seed/grocery/400/300' }
  ],
  categories: [
    { id: 'c1', name: 'خضروات وفواكه', imageUrl: 'https://picsum.photos/seed/cat1/400/300' },
    { id: 'c2', name: 'مواد تموينية', imageUrl: 'https://picsum.photos/seed/cat2/400/300' }
  ],
  orders: []
};
