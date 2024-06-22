import React from 'react';

import { CardItem } from '../../../components/CardItem/CardItem';

import { Product } from '../type/ProductType';
import style from './CartList.module.scss';

type Props = {
  prodsFromStore: Product[] | null;
  onIncrease: (product: Product) => void;
  onDecrease: (product: Product) => void;
  handleRemoveAllInstances: (product: Product) => void;
};
export const CartList: React.FC<Props> = ({
  prodsFromStore,
  onIncrease,
  onDecrease,
  handleRemoveAllInstances,
}) => {
  return (
    <section className={style.cartList}>
      {prodsFromStore?.map(product => (
        <React.Fragment key={product.id}>
          <CardItem
            product={product}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            handleRemoveAllInstances={handleRemoveAllInstances}
          />
        </React.Fragment>
      ))}
    </section>
  );
};
