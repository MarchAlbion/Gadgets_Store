import { Product } from '../types/Product';

const BASE_URL = '/Gadgets_Store/api/';

export const getProduct = (
  category: string,
  property?: keyof Product,
  value?: unknown,
) => {
  const url = BASE_URL + category + '.json';

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then((data: Product[]) => {
      if (property && value) {
        return data.filter(product => product[property] === value);
      }

      return data;
    });
};
