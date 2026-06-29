import { ArcBackground } from '@/shared/ui/arc-background';
import { routing } from '@shared/config/i18n/routing';
import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { IBM_Plex_Sans, Space_Grotesk } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import styles from '../app.module.scss';

import '@/app/styles/style.scss';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-ibm-plex',
});

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Swagger/OpenAPI UI',
  description: 'A web application for editing and testing REST APIs using OpenAPI specifications.',
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`${ibmPlexSans.variable} ${spaceGrotesk.variable}`}>
      <body>
        <ArcBackground />
        <NextIntlClientProvider>
          <main className={styles.container}>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
