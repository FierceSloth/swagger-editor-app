import type { HistoryItem } from '@/features/history/api/history';
import { getTranslations } from 'next-intl/server';

interface HistoryRequestCardProps {
  item: HistoryItem;
}

export async function HistoryRequestCard({ item }: HistoryRequestCardProps) {
  const t = await getTranslations('History');

  return (
    <div>
      <div>
        <span>{item.method}</span>
        <span>{item.url}</span>
      </div>

      <div>
        <span>
          {t('status')}: {item.status}
        </span>
        <span>
          {t('duration')}: {item.duration} ms
        </span>
      </div>

      <div>
        <span>
          {t('timestamp')}: {new Date(item.timestamp).toLocaleString()}
        </span>
      </div>

      <div>
        <span>
          {t('requestSize')}: {item.request_size ?? 0} B
        </span>
        <span>
          {t('responseSize')}: {item.response_size ?? 0} B
        </span>
      </div>

      {item.error_details && (
        <div>
          <span>
            {t('error')}: {item.error_details}
          </span>
        </div>
      )}
    </div>
  );
}
