import { BackButton } from '../../UI/Backbutton/BackButton';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className="page__container">
      <h1 className={styles.some__pageName}>404 PAGE NOT FOUND</h1>
      <BackButton />
      <div className={styles.some}></div>
    </div>
  );
};
