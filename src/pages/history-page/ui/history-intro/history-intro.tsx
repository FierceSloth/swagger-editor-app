import { getTranslations } from 'next-intl/server';

export async function HistoryIntro() {
  const t = await getTranslations('HistoryPage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
