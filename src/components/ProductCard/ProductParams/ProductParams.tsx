import styles from './ProductParams.module.scss';

type Props = {
  children: React.ReactNode;
  techSpecs?: boolean;
};

export const ProductParams: React.FC<Props> = ({
  children,
  techSpecs = false,
}) => {
  return (
    <section
      className={techSpecs ? styles.phoneParams__techSpecs : styles.phoneParams}
    >
      {children}
    </section>
  );
};
