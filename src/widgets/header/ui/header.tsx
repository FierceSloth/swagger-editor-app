import { getTranslations } from 'next-intl/server';
import { LanguageSwitcher } from '@/features/language-switcher';
import { isAuthenticated } from '@/shared/lib/auth/is-authenticated';
import { Logo } from './logo';
import { PageNavigation } from './page-navigation';
import { PublicNavigation } from './public-navigation';
import { PrivateNavigation } from './private-navigation';

import styles from './header.module.scss';

export async function Header() {
  const t = await getTranslations('Header');

  return (
    <header className={styles.header}>
      <div className={styles.blockLeft}>
        <Logo />
        <PageNavigation aboutLabel={t('about')} />
      </div>
      <div className={styles.actions}>
        <LanguageSwitcher />

        {isAuthenticated ? (
          <PrivateNavigation historyLabel={t('history')} signOutLabel={t('signOut')} />
        ) : (
          <PublicNavigation signInLabel={t('signIn')} signUpLabel={t('signUp')} />
        )}
      </div>
    </header>
  );
}
