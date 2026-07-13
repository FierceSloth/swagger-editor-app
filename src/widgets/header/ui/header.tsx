import { getTranslations } from 'next-intl/server';
import { LanguageSwitcher } from '@/features/language-switcher';
import { Logo } from './logo';
import { PageNavigation } from './page-navigation';
import { PublicNavigation } from './public-navigation';
import { PrivateNavigation } from './private-navigation';
import { getCurrentUser } from '@/shared/api/supabase';

import styles from './header.module.scss';

export async function Header() {
  const t = await getTranslations('Header');
  const user = await getCurrentUser();

  return (
    <header className={styles.header}>
      <div className={styles.blockLeft}>
        <Logo />
        <PageNavigation aboutLabel={t('about')} />
      </div>
      <div className={styles.actions}>
        <LanguageSwitcher />

        {user ? (
          <PrivateNavigation historyLabel={t('history')} signOutLabel={t('signOut')} />
        ) : (
          <PublicNavigation signInLabel={t('signIn')} signUpLabel={t('signUp')} />
        )}
      </div>
    </header>
  );
}
