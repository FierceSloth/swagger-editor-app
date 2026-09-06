import { redirect } from 'next/navigation';
import { HistoryPage } from '@/pages/history-page';
import { loadHistory } from '@/features/history/api/history';
import { getCurrentUser } from '@/shared/api/supabase';
import { ROUTES } from '@/shared/config/routes';
import styles from '../../app.module.scss';

export default async function Page() {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect(ROUTES.HOME);
  }

  const items = await loadHistory(user.id);

  return (
    <main className={styles.main}>
      <HistoryPage items={items} />
    </main>
  );
}
