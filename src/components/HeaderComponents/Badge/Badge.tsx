import styles from './Badge.module.scss';

type Props = {
  count: number;
};

export const Badge: React.FunctionComponent<Props> = ({ count }) => (
  <span className={styles.badge}>{count}</span>
);
