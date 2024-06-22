import { Product } from '../pages/Cart/type/ProductType';
import { Theme } from './Theme';

export interface CartItem {
  cartItemId: string;
  quantity: number;
}

export interface AppStorageState {
  cart: CartItem[];
  favorites: string[];
  products: {
    phones: Product[];
    tablets: Product[];
    accessories: Product[];
  };
  loading: boolean;
  error: string | null;
  theme: Theme;
}
