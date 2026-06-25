import { type ReactElement } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }): ReactElement {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
