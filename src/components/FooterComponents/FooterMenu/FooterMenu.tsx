import { useTranslation } from 'react-i18next';
import styles from './FooterMenu.module.scss';

export const FooterMenu = () => {
  const { t } = useTranslation();

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li className="nav__item">
          <a href="#" className={styles.nav__link}>
            {t('footer.github')}
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className={styles.nav__link}>
            {t('footer.contacts')}
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className={styles.nav__link}>
            {t('footer.rights')}
          </a>
        </li>
      </ul>
    </nav>
  );
};
