import { redirect } from '@shared/config/i18n/navigation';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;

  redirect({
    href: '/home',
    locale,
  });
}
