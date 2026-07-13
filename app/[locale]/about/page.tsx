import { AboutPage } from '@/pages/about-page';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('About');
  return {
    title: t('title'),
  };
}

export default function Page() {
  return (
    <main>
      <AboutPage />
    </main>
  );
}
