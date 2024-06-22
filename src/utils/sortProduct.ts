import { Product } from '../types/Product';

export const sortProduct = (
  productArray: Product[],
  criterion: string,
): Product[] => {
  return [...productArray].sort((a, b) => {
    if (criterion === 'newest') {
      return b.year - a.year;
    } else if (criterion === 'cheapest') {
      return a.price - b.price;
    } else if (criterion === 'alphabetically') {
      return a.name.localeCompare(b.name);
    }

    return 0;
  });
};
