'use client';

import { GlassCard } from '@/shared/ui/glass-card';
import { useTranslations } from 'next-intl';
import type { SubmitEvent } from 'react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { MoveRight as ArrowRight } from 'lucide-react';

import { Link } from '@/shared/config/i18n/navigation';
import styles from './auth-form.module.scss';

type AuthFormVariant = 'login' | 'register';

interface IProps {
  variant: AuthFormVariant;
}

export function AuthForm({ variant }: IProps) {
  const isRegister = variant === 'register';
  const namespace = isRegister ? 'Register' : 'Login';
  const t = useTranslations(namespace);

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault(); // ? temporary
  };

  return (
    <GlassCard className={styles.card}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <Input className={styles.input} label={t('emailLabel')} placeholder="name@domain.com" type="email" />
        <Input className={styles.input} label={t('passcodeLabel')} placeholder="••••••••" type="password" />
        {isRegister && (
          <Input className={styles.input} label={t('confirmPasscodeLabel')} placeholder="••••••••" type="password" />
        )}
        <Button className={styles.button}>
          {t('submitButton')} <ArrowRight className={styles.buttonIcon} />
        </Button>
      </form>

      <div className={styles.switchContainer}>
        {t('switchText')}
        <Link className={styles.switchLink} href={isRegister ? '/login' : '/register'}>
          {t('switchLink')}
        </Link>
      </div>
    </GlassCard>
  );
}
