import AosInitializer from '@/components/core/aos-initializer'
import './globals.css'
import '@phosphor-icons/web/regular'
import '@phosphor-icons/web/bold'
import '@phosphor-icons/web/light'
import { Metadata } from 'next'
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
    template: '%s | Your App Name',
  },
  description:
    'Connect with skilled service providers across Africa for home repairs, cleaning, handyman services and more.',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Your App Name',
    description: 'Your app description',
    siteName: 'Your App Name',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your App Name',
    description: 'Your app description',
    creator: '@your_twitter',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={montserrat.className}>
        {children}
        <AosInitializer />
      </body>
    </html>
  )
}
