import { getTranslations } from 'next-intl/server';
import styles from './history-intro.module.scss';

export async function HistoryIntro() {
  const t = await getTranslations('HistoryPage');

  return (
    <div>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.description}>{t('description')}</p>
    </div>
  );
}
