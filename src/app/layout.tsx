import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { Globalnav, Footer } from "@/components";

import "@/app/styles/utils/_variables.scss";
import "@/app/styles/utils/_keyframes.scss";
import "@/app/styles/global.scss";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Vladyslav Dobrodii",
  creator: "dladislav",
  publisher: "dladislav",
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
    siteName: "Vladyslav Dobrodii",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: "https://www.dladislav.com",
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
        <Globalnav />
        {children}
        <Footer />
        <a rel="me" href="https://mastodon.social/@dladislav" hidden>
          Mastodon
        </a>
      </body>
    </html>
  );
}
