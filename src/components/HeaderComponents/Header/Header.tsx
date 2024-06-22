import { CartIcon } from '../CartIcon/CartIcon';
import { FavourIcon } from '../FavourIcon/FavourIcon';
import { Logo } from '../../Logo/Logo';
import { Nav } from '../Nav/Nav';
import styles from './Header.module.scss';
import { BurgerIcon } from '../BurgerIcon/BurgerIcon';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { useEffect, useState } from 'react';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const body = document.body;

    if (showMenu) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    return () => {
      body.style.overflow = 'auto';
    };
  }, [showMenu]);

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  return (
    <header className={styles.header}>
      <MobileMenu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        handleCloseMenu={handleCloseMenu}
      />
      <Logo />
      <ThemeSwitcher />

      <div className={styles.nav__desctop}>
        <Nav handleCloseMenu={handleCloseMenu} />
      </div>

      <BurgerIcon setShowMenu={setShowMenu} />
      <FavourIcon />
      <CartIcon />
    </header>
  );
};
