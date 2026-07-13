import { AuthForm } from '@/features/auth-form';

import styles from './register.module.scss';

export function RegisterPage() {
  return (
    <div className={styles.pageWrapper}>
      <AuthForm variant="register" />
    </div>
  );
}
