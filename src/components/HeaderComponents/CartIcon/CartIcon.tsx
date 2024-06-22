import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '../../../UI';
import { ReactComponent as Icon } from '../../../assets/icons/Shopping bag.svg';
import styles from './CartIcon.module.scss';
import { PATHS } from '../../../constants';
import { useSelector } from 'react-redux';
import { selectCart } from '../../../redux';
import { Badge } from '../Badge/Badge';

export const CartIcon = () => {
  const { pathname } = useLocation();
  const isActiveClass = pathname.includes('cart');
  const itemsCount = useSelector(selectCart).length;

  return (
    <div
      className={cn(styles.icon, {
        [styles.icon_active]: isActiveClass,
      })}
    >
      <NavLink
        to={`${PATHS.CART}`}
        style={{ width: '100%', boxSizing: 'border-box' }}
      >
        <Button
          type="icon"
          size={{ width: 100, height: 100 }}
          measure="%"
          state="header"
          style={{ position: 'relative' }}
        >
          <Icon className={styles.icon__fill} />
          {itemsCount > 0 && <Badge count={itemsCount} />}
        </Button>
      </NavLink>
    </div>
  );
};
