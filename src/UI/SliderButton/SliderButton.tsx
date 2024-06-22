import React from 'react';

import { Button } from '../Button/Button';

import './SliderButton.scss';

import { ReactComponent as ArrowLeft } from '../../assets/icons/ArrowLeft.svg';

// eslint-disable-next-line max-len
import { ReactComponent as ArrowRight } from '../../assets/icons/ArrowRight.svg';

interface NavigationButtonProps {
  direction: 'prev' | 'next';
  className: string;
}

export const SliderButton: React.FC<NavigationButtonProps> = ({
  direction,
  className,
}) => {
  const isPrev = direction === 'prev';

  return (
    <div className={`${className} navigation-button`}>
      <Button type="icon" size={{ width: 32, height: 32 }}>
        {isPrev ? <ArrowLeft /> : <ArrowRight />}
      </Button>
    </div>
  );
};
