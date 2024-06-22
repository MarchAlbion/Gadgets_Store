import style from './EmptyCart.module.scss';

export const EmptyCart = () => {
  return (
    <div className={style.cart}>
      <div className={style.cart__cat}></div>
    </div>
  );
};
