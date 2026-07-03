import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('About');

  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  );
}
