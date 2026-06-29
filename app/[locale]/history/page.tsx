import { getTranslations } from 'next-intl/server';

export default async function HistoryPage() {
  const t = await getTranslations('History');

  return <h1>{t('title')}</h1>;
}
