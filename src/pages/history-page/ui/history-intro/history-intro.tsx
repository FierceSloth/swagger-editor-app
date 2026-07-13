import { getTranslations } from 'next-intl/server';

import { Badge } from '@/shared/ui/badge';

import styles from './history-intro.module.scss';

export async function HistoryIntro() {
  const t = await getTranslations('HistoryPage');

  return (
    <div className={styles.wrapper}>
      <Badge className={styles.meta}>{t('badge', { id: '0492' })}</Badge>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.description}>{t('description')}</p>
    </div>
  );
}
