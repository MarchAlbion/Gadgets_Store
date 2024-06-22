import { ProductCategory } from '../types/ProductCategory';

export const getCategoryApiEndpoint = (path: string, url: string) => {
  let baseurl = url;

  if (path.includes(ProductCategory.phones)) {
    baseurl += `${ProductCategory.phones}.json`;
  }

  if (path.includes(ProductCategory.tablets)) {
    baseurl += `${ProductCategory.tablets}.json`;
  }

  if (path.includes(ProductCategory.accessories)) {
    baseurl += `${ProductCategory.accessories}.json`;
  }

  return baseurl;
};
