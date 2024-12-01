import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  color: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
};

export const Button: React.FC<Props> = ({ children, color, onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(styles.button, {
        [styles.button_red]: color === 'red',
        [styles.button_green]: color === 'green',
        [styles.button_blue]: color === 'blue',
      })}
    >
      {children}
    </button>
  );
};

export default Button;
