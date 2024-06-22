// eslint-disable-next-line max-len
import { BackToTop } from '../BackToTop/BackToTop';
import { FooterLogo } from '../FooterLogo/FooterLogo';
import { FooterSection } from '../FooterSection/FooterSection';
import styles from './Footer.module.scss';
import iconBlack from '../../../assets/icons/github.svg';
import iconWhite from '../../../assets/icons/gitWhite.svg';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux';

export const Footer = () => {
  const { t } = useTranslation();
  const theme = useSelector(selectTheme);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer__section}>
          <div className={styles.footer__logo}>
            <FooterLogo />
            <a
              className={styles.github}
              href="https://github.com/fs-mar-24-team-5/react_phone-catalog"
              target="_blank"
              rel="noreferrer"
            >
              <img src={theme === 'Original' ? iconBlack : iconWhite}></img>
              {t('footer.github')}
            </a>
          </div>
        </div>

        <div className={styles.footer__section}>
          <div className={styles.footer__links}>
            <FooterSection
              header={t('footer.info')}
              firstItem={t('footer.policy')}
              secondItem={t('footer.shipping')}
              thirdItem={t('footer.warranty')}
            />
          </div>
        </div>
        <div className={styles.footer__section}>
          <div className={styles.footer__links}>
            <FooterSection
              header={t('footer.contacts')}
              firstItem={'info@nicegadgets.store'}
              secondItem={'+1 563 25 48 455'}
              thirdItem={t('footer.address')}
              firstLink={'mailto:info@nicegadgets.store'}
              secondLink={'tel:+15632548455'}
              thirdLink={'https://maps.app.goo.gl/QKNfwXdCJv8sBiYz9'}
            />
          </div>
        </div>

        <div className={styles.footer__section}>
          <div className={styles.footer__buttons}>
            <BackToTop />
            {/* <LanguageSwitcher /> */}
          </div>
        </div>

        <div className={styles.copywrite}>
          <p>
            {t('footer.made')}{' '}
            <a
              href="https://github.com/fs-mar-24-team-5"
              className={styles.team}
              target="_blank"
              rel="noreferrer"
            >
              HACKERMEN
            </a>{' '}
            {t('footer.team')} - {t('footer.right')}
          </p>
          <p>
            <a
              href="https://github.com/sevenlays"
              className={styles.team__member}
              target="_blank"
              rel="noreferrer"
            >
              Sevenlays
            </a>
            ,{' '}
            <a
              href="https://github.com/ordila"
              className={styles.team__member}
              target="_blank"
              rel="noreferrer"
            >
              Ordila
            </a>
            ,{' '}
            <a
              href="https://github.com/MarchAlbion"
              className={styles.team__member}
              target="_blank"
              rel="noreferrer"
            >
              MarchAlbion
            </a>
            ,{' '}
            <a
              href="https://github.com/odunchyk"
              className={styles.team__member}
              target="_blank"
              rel="noreferrer"
            >
              Odunchyk
            </a>{' '}
            {t('footer.and')}{' '}
            <a
              href="https://github.com/Follder"
              className={styles.team__member}
              target="_blank"
              rel="noreferrer"
            >
              Follder
            </a>
          </p>
          <p>2024</p>
        </div>
      </div>
    </footer>
  );
};
