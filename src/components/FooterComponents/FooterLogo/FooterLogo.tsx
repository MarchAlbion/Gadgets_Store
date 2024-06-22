import styles from './FooterLogo.module.scss';
import logo from '../../../assets/Logo.svg';
import logoDark from '../../../assets/LogoDark.svg';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux';

export const FooterLogo = () => {
  const theme = useSelector(selectTheme);

  return (
    <a href="#" className={styles.logo}>
      <img
        src={theme === 'Original' ? logo : logoDark}
        alt="Nice gadgets store logo"
        className={styles.logo__img}
      />
    </a>
  );
};
