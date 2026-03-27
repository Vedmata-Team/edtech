import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563EB',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://educore.app'),
  title: {
    default: 'EduCore ERP — All-in-One Coaching & School Management Platform',
    template: '%s | EduCore ERP',
  },
  description:
    'EduCore is the #1 ERP software for coaching institutes and schools in India. Manage students, teachers, fees, attendance, live classes, mock tests, and doubts — all in one powerful platform. Trusted by 500+ institutes.',
  keywords: [
    'coaching ERP software',
    'school management system',
    'online coaching platform',
    'edtech ERP India',
    'coaching center software',
    'student management system',
    'fee management software',
    'attendance management system',
    'live classes platform',
    'mock test software',
    'doubt solving app',
    'coaching institute management',
    'best ERP for coaching centers',
    'school ERP India',
  ],
  authors: [{ name: 'EduCore Technologies', url: 'https://educore.app' }],
  creator: 'EduCore Technologies',
  publisher: 'EduCore Technologies',
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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://educore.app',
    siteName: 'EduCore ERP',
    title: 'EduCore ERP — All-in-One Coaching & School Management Platform',
    description:
      'Streamline your coaching institute with EduCore. 500+ institutes trust us for student management, fee collection, live classes, mock tests, and analytics.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EduCore ERP — Coaching Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduCore ERP — All-in-One Coaching & School Management Platform',
    description: 'The #1 ERP platform for coaching institutes and schools in India.',
    images: ['/og-image.jpg'],
  },
  category: 'Education Technology',
  alternates: {
    canonical: 'https://educore.app',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'EduCore ERP',
  applicationCategory: 'EducationApplication',
  description:
    'All-in-one ERP platform for coaching institutes and schools — manage students, teachers, fees, attendance, video lectures, mock tests, and doubt resolution.',
  operatingSystem: 'Web, iOS, Android',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '2999',
    highPrice: '6999',
    priceCurrency: 'INR',
    offerCount: '3',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1247',
    bestRating: '5',
    worstRating: '1',
  },
  publisher: {
    '@type': 'Organization',
    name: 'EduCore Technologies',
    url: 'https://educore.app',
    logo: 'https://educore.app/logo.png',
    sameAs: ['https://twitter.com/educore', 'https://linkedin.com/company/educore'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
