import { Button } from '../../../UI';
import { ReactComponent as Icon } from '../../../assets/icons/ArrowUp.svg';
import styles from './BackToTop.module.scss';
import { useTranslation } from 'react-i18next';
import { scrollToTop } from '../../../hooks/useScrollTop';

export const BackToTop = () => {
  const { t } = useTranslation();

  // useScrollToTop();

  return (
    <div className={styles.back} onClick={scrollToTop}>
      <span className={styles.back__link}>
        {t('footer.backToTop')}{' '}
        <Button type="icon" size={{ width: 32, height: 32 }}>
          <Icon className={styles.back__fill} />
        </Button>
      </span>
    </div>
  );
};
