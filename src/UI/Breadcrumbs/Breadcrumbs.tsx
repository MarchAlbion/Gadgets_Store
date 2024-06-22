import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { ReactComponent as Home } from '../../assets/icons/Home.svg';
import { ReactComponent as Arrow } from '../../assets/icons/ArrowRight.svg';
import { Breadcrumb } from '../../types/Breadcrumb';
import { PATHS } from '../../constants';

interface Props {
  breadcrumbs: Breadcrumb[];
}

export const BreadcrumbsComponent: React.FC<Props> = ({ breadcrumbs }) => {
  const location = useLocation();

  const activeIndex = breadcrumbs.findIndex(
    breadcrumb => breadcrumb.path === location.pathname,
  );

  return (
    <div className={styles.breadcrumbs}>
      <Link to={PATHS.HOME} className={styles.breadcrumbs__link}>
        <Home className={styles.breadcrumbs__home} />
      </Link>

      <Arrow className={styles.breadcrumbs__icon} />

      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          <Link
            to={breadcrumb.path}
            className={`${styles.breadcrumbs__link} ${
              index === activeIndex ? styles.breadcrumbs__link__active : ''
            }`}
          >
            <span>{breadcrumb.label}</span>
          </Link>
          {index < breadcrumbs.length - 1 && (
            <Arrow className={styles.breadcrumbs__icon} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
