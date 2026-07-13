import { Spinner } from '@/shared/ui/spinner';

import styles from './loading.module.scss';

export default function Loading() {
  return (
    <main className={styles.loadingPage}>
      <Spinner />
    </main>
  );
}
