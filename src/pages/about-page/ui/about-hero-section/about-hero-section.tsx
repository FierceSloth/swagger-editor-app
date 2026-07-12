import { getTranslations } from 'next-intl/server';

import styles from './about-hero-section.module.scss';
import { GlassCard } from '@/shared/ui/glass-card';
import { ArrowIcon } from '@/shared/ui/arrow-icon';

export async function AboutHeroSection() {
  const t = await getTranslations('AboutHero');

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.containerLabel}>
          <GlassCard className={styles.courseLabel}>RS</GlassCard>
        </div>
        <div className={styles.content}>
          <p className={styles.label}>{t('label')}</p>

          <h1 className={styles.title}>{t('title')}</h1>

          <p className={styles.description}>{t('description')}</p>

          <a className={styles.link} href="https://rs.school/courses/reactjs" target="_blank" rel="noopener noreferrer">
            {t('courseLink')}
            <ArrowIcon className={styles.arrow} />
          </a>
        </div>
      </div>
    </section>
  );
}
