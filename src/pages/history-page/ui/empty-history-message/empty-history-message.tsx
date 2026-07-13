import { getTranslations } from 'next-intl/server';
import styles from './empty-history-message.module.scss';

export async function EmptyHistoryMessage() {
  const t = await getTranslations('History');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('emptyTitle')}</h1>
      <p className={styles.description}>{t('emptyDescription')}</p>
    </div>
  );
}
