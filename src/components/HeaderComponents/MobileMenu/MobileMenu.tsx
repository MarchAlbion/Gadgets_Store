import { Button } from '../../../UI';
import { Logo } from '../../Logo/Logo';
import { CloseIcon } from '../CloseIcon/CloseIcon';
import styles from './MobileMenu.module.scss';
import favouriteIcon from '../../../assets/icons/Favourites.svg';
import cartIcon from '../../../assets/icons/Shopping bag.svg';
import cn from 'classnames';
import { Nav } from '../Nav/Nav';

type Props = {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileMenu: React.FC<Props> = ({ showMenu, setShowMenu }) => {
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
        <Nav />
      </div>

      <div className={styles.footer}>
        <div
          className={cn(styles.icon__large, {
            [styles.icon__large_active]: true,
          })}
        >
          <Button type="icon" size={{ width: 100, height: 100 }} measure="%">
            <img src={favouriteIcon} alt="Icon" />
          </Button>
        </div>
        <div
          className={cn(styles.icon__large, {
            [styles.icon__large_active]: false,
          })}
        >
          <Button type="icon" size={{ width: 100, height: 100 }} measure="%">
            <img src={cartIcon} alt="Icon" />
          </Button>
        </div>
      </div>
    </aside>
  );
};