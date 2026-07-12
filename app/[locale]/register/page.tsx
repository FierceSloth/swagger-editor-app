import { AuthForm } from '@/features/auth-form';
import styles from '../../app.module.scss';

export default function Page() {
  return (
    <main className={styles.main}>
      <AuthForm variant="register" />
    </main>
  );
}
