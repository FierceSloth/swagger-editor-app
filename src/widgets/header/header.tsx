import { getTranslations } from 'next-intl/server';
import { Link } from '@/shared/config/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';
import Image from 'next/image';

import styles from './header.module.scss';

export async function Header() {
  const t = await getTranslations('Header');

  return (
    <header className={styles.header}>
      <div className={styles.block_right}>
        <Link href={ROUTES.HOME}>
          <div className={styles.logo}>
            <Image src="/logo.png" alt="AURA Editor" width={40} height={40} />
            <h1>
              AURA <span>{'// EDITOR'}</span>
            </h1>
          </div>
        </Link>
        <nav className={styles.nav}>
          <Link href={ROUTES.ABOUT}>{t('about')}</Link>
        </nav>
      </div>
      <div className={styles.actions}>
        <Link href={ROUTES.LOGIN}>{t('signIn')}</Link>
        <Link href={ROUTES.REGISTER}>{t('signUp')}</Link>
      </div>
    </header>
  );
}
