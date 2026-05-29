import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import { NativeInit } from '@/components/NativeInit';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'OctaFight Fantasy — The Ultimate MMA Fantasy Experience',
    template: '%s | OctaFight Fantasy',
  },
  description:
    'Build your MMA dream team, compete in daily fantasy contests, and win real cash prizes. The most immersive UFC fantasy sports platform.',
  keywords: ['UFC', 'MMA', 'fantasy sports', 'fantasy MMA', 'UFC fantasy', 'fight picks'],
  authors: [{ name: 'OctaFight Fantasy' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://octafight.gg',
    siteName: 'OctaFight Fantasy',
    title: 'OctaFight Fantasy — The Ultimate MMA Fantasy Experience',
    description:
      'Build your MMA dream team, compete in daily fantasy contests, and win real cash prizes.',
    images: [
      {
        url: 'https://octafight.gg/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OctaFight Fantasy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OctaFight Fantasy',
    description: 'The Ultimate MMA Fantasy Experience',
    creator: '@octafight',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#080c12',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#080c12] text-white">
        <NativeInit />
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: '#0f1520',
              border: '1px solid #1e2a3a',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
