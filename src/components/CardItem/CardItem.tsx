import { Button } from '../../UI';
import style from './CardItem.module.scss';
import { ReactComponent as Minus } from '../../assets/icons/Minus.svg';
import { ReactComponent as Plus } from '../../assets/icons/Plus.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/Close.svg';
import { Product } from '../../pages/Cart/type/ProductType';
import { decreaseQuantity, increaseQuantity, selectCart } from '../../redux';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useSelector } from 'react-redux';

type Props = {
  product: Product;
  onIncrease: (product: Product) => void;
  onDecrease: (product: Product) => void;
  handleRemoveAllInstances: (product: Product) => void;
};

export const CardItem: React.FC<Props> = ({
  product,
  onIncrease,
  onDecrease,
  handleRemoveAllInstances,
}) => {
  const dispatch = useAppDispatch();

  const cart = useSelector(selectCart);

  const currentProduct = cart.find(
    itemInCart => itemInCart.cartItemId === product.itemId,
  );

  const increaseProductAmount = () => {
    dispatch(increaseQuantity(product.itemId));
    onIncrease(product);
  };

  const decreaseProductAmount = () => {
    dispatch(decreaseQuantity(product.itemId));
    onDecrease(product);
  };

  const handleDeleteFromCart = () => {
    handleRemoveAllInstances(product);
  };

  return (
    <article className={style.cardItem}>
      <div className={style.cardItem__product}>
        <div className={style.cardItem__delete} onClick={handleDeleteFromCart}>
          <CloseIcon className={style.cardItem__icon} />
        </div>
        <img className={style.cardItem__image} src={product.image} />
        <h2 className={style.cardItem__title}>{product.name}</h2>
      </div>
      <section className={style.cardItem__info}>
        <div className={style.cardItem__pickAmount}>
          <div className={style.cardItem__container}>
            <Button
              type="sign"
              size={{ height: 32 }}
              onClick={decreaseProductAmount}
            >
              <Minus className={style.cardItem__container__icon} />
            </Button>
          </div>

          <div className={style.cardItem__amount}>
            {currentProduct?.quantity}
          </div>
          <div className={style.cardItem__container}>
            <Button
              type="sign"
              size={{ height: 32 }}
              onClick={increaseProductAmount}
            >
              <Plus className={style.cardItem__container__icon} />
            </Button>
          </div>
        </div>
        <span className={style.cardItem__price}>{`$${product.price}`}</span>
      </section>
    </article>
  );
};
