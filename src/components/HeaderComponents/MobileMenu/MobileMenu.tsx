import { Button } from '../../../UI';
import { Logo } from '../../Logo/Logo';
import { CloseIcon } from '../CloseIcon/CloseIcon';
import styles from './MobileMenu.module.scss';
/* eslint-disable max-len */
import { ReactComponent as FavouriteIcon } from '../../../assets/icons/Favourites.svg';
import { ReactComponent as CartIcon } from '../../../assets/icons/Shopping bag.svg';
import cn from 'classnames';
import { Nav } from '../Nav/Nav';
import { NavLink, useLocation } from 'react-router-dom';
import { PATHS } from '../../../constants';

type Props = {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseMenu: () => void;
};

export const MobileMenu: React.FC<Props> = ({
  showMenu,
  setShowMenu,
  handleCloseMenu,
}) => {
  // const handleCloseMenu = () => {
  //   setShowMenu(false);
  // };

  const { pathname } = useLocation();
  const isActiveFavorites = pathname.includes('favourites');
  const isActiveCart = pathname.includes('cart');

  return (
    <aside
      className={cn(styles.aside, {
        [styles.aside_active]: showMenu,
      })}
    >
      <div className={styles.header}>
        <Logo />
        <CloseIcon setShowMenu={setShowMenu} />
      </div>

      <div className={styles.nav__mobile}>
        <Nav handleCloseMenu={handleCloseMenu} />
      </div>

      <div className={styles.footer}>
        <div
          className={cn(styles.icon__large, {
            [styles.icon__large_active]: isActiveFavorites,
          })}
        >
          <NavLink
            to={`${PATHS.FAVOURITES}`}
            style={{ width: '100%' }}
            onClick={handleCloseMenu}
          >
            <Button
              type="icon"
              size={{ width: 100, height: 100 }}
              measure="%"
              state="header"
            >
              <FavouriteIcon className={styles.icon__fill} />
            </Button>
          </NavLink>
        </div>
        <div
          className={cn(styles.icon__large, {
            [styles.icon__large_active]: isActiveCart,
          })}
        >
          <NavLink
            to={`${PATHS.CART}`}
            style={{ width: '100%' }}
            onClick={handleCloseMenu}
          >
            <Button
              type="icon"
              size={{ width: 100, height: 100 }}
              measure="%"
              state="header"
            >
              <CartIcon className={styles.icon__fill} />
            </Button>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
