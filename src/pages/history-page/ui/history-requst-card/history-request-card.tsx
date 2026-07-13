import type { HistoryItem } from '@/features/history/api/history';
import { getTranslations } from 'next-intl/server';
import styles from './history-request-card.module.scss';

interface HistoryRequestCardProps {
  item: HistoryItem;
}

export async function HistoryRequestCard({ item }: HistoryRequestCardProps) {
  const t = await getTranslations('History');

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <span>{item.method}</span>
        <span>{item.url}</span>
      </div>

      <div className={styles.item}>
        <span className={styles.meta}>{t('status')}</span>
        <span className={styles.info}>{item.status}</span>
      </div>

      <div className={styles.item}>
        <span className={styles.meta}> {t('duration')}</span>
        <span className={styles.info}>{item.duration} ms</span>
      </div>

      <div className={styles.item}>
        <span className={styles.meta}> {t('timestamp')}</span>
        <span className={styles.info}>{new Date(item.timestamp).toLocaleString()}</span>
      </div>

      <div className={styles.item}>
        <span className={styles.meta}> {t('requestSize')}</span>
        <span className={styles.info}>{item.request_size ?? 0} B</span>
      </div>

      <div className={styles.item}>
        <span className={styles.meta}> {t('responseSize')}</span>
        <span className={styles.info}>{item.response_size ?? 0} B</span>
      </div>

      {item.error_details && (
        <div className={styles.item}>
          <span className={styles.meta}> {t('error')}</span>
          <span className={styles.infoError}>{item.error_details}</span>
        </div>
      )}
    </div>
  );
}
