import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from './operations';
import { AppStorageState, CartItem } from '../../types/AppStorageState';
import { Theme } from '../../types/Theme';
// import { Product } from '../../types/Product';

const initialState: AppStorageState = {
  cart: [],
  favorites: [],
  products: {
    phones: [],
    tablets: [],
    accessories: [],
  },
  loading: false,
  error: null,
  theme: 'Original',
};
/* eslint-disable */

const appSlice = createSlice({
  name: 'appStorage',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        itemId => itemId.cartItemId !== action.payload,
      );
    },
    addToFavorites: (state, action: PayloadAction<string>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        itemId => itemId !== action.payload,
      );
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find(item => item.cartItemId === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find(item => item.cartItemId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const { phones, tablets, accessories } = action.payload;
        state.products = {
          phones,
          tablets,
          accessories,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
  selectors: {
    selectPhones: state => state.products.phones,
    selectAccessories: state => state.products.accessories,
    selectTablets: state => state.products.tablets,
    selectAllProducts: createSelector(
      (state: AppStorageState) => state.products,
      products => {
        const { phones, accessories, tablets } = products;
        return [...phones, ...accessories, ...tablets];
      },
    ),
    selectTheme: state => state.theme,
    selectCart: state => state.cart,
    selectfavorites: state => state.favorites,
  },
});

export const {
  addToCart,
  removeFromCart,
  addToFavorites,
  removeFromFavorites,
  setTheme,
  decreaseQuantity,
  increaseQuantity,
} = appSlice.actions;

export const {
  selectPhones,
  selectAccessories,
  selectTablets,
  selectAllProducts,
  selectTheme,
  selectCart,
  selectfavorites,
} = appSlice.selectors;

export default appSlice.reducer;
