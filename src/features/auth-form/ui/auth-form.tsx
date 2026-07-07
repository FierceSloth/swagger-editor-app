'use client';

import { GlassCard } from '@/shared/ui/glass-card';
import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver } from 'react-hook-form';
import { loginSchema, registerSchema, type RegisterFormValues, type LoginFormValues } from '../model/schemas';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { MoveRight as ArrowRight } from 'lucide-react';

import { Link } from '@/shared/config/i18n/navigation';
import styles from './auth-form.module.scss';
import { useState, useTransition } from 'react';
import { signInWithPassword, signUp } from '@/features/auth/model/action';

type AuthFormVariant = 'login' | 'register';
type AuthFormValues = LoginFormValues | RegisterFormValues;

interface IProps {
  variant: AuthFormVariant;
}

export function AuthForm({ variant }: IProps) {
  const isRegister = variant === 'register';
  const namespace = isRegister ? 'Register' : 'Login';
  const t = useTranslations(namespace);

  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const schema = isRegister ? registerSchema : loginSchema;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(schema) as Resolver<AuthFormValues>,
    mode: 'onChange',
  });

  const onSubmit = (values: AuthFormValues) => {
    setServerError(null);

    const formData = new FormData();
    formData.set('email', values.email);
    formData.set('password', values.password);

    startTransition(async () => {
      const result = isRegister ? await signUp(formData) : await signInWithPassword(formData);

      if (result?.error) {
        setServerError(t(`errors.${result.error}`));
      }
    });
  };

  return (
    <GlassCard className={styles.card}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </div>

      <form
        className={styles.form}
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
      >
        <Input
          className={styles.input}
          label={t('emailLabel')}
          placeholder="name@domain.com"
          type="email"
          {...register('email')}
          error={errors.email?.message ? t(`errors.${errors.email.message}`) : undefined}
        />
        <Input
          className={styles.input}
          label={t('passcodeLabel')}
          placeholder="••••••••"
          type="password"
          {...register('password')}
          error={errors.password?.message ? t(`errors.${errors.password.message}`) : undefined}
        />
        {isRegister && (
          <Input
            className={styles.input}
            label={t('confirmPasscodeLabel')}
            placeholder="••••••••"
            type="password"
            {...register('confirmPassword')}
            error={
              'confirmPassword' in errors && errors.confirmPassword?.message
                ? t(`errors.${errors.confirmPassword.message}`)
                : undefined
            }
          />
        )}
        {serverError && <p className={styles.serverError}>{serverError}</p>}
        <Button className={styles.button} type="submit" disabled={!isValid || isPending}>
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
