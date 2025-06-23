import AosInitializer from '@/components/core/aos-initializer'
import PWARegister from '@/components/core/pwa-register'
import OfflinePage from '@/components/core/offline-page'
import PWAInstallGuide from '@/components/core/pwa-install-guide'
import './globals.css'
import '@phosphor-icons/web/regular'
import '@phosphor-icons/web/bold'
import '@phosphor-icons/web/light'
import { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import 'aos/dist/aos.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: {
    default: 'Bollo',
    template: '%s | Bollo',
  },
  description:
    'Connect with skilled service providers across Africa for home repairs, cleaning, handyman services and more.',
  keywords: ['services', 'handyman', 'cleaning', 'repairs', 'africa', 'pwa'],
  authors: [{ name: 'Bollo Team' }],
  creator: 'Bollo Team',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Bollo',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bollo.com',
    title: 'Bollo - Connect with Skilled Service Providers',
    description: 'Connect with skilled service providers across Africa for home repairs, cleaning, handyman services and more.',
    siteName: 'Bollo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bollo - Connect with Skilled Service Providers',
    description: 'Connect with skilled service providers across Africa for home repairs, cleaning, handyman services and more.',
    creator: '@bollo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Bollo" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tileimage" content="/icons/icon-144x144.png" />
      </head>
      <body className={montserrat.className}>
        {children}
        <AosInitializer />
        <PWARegister />
        <OfflinePage />
        <PWAInstallGuide />
      </body>
    </html>
  )
}
