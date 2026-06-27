import { IBM_Plex_Sans, Space_Grotesk } from 'next/font/google';

import { ArcBackground } from '@/shared/ui/arc-background';

import '../src/app/styles/style.scss';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${spaceGrotesk.variable}`}>
      <body>
        <ArcBackground />
        {children}
      </body>
    </html>
  );
}
