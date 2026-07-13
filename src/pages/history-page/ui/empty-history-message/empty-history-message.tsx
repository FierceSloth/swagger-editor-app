import { Activity as PulseIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Badge } from '@/shared/ui/badge';

import styles from './empty-history-message.module.scss';

export async function EmptyHistoryMessage() {
  const t = await getTranslations('History');

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <div className={styles.ringOuter} />
        <div className={styles.ringInner} />
        <div className={styles.iconGlow} />
        <PulseIcon className={styles.icon} />
      </div>
      <span className={styles.scanLabel}>
        <span className={styles.scanDot} />
        SCANNING_STREAM
      </span>
      <Badge className={styles.badge}>SYSTEM.STUB // NO_RECORDS_FOUND</Badge>
      <h1 className={styles.title}>{t('emptyTitle')}</h1>
      <p className={styles.description}>{t('emptyDescription')}</p>
    </div>
  );
}
