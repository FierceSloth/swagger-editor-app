import { getTranslations } from 'next-intl/server';

import styles from './about-hero-section.module.scss';
import { GlassCard } from '@/shared/ui/glass-card';
import { ArrowIcon } from '@/shared/ui/arrow-icon';

const RS_SCHOOL_LINK = 'https://rs.school/courses/reactjs';

export async function AboutHeroSection() {
  const t = await getTranslations('AboutHero');

  return (
    <div className={styles.container}>
      <div className={styles.containerLabel}>
        <GlassCard className={styles.courseLabel}>RS</GlassCard>
      </div>
      <div className={styles.content}>
        <p className={styles.label}>{t('label')}</p>

        <h3 className={styles.title}>{t('title')}</h3>

        <p className={styles.description}>{t('description')}</p>

        <a className={styles.link} href={RS_SCHOOL_LINK} target="_blank" rel="noopener noreferrer">
          {t('courseLink')}
          <ArrowIcon className={styles.arrow} />
        </a>
      </div>
    </div>
  );
}
