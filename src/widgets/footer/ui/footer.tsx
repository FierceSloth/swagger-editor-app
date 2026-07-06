import { getTranslations } from 'next-intl/server';
import { Link } from '@/shared/config/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';
import { Heart as HeartIcon } from 'lucide-react';

import styles from './footer.module.scss';

export async function Footer() {
  const t = await getTranslations('Footer');

  return (
    <footer className={styles.footer}>
      <Link href={ROUTES.ABOUT} className={styles.about}>
        {t('about')}
      </Link>
      <p>
        <span>
          {t('team1')}
          <HeartIcon className={styles.icon} aria-hidden="true" />
          {t('team2')}
        </span>
        {' // '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.schoolName}
        >
          RS School 2026
        </a>
      </p>
    </footer>
  );
}
