import type { HistoryItem } from '@/features/history/api/history';
import { ROUTES } from '@/shared/config/routes';
import { ButtonLink } from '@/shared/ui/button-link';
import { getTranslations } from 'next-intl/server';
import { PenLine as EditorIcon, Eye as ViewerIcon } from 'lucide-react';
import { EmptyHistoryMessage } from './empty-history-message/empty-history-message';
import { HistoryIntro } from './history-intro/history-intro';
import { HistoryRequestCard } from './history-requst-card/history-request-card';
import styles from './history-page.module.scss';

interface HistoryPageProps {
  items: HistoryItem[];
}

export async function HistoryPage({ items }: HistoryPageProps) {
  const t = await getTranslations('History');

  if (!items.length) {
    return (
      <div className={styles.emptyContainer}>
        <EmptyHistoryMessage />
        <div className={styles.actions}>
          <ButtonLink className={styles.button} href={ROUTES.HOME} variant="primary">
            <EditorIcon className={styles.linkIcon} />
            {t('goToEditor')}
          </ButtonLink>
          <ButtonLink className={styles.button} href={ROUTES.HOME} variant="secondary">
            <ViewerIcon className={styles.linkIcon} />
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
