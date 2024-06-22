import React from 'react';
import styles from './FooterSection.module.scss';

interface Props {
  header: string;
  firstItem: string;
  secondItem: string;
  thirdItem: string;
  firstLink?: string;
  secondLink?: string;
  thirdLink?: string;
}

export const FooterSection: React.FC<Props> = ({
  header,
  firstItem,
  secondItem,
  thirdItem,
  secondLink = '#',
  firstLink = '#',
  thirdLink = '#',
}) => (
  <div className={styles.block}>
    <h5 className={styles.block__title}>{header}</h5>
    <ul className={styles.block__list}>
      <li className="list__item">
        <a href={firstLink} className={styles.block__link}>
          {firstItem}
        </a>
      </li>
      <li className="list__item">
        <a href={secondLink} className={styles.block__link}>
          {secondItem}
        </a>
      </li>
      <li className="list__item">
        <a href={thirdLink} className={styles.block__link}>
          {thirdItem}
        </a>
      </li>
    </ul>
  </div>
);
