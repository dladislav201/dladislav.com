import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';

import { Footer } from '@/shared/ui';
import { Globalnav } from '@/widgets/globalNav/ui';

import '@/shared/styles/_variables.scss';
import '@/shared/styles/_keyframes.scss';
import '@/shared/styles/global.scss';

import { ReduxProvider } from '@/shared/config/store/reduxProvider';

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Vladyslav Dobrodii',
  creator: 'dladislav',
  publisher: 'dladislav',
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    siteName: 'Vladyslav Dobrodii',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  alternates: {
    canonical: 'https://www.dladislav.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexMono.variable}`}>
        <ReduxProvider>
          <Globalnav />
          {children}
          <Footer />
          <a rel="me" href="https://mastodon.social/@dladislav" hidden>
            Mastodon
          </a>
        </ReduxProvider>
      </body>
    </html>
  );
}
