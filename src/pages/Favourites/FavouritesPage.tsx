import { useSelector } from 'react-redux';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { PATHS } from '../../constants';
import { selectAllProducts, selectfavorites } from '../../redux';
import { Breadcrumb } from '../../types/Breadcrumb';
import { Product } from '../../types/Product';
import { BreadcrumbsComponent } from '../../UI/Breadcrumbs/Breadcrumbs';

import styles from './FavouritesPage.module.scss';
import { EmptyFav } from './EmptyFavourites/Emptyfav';

export const FavouritesPage = () => {
  const favorites = useSelector(selectfavorites);
  const allProducts = useSelector(selectAllProducts);

  function getFavoritesProducts(): Product[] {
    const favoritesProds = favorites.map(itemId => {
      const prod = allProducts.find(product => product.itemId === itemId);

      return prod;
    });

    return favoritesProds as Product[];
  }

  const favoritesProds = getFavoritesProducts();

  const breadcrumbsData: Breadcrumb[] = [
    { label: 'Favorites', path: PATHS.FAVOURITES },
  ];

  return (
    <div className={styles.page__container}>
      <div className={styles.breadcrumbs}>
        <BreadcrumbsComponent breadcrumbs={breadcrumbsData} />
      </div>
      <h2 className={styles.title}>Favourites</h2>
      <p className={styles.counter}>{favoritesProds.length} items</p>

      <div className={styles.products}>
        {favoritesProds.length === 0 ? (
          <EmptyFav />
        ) : (
          favoritesProds.map(item => {
            return (
              <div key={item?.itemId} className={styles.product}>
                <ProductCard product={item} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
