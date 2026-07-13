import { getTranslations } from 'next-intl/server';

export async function EmptyHistoryMessage() {
  const t = await getTranslations('History');

  return (
    <div>
      <h2>{t('emptyTitle')}</h2>
      <p>{t('emptyDescription')}</p>
    </div>
  );
}
