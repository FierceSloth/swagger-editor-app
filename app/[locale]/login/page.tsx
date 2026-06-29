import { getTranslations } from 'next-intl/server';

export default async function LoginPage() {
  const t = await getTranslations('Login');

  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  );
}
