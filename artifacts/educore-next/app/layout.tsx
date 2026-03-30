import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { TopStrip } from '@/components/layout/TopStrip'
import { GlobalHeader } from '@/components/layout/GlobalHeader'
import { cn } from '@/lib/utils'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563EB',
}

const BASE_URL = 'https://educore.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

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
    'JEE coaching software',
    'NEET institute management',
  ],

  authors: [{ name: 'Divy Mohan — IIT Madras', url: BASE_URL }],
  creator: 'Divy Mohan',
  publisher: 'EduCore Technologies',
  category: 'Education Technology',

  // ── Open Graph (WhatsApp, Facebook, LinkedIn, Telegram) ──
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'EduCore ERP',
    title: 'EduCore ERP — Run Your School or Coaching on One Smart Platform',
    description:
      '500+ institutes trust EduCore. Automate fees, manage students, run live classes, solve doubts & track performance — all from one dashboard. Built by IIT Madras.',
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'EduCore ERP — All-in-One Coaching & School Management Platform',
        type: 'image/png',
      },
    ],
  },

  // ── Twitter / X Card ──
  twitter: {
    card: 'summary_large_image',
    site: '@educore_app',
    creator: '@divymohan_iit',
    title: 'EduCore ERP — Run Your School or Coaching on One Smart Platform',
    description:
      '500+ institutes trust EduCore. Automate fees, live classes, mock tests & doubts — all in one OS. Built by IIT Madras.',
    images: [`${BASE_URL}/twitter-image`],
  },

  // ── Robots ──
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

  // ── Canonical ──
  alternates: {
    canonical: BASE_URL,
  },

  // ── App / PWA ──
  applicationName: 'EduCore ERP',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'EduCore ERP',
    statusBarStyle: 'black-translucent',
  },

  // ── Verification ──
  verification: {
    google: 'GSC-VERIFICATION-CODE-REPLACE-ME',
    other: {
      'msvalidate.01': 'BING-VERIFICATION-CODE-REPLACE-ME',
      'indexnow-key': '47a274db24924c88b991cd47895f32eb',
    },
  },

  // ── Other ──
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${BASE_URL}/#software`,
      name: 'EduCore ERP',
      url: BASE_URL,
      applicationCategory: 'EducationApplication',
      operatingSystem: 'Web, iOS, Android',
      description:
        'All-in-one ERP platform for coaching institutes and schools — manage students, teachers, fees, attendance, video lectures, mock tests, and doubt resolution.',
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
      screenshot: `${BASE_URL}/opengraph-image`,
    },
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#org`,
      name: 'EduCore Technologies',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      founder: {
        '@type': 'Person',
        name: 'Divy Mohan',
        alumniOf: 'IIT Madras',
        jobTitle: 'Founder & CEO',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9506933715',
        contactType: 'customer support',
        availableLanguage: ['English', 'Hindi'],
      },
      sameAs: [
        'https://twitter.com/educore_app',
        'https://linkedin.com/company/educore',
        'https://instagram.com/educore.app',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'EduCore ERP',
      description: 'All-in-One Coaching & School Management Platform',
      publisher: { '@id': `${BASE_URL}/#org` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/search?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is EduCore ERP?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'EduCore ERP is an all-in-one coaching and school management platform that helps institutes manage students, fees, live classes, mock tests, and doubts from a single dashboard.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does EduCore cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'EduCore starts at ₹2,999/month for the Starter plan. Professional is ₹4,999/month and Enterprise is ₹6,999/month. All plans include a free trial.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is EduCore suitable for schools?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, EduCore supports K-12 schools, coaching institutes, tuition centers, and online educators with dedicated portals for students, teachers, and management.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className={cn(poppins.className, "overflow-x-hidden")} suppressHydrationWarning>
        <AuthProvider>
          <div className="relative flex flex-col min-h-screen">
            <TopStrip />
            {/* The GlobalHeader is fixed internally, so we don't need to wrap it specifically */}
            <GlobalHeader />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
