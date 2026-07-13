import { ArcBackground } from '@/shared/ui/arc-background';
import { routing } from '@shared/config/i18n/routing';
import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { IBM_Plex_Sans, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { getCurrentUser } from '@/shared/api/supabase/get-current-user';
import { AuthProvider } from '@/features/auth/model/auth-provider';

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import '@/app/styles/style.scss';
import clsx from 'clsx';

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

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
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

  const user = await getCurrentUser();

  return (
    <html lang={locale} className={clsx(ibmPlexSans.variable, spaceGrotesk.variable, jetBrainsMono.variable)}>
      <body>
        <ArcBackground />
        <NextIntlClientProvider>
          <AuthProvider initialUser={user}>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
