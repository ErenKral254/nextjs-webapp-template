import '@/styles/global.css';

import type { Metadata, Viewport } from 'next';
import React from 'react';

import ChakraProviders from '@/providers/ChakraProviders';

export const metadata: Metadata = {
  metadataBase: new URL('https://{{DOMAIN}}'),
  title: '{{APP_TITLE}}',
  description: '{{APP_TITLE}} - A Next.js Web Application',
  keywords: 'nextjs, react, typescript, chakra-ui',
  authors: [{ name: '{{GITHUB_ORG}}' }],
  creator: '{{GITHUB_ORG}}',
  manifest: '/manifest.json',
  applicationName: '{{APP_TITLE}}',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '{{APP_TITLE}}',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: '{{APP_TITLE}}',
    title: '{{APP_TITLE}}',
    description: '{{APP_TITLE}} - A Next.js Web Application',
    url: 'https://{{DOMAIN}}',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#3182ce',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProviders>{children}</ChakraProviders>
      </body>
    </html>
  );
}