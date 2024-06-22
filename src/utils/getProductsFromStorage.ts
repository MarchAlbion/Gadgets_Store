import { Product } from '../pages/Cart/type/ProductType';
import { CartItem } from '../types/AppStorageState';

export function getProductsFromStorage(
  allProd: Product[],
  itemIds: CartItem[],
): { uniqueProducts: Product[]; productsWithCopies: Product[] } {
  const uniqueProducts: Product[] = [];
  const productsWithCopies: Product[] = [];

  itemIds.forEach(item => {
    const product = allProd.find(prod => prod.itemId === item.cartItemId);

    if (product) {
      if (
        !uniqueProducts.some(uniqueProd => uniqueProd.itemId === product.itemId)
      ) {
        uniqueProducts.push(product);
      }

      for (let i = 0; i < item.quantity; i++) {
        productsWithCopies.push(product);
      }
    }
  });

  return { uniqueProducts, productsWithCopies };
}
