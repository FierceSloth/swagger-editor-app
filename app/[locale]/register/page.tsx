import { getTranslations } from 'next-intl/server';

export default async function RegisterPage() {
  const t = await getTranslations('Register');

  return <h1>{t('title')}</h1>;
}
