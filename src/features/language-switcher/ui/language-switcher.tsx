'use client';

import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/shared/config/i18n/navigation';
import { Button } from '@/shared/ui/button';

import styles from './language-switcher.module.scss';

type Locale = 'en' | 'ru';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const isEngLang = locale === 'en';
  const isRusLang = locale === 'ru';

  const handleChange = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      return;
    }

    router.replace(pathname, {
      locale: nextLocale,
    });
  };

  return (
    <div className={styles.switcher}>
      <Button
        variant="ghost"
        className={clsx(styles.button, isEngLang && styles.active)}
        onClick={() => handleChange('en')}
        disabled={isEngLang}
      >
        EN
      </Button>
      <span className={styles.separator}>/</span>
      <Button
        variant="ghost"
        className={clsx(styles.button, isRusLang && styles.active)}
        onClick={() => handleChange('ru')}
        disabled={isRusLang}
      >
        RU
      </Button>
    </div>
  );
}
