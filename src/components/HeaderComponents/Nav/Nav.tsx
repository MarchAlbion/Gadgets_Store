import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';
import { PATHS } from '../../../constants';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

type Props = {
  handleCloseMenu: () => void;
};

function getNavLinkClassName(isActive: boolean) {
  return cn(styles.nav__link, { [styles.nav__link_active]: isActive });
}

export const Nav: React.FunctionComponent<Props> = ({ handleCloseMenu }) => {
  const { t } = useTranslation();

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li>
          <NavLink
            to={PATHS.HOME}
            className={({ isActive }) => getNavLinkClassName(isActive)}
            onClick={handleCloseMenu}
          >
            {t('nav.home')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${PATHS.PHONES.LIST}`}
            className={({ isActive }) => getNavLinkClassName(isActive)}
            onClick={handleCloseMenu}
          >
            {t('nav.phones')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${PATHS.TABLETS.LIST}`}
            className={({ isActive }) => getNavLinkClassName(isActive)}
            onClick={handleCloseMenu}
          >
            {t('nav.tablets')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${PATHS.ACCESSORIES.LIST}`}
            className={({ isActive }) => getNavLinkClassName(isActive)}
            onClick={handleCloseMenu}
          >
            {t('nav.accessories')}
          </NavLink>
        </li>
      </ul>
      <LanguageSwitcher />
    </nav>
  );
};
