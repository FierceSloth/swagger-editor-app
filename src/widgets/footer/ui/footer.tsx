import { getTranslations } from 'next-intl/server';
import { Link } from '@/shared/config/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';

import styles from './footer.module.scss';

export async function Footer() {
  const t = await getTranslations('Footer');

  return (
    <footer className={styles.footer}>
      <Link href={ROUTES.ABOUT} className={styles.about}>
        {t('about')}
      </Link>
      <p>
        {t('team')}
        <a href="https://rs.school/courses/reactjs" target="_blank" rel="noreferrer" className={styles.schoolName}>
          RS School 2026
        </a>
      </p>
    </footer>
  );
}
