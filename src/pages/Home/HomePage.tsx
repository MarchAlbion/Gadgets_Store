import { Link } from 'react-router-dom';
import { SliderSection, HomeSlider, Chat } from '../../components';

import styles from './HomePage.module.scss';

import {
  getBrandNewModels,
  getHotPrices,
} from '../../services/filteForSliders';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  selectAccessories,
  selectAllProducts,
  selectPhones,
  selectTablets,
} from '../../redux';

export const HomePage = () => {
  const { t } = useTranslation();

  const countOfPhones = useSelector(selectPhones).length;
  const countOfTablets = useSelector(selectTablets).length;
  const countOfAccsesories = useSelector(selectAccessories).length;

  const products = useSelector(selectAllProducts);

  return (
    <div className={styles['page-wrapper']}>
      <section>
        <div className={styles.container}>
          <h1 className={styles['main-title']}>{t('homePage.welcome')}</h1>
        </div>
        <HomeSlider />
      </section>

      <SliderSection
        title={t('homePage.brandNewModels')}
        prevButtonClass="buttonBrand-prev"
        nextButtonClass="buttonBrand-next"
        arrayToMap={getBrandNewModels(products)}
      />

      <section className={styles['shop-by-category']}>
        <div className={styles.container}>
          <h2 className={styles.title}>{t('homePage.shopByCategory')}</h2>

          <div className={styles.cards}>
            <div className={styles.card}>
              <Link to="/phones" className={styles.link}>
                <div className={styles.image} />
                <h3 className={styles.subtitle}>
                  {t('homePage.mobilePhones')}
                </h3>
                <p className={styles.description}>
                  {countOfPhones} {t('homePage.models')}
                </p>
              </Link>
            </div>
            <div className={styles.card}>
              <Link to="/tablets" className={styles.link}>
                <div className={`${styles.image} ${styles.tablets}`} />
                <h3 className={styles.subtitle}>{t('homePage.tablets')}</h3>
                <p className={styles.description}>
                  {countOfTablets} {t('homePage.models')}
                </p>
              </Link>
            </div>
            <div className={styles.card}>
              <Link to="/accessories" className={styles.link}>
                <div className={`${styles.image} ${styles.accessories}`} />
                <h3 className={styles.subtitle}>{t('homePage.accessories')}</h3>

                <p className={styles.description}>
                  {countOfAccsesories} {t('homePage.models')}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SliderSection
        title={t('homePage.hotPrices')}
        prevButtonClass="buttonHotPrice-prev"
        nextButtonClass="buttonHotPrice-next"
        arrayToMap={getHotPrices(products)}
        withDiscount={true}
      />
      <Chat />
    </div>
  );
};
