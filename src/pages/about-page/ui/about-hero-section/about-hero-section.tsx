import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import styles from './about-hero-section.module.scss';

export async function AboutHeroSection() {
  const t = await getTranslations('AboutHero');

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.label}>{t('label')}</p>

          <h1 className={styles.title}>{t('title')}</h1>

          <p className={styles.description}>{t('description')}</p>

          <Link
            className={styles.link}
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('courseLink')}
            <span className={styles.arrow}>arrow</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
