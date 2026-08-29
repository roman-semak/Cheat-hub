import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Cheat Hub — шпаргалки та теорія для підготовки до співбесід: Architecture, React, Angular, JS/TS, Git, AI та практика LeetCode в редакторі коду.',
  keywords: ['cheatsheet', 'шпаргалка', 'співбесіда', 'interview', 'react', 'angular', 'javascript', 'typescript', 'git', 'ai', 'leetcode', 'algorithm', 'dsa', 'frontend'],
  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],
  creator: 'Roman Semak',
  category: 'education',
  classification: 'Education',
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Cheat Hub — шпаргалки та теорія для співбесід',
    description: 'Cheat Hub — шпаргалки та теорія для підготовки до співбесід: Architecture, React, Angular, JS/TS, Git, AI та практика LeetCode в редакторі коду.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Cheat Hub',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cheathub',
    creator: '@cheathub',
    title: 'Cheat Hub',
    description: 'Шпаргалки та теорія для підготовки до співбесід',
    images: ['/opengraph-image.png'],
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE_NAME,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    'color-scheme': 'dark light',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${inter.variable} ${mono.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100">
        <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
        {children}
      </body>
    </html>
  );
}
