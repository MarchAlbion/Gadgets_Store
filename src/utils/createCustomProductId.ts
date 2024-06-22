import { Product } from '../pages/Cart/type/ProductType';
import { ProductDetail } from '../types/ProductDetail';

export const createCustomProductId = (
  products: Product[],
  currentProduct: ProductDetail | null,
  firstNumber: number,
  zeroLength: number,
) => {
  const foundProduct = products.find(
    item => currentProduct?.id === item.itemId,
  );

  if (foundProduct) {
    let id = String(foundProduct.id);

    id = id.padStart(zeroLength, '0');

    id = String(firstNumber) + id;

    return +id;
  }

  return;
};
