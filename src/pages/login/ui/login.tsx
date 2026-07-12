import { AuthForm } from '@/features/auth-form';

import styles from './login.module.scss';

export function LoginPage() {
  return (
    <div className={styles.pageWrapper}>
      <AuthForm variant="login" />
    </div>
  );
}
