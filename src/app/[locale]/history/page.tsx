import { getTranslations } from 'next-intl/server';

export default async function HistoryPage() {
  const t = await getTranslations('History');

  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  );
}
