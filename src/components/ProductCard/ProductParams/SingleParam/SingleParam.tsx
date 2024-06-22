import styles from './SingleParam.module.scss';

type Props = {
  name: string;
  param: string | undefined;
};

export const SingleParam: React.FC<Props> = ({ name, param }) => {
  return (
    <div className={styles.phoneParam}>
      <p className={styles.phoneParam__name}>{name}</p>
      <p className={styles.phoneParam__overview}>{param}</p>
    </div>
  );
};
