import styles from './Pagination.module.scss';
import React from 'react';
/* eslint-disable max-len */
import { ReactComponent as ArrowLeftBold } from '../../assets/icons/ArrowLeft.svg';
import { ReactComponent as ArrowRightBold } from '../../assets/icons/ArrowRight.svg';
import { Button } from '../Button/Button';

const BUTTON_TRANSITION = 'background-color 0.3s, transform 0.3s ease-in-out';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const itemWidth = 32;
  const gapWidth = 8;

  const translate = (currentPage - 1 - 2) * -(itemWidth + gapWidth);
  const maxTranslate = -(totalPages - 5) * (itemWidth + gapWidth);
  const newTranslate = Math.max(Math.min(translate, 0), maxTranslate);

  const dynamicStyles = {
    transform: `translateX(${newTranslate}px)`,
    transition: BUTTON_TRANSITION,
  };

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <div>
        {currentPage === 1 ? (
          <Button type="icon" size={{ height: 32 }} state="disabled">
            <ArrowLeftBold className="pagination__arrow" />
          </Button>
        ) : (
          <Button
            type="icon"
            size={{ height: 32 }}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ArrowLeftBold className="pagination__arrow" />
          </Button>
        )}
      </div>

      <div className={styles.pagination__numbers}>
        {pageNumbers.map(page => {
          return (
            <Button
              key={page}
              type="number"
              state={currentPage === page ? 'selected' : undefined}
              size={{ height: 32 }}
              onClick={() => onPageChange(page)}
              style={
                pageNumbers.length >= 4
                  ? dynamicStyles
                  : { transition: BUTTON_TRANSITION }
              }
            >
              {page}
            </Button>
          );
        })}
      </div>

      <div>
        {currentPage === totalPages ? (
          <Button type="icon" size={{ height: 32 }} state="disabled">
            <ArrowRightBold className="pagination__arrow" />
          </Button>
        ) : (
          <Button
            type="icon"
            size={{ height: 32 }}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ArrowRightBold className="pagination__arrow" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
