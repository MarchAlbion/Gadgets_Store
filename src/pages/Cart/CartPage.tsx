import style from './CartPage.module.scss';

// import { Product } from './type/ProductType';
import { CartList } from './CartList/CartList';
import { CartTotal } from './CartTotal/CartTotal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { removeFromCart, selectAllProducts, selectCart } from '../../redux';
import { getProductsFromStorage } from '../../utils/getProductsFromStorage';
import { BackButton } from '../../UI/Backbutton/BackButton';
import { Product } from './type/ProductType';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { EmptyCart } from './EmptyCart/EmptyCart';

export const CartPage = () => {
  const cart = useSelector(selectCart);

  const allProducts = useSelector(selectAllProducts);

  const { uniqueProducts, productsWithCopies } =
    getProductsFromStorage(allProducts, cart) || [];

  const [finalOrder, setFinalOrder] = useState<Product[]>([
    ...productsWithCopies,
  ]);

  const dispatch = useAppDispatch();

  const handleIncreaseAmount = (addedProduct: Product) => {
    if (finalOrder) {
      setFinalOrder(prev => [...prev, { ...addedProduct }]);
    }
  };

  const handleDecreaseAmount = (removedProduct: Product) => {
    const indexToRemove = finalOrder.findIndex(
      prod => prod.id === removedProduct.id,
    );

    if (indexToRemove !== -1) {
      const updatedOrder = [...finalOrder];

      updatedOrder.splice(indexToRemove, 1);
      setFinalOrder(updatedOrder);
    }
  };

  const handleRemoveAllInstances = (removedProduct: Product) => {
    const updatedOrder = finalOrder.filter(
      prod => prod.id !== removedProduct.id,
    );

    dispatch(removeFromCart(removedProduct.itemId));
    setFinalOrder(updatedOrder);
  };

  return (
    <div className="page__container">
      <section className={style.cart}>
        <BackButton />
        <h1 className={style.cart__pageName}>Cart</h1>
        <main className={style.cart__content}>
          {uniqueProducts.length > 0 ? (
            <>
              <CartList
                prodsFromStore={uniqueProducts}
                onIncrease={handleIncreaseAmount}
                onDecrease={handleDecreaseAmount}
                handleRemoveAllInstances={handleRemoveAllInstances}
              />
              <CartTotal prodsFromStore={productsWithCopies} />
            </>
          ) : (
            <EmptyCart />
          )}
        </main>
      </section>
    </div>
  );
};
