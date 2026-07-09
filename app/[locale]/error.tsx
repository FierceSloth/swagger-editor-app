'use client';

import { useEffect, useRef } from 'react';
import { useToast } from '@/shared/ui/toast';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/button';

import styles from './error.module.scss';

interface IProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorFallback({ error, reset }: IProps) {
  const t = useTranslations('Error');
  const { showToast } = useToast();
  const isToastShown = useRef(false);

  useEffect(() => {
    if (isToastShown.current) {
      return;
    }

    isToastShown.current = true;

    showToast({ variant: 'error', title: t('title'), message: t('description') });

    console.error(error);
  }, [error, showToast, t]);

  return (
    <main className={styles.errorPage}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('title')}</h2>
        <p className={styles.description}>{t('description')}</p>

        <Button type="button" onClick={reset} className={styles.closeButton}>
          {t('tryAgain')}
        </Button>
      </div>
    </main>
  );
}
