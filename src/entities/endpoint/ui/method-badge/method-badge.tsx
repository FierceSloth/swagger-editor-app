import clsx from 'clsx';

import { Badge } from '@/shared/ui/badge';
import type { BadgeColor } from '@/shared/ui/badge';
import type { HttpMethod } from '../../types/http-types';

import styles from './method-badge.module.scss';

interface IProps {
  className?: string;
  type: HttpMethod;
}

const methodMaps: Record<HttpMethod, { color: BadgeColor; text: string }> = {
  get: { color: 'green', text: 'GET' },
  post: { color: 'blue', text: 'POST' },
  put: { color: 'purple', text: 'PUT' },
  delete: { color: 'red', text: 'DELETE' },
  patch: { color: 'orange', text: 'PATCH' },
  options: { color: 'gray', text: 'OPTIONS' },
  head: { color: 'gray', text: 'HEAD' },
};

export function MethodBadge({ className, type }: IProps) {
  const { color, text } = methodMaps[type] || { color: 'gray', text: 'UNKNOWN' };
  return (
    <Badge className={clsx(styles.badge, className)} color={color}>
      {text}
    </Badge>
  );
}
