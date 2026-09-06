import clsx from 'clsx';
import type { ComponentProps, ReactElement, ReactNode } from 'react';

import { Link } from '@/shared/config/i18n/navigation';

import styles from './button-link.module.scss';

export type ButtonLinkVariant = 'primary' | 'secondary' | 'ghost';

interface IProps extends ComponentProps<typeof Link> {
  children: ReactNode;
  variant?: ButtonLinkVariant;
}

export function ButtonLink({ children, className, variant = 'primary', ...rest }: IProps): ReactElement {
  return (
    <Link className={clsx(styles.button, styles[variant], className)} {...rest}>
      {children}
    </Link>
  );
}
