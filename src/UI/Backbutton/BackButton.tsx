import { useNavigate } from 'react-router-dom';
import { ReactComponent as Left } from '../../assets/icons/ArrowLeftBold.svg';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <span className={styles.back} onClick={() => navigate(-1)}>
      <Left className={styles.back__img} />{' '}
      <p style={{ marginTop: '1.55px' }}>Back</p>
    </span>
  );
};
