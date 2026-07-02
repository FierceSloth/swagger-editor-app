import { getTranslations } from 'next-intl/server';
import { Link } from '@/shared/config/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';
import Image from 'next/image';
import { ButtonLink } from '@/shared/ui/button-link';
import { LanguageSwitcher } from '@/features/language-switcher';
import { isAuthenticated } from '@/shared/lib/auth/is-authenticated';
import { Button } from '@/shared/ui/button';

import styles from './header.module.scss';

export async function Header() {
  const t = await getTranslations('Header');

  return (
    <header className={styles.header}>
      <div className={styles.blockLeft}>
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
        <LanguageSwitcher />

        {isAuthenticated ? (
          <>
            <ButtonLink variant="primary" href={ROUTES.HISTORY} className={styles.button}>
              {t('history')}
            </ButtonLink>
            <Button variant="secondary" className={styles.button}>
              {t('signOut')}
            </Button>
          </>
        ) : (
          <>
            <ButtonLink variant="primary" href={ROUTES.LOGIN} className={styles.button}>
              {t('signIn')}
            </ButtonLink>
            <ButtonLink variant="secondary" href={ROUTES.REGISTER} className={styles.button}>
              {t('signUp')}
            </ButtonLink>
          </>
        )}
      </div>
    </header>
  );
}
