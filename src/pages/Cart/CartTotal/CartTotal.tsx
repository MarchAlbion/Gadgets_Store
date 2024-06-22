import { Button } from '../../../UI';
import { Product } from '../type/ProductType';
import style from './CartTotal.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  prodsFromStore: Product[] | null;
};

export const CartTotal: React.FC<Props> = ({ prodsFromStore }) => {
  const amount = prodsFromStore?.length;
  const totalPrice = prodsFromStore?.reduce((acc, prod) => acc + prod.price, 0);

  const { t } = useTranslation();

  return (
    <section className={style.cartTotal}>
      <h2 className={style.cartTotal__total}>{`$${totalPrice}`}</h2>
      <p
        className={style.cartTotal__amount}
      >{`${t('cart.totalFor')} ${amount} ${t('cart.items')}`}</p>
      <Button type="primary" size={{ width: 320, height: 48 }}>
        {t('cart.checkout')}
      </Button>
    </section>
  );
};
