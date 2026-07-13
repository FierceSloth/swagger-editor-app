import type { HistoryItem } from '@/features/history/api/history';
import { EmptyHistoryMessage } from './empty-history-message/empty-history-message';
import { ROUTES } from '@/shared/config/routes';
import { getTranslations } from 'next-intl/server';
import { HistoryIntro } from './history-intro/history-intro';
import { HistoryRequestCard } from './history-requst-card/history-request-card';
import styles from './history-page.module.scss';
import { ButtonLink } from '@/shared/ui/button-link';
interface HistoryPageProps {
  items: HistoryItem[];
}

export async function HistoryPage({ items }: HistoryPageProps) {
  const t = await getTranslations('History');

  if (!items.length) {
    return (
      <div className={styles.container}>
        <EmptyHistoryMessage />
        <div className={styles.buttons}>
          <ButtonLink href={ROUTES.HOME} variant="primary">
            {t('goToEditor')}
          </ButtonLink>
          <ButtonLink href={ROUTES.HOME} variant="secondary">
            {t('goToViewer')}
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <HistoryIntro />
      <div className={styles.list}>
        {items.map((item) => (
          <HistoryRequestCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
