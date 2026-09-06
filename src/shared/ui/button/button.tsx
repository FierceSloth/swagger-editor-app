import clsx from 'clsx';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';

import styles from './button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'tertiary';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export function Button({ children, className, variant = 'primary', ...rest }: IProps): ReactNode {
  return (
    <button className={clsx(styles.button, styles[variant], className)} {...rest}>
      {children}
    </button>
  );
}
