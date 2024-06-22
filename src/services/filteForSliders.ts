import { Product } from '../pages/Cart/type/ProductType';
import { ProductCategory } from '../types/ProductCategory';

export function getHotPrices(products: Product[]) {
  const sortedByDiscount = products.sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );

  return sortedByDiscount.slice(0, 30);
}

export function getBrandNewModels(products: Product[]) {
  return products.filter(product => product.year === 2022);
}

export const getLimitedCategoryProduct = (
  path: string,
  limit: number,
  goods: { phones: Product[]; tablets: Product[]; accessories: Product[] },
) => {
  const { phones, tablets, accessories } = goods;
  let products: Product[] = [];

  if (path.includes(ProductCategory.phones)) {
    products = [...phones.slice(0, limit)];
  }

  if (path.includes(ProductCategory.tablets)) {
    products = [...tablets.slice(0, limit)];
  }

  if (path.includes(ProductCategory.accessories)) {
    products = [...accessories.slice(0, limit)];
  }

  return products;
};
