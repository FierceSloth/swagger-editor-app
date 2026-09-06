import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './glass-card.module.scss';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export function GlassCard({ className, children, ...rest }: IProps): ReactNode {
  return (
    <div className={clsx(styles.glassCard, className)} {...rest}>
      {children}
    </div>
  );
}
