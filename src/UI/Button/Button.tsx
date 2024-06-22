/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import { makeColorDarker } from '../../utils/makeColorDarker';
import { ReactComponent as ArrowLeft } from '../../assets/icons/ArrowLeftBold.svg';
import getHexFromColorName from '../../utils/LiteralColorToHex';

type Size = {
  width?: number;
  height: number;
};

interface CustomCSSProperties extends React.CSSProperties {
  '--btn-width': string;
  '--btn-height': string;
  '--radio-color'?: string;
  '--radio-hover-color'?: string;
}

type ButtonProps = {
  type: 'number' | 'radio' | 'icon' | 'back' | 'primary' | 'sign';
  size: Size;
  measure?: 'px' | '%';
  state?: 'selected' | 'disabled' | 'header';
  color?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  type,
  state,
  size,
  measure = 'px',
  color,
  style: inlineStyle,
  onClick,
  children,
}) => {
  const btnClass = classNames(styles.btn, styles[`btn__${type}`], {
    [styles[`btn__${type}--${state}`]]: state,
  });

  const darkerColor = color ? makeColorDarker(color, 15) : undefined;
  const style: CustomCSSProperties = {
    '--btn-width': `${size.width}${measure}`,
    '--btn-height': `${size.height}${measure}`,
    ...(type === 'radio' && color
      ? {
          '--radio-color': getHexFromColorName(color),
          '--radio-hover-color': darkerColor,
        }
      : {}),
    ...inlineStyle,
  };

  return (
    <button className={btnClass} onClick={onClick} style={style}>
      {type === 'back' && <ArrowLeft className={`${styles.arrowLeft}`} />}
      {children}
    </button>
  );
};
