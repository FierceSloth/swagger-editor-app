import { getTranslations } from 'next-intl/server';

import styles from './about-project-section.module.scss';

export async function AboutProjectSection() {
  const t = await getTranslations('AboutProject');

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('title')}</h2>
      <p className={styles.description}>{t('description')}</p>
    </div>
  );
}
