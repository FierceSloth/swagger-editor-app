import { Timer as DurationIcon, Calendar as TimestampIcon, AlertCircle as ErrorIcon } from 'lucide-react';

import type { HistoryItem } from '@/features/history/api/history';
import { MethodBadge, type HttpMethod } from '@/entities/endpoint';
import { Badge } from '@/shared/ui/badge';
import { getStatusLabel, getStatusColor, formatSize, formatDuration, formatTimestamp } from '../../lib/format-history';

import styles from './history-request-card.module.scss';

interface HistoryRequestCardProps {
  item: HistoryItem;
}

export function HistoryRequestCard({ item }: HistoryRequestCardProps) {
  const method = item.method.toLowerCase() as HttpMethod;

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <MethodBadge type={method} />
        <span className={styles.url}>{item.url}</span>

        <div className={styles.meta}>
          <Badge color={getStatusColor(item.status)} className={styles.statusBadge}>
            {getStatusLabel(item.status)}
          </Badge>

          <span className={styles.metaItem}>
            <DurationIcon className={styles.metaIcon} />
            {formatDuration(item.duration)}
          </span>

          <span className={styles.metaItem}>
            <TimestampIcon className={styles.metaIcon} />
            {formatTimestamp(item.timestamp)}
          </span>

          <span className={styles.metaItem}>
            Req: {formatSize(item.request_size)}
            <span className={styles.separator}>|</span>
            Res: {formatSize(item.response_size)}
          </span>
        </div>
      </div>

      {item.error_details && (
        <div className={styles.errorRow}>
          <ErrorIcon className={styles.errorIcon} />
          <span className={styles.errorLabel}>Error:</span>
          <span className={styles.errorText}>{item.error_details}</span>
        </div>
      )}
    </div>
  );
}
