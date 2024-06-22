import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../pages/Cart/type/ProductType';
/* eslint-disable */
export const fetchProducts = createAsyncThunk<
  { [key: string]: Product[] },
  void
>('appStorage/fetchProducts', async () => {
  const response = await fetch('/Gadgets_Store/api/products.json');
  const data = await response.json();

  const categorizedProducts = categorizeProducts(data);

  return categorizedProducts;
});

function categorizeProducts(products: Product[]): { [key: string]: Product[] } {
  const categorizedProducts: { [key: string]: Product[] } = {
    phones: [],
    tablets: [],
    accessories: [],
  };

  products.forEach(product => {
    switch (product.category) {
      case 'phones':
        categorizedProducts.phones.push(product);
        break;
      case 'tablets':
        categorizedProducts.tablets.push(product);
        break;
      case 'accessories':
        categorizedProducts.accessories.push(product);
        break;
      default:
        break;
    }
  });

  return categorizedProducts;
}
