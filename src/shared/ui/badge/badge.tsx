import clsx from 'clsx';
import type { ReactElement, ReactNode } from 'react';

import styles from './badge.module.scss';

export type BadgeColor = 'gray' | 'green' | 'red' | 'blue' | 'purple' | 'orange';

interface StatusBadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  className?: string;
}

export function Badge({ children, color = 'gray', className }: StatusBadgeProps): ReactElement {
  return <div className={clsx(styles.statusBadge, styles[`color-${color}`], className)}>{children}</div>;
}
