import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './styles/globals.css'

import { ConsentManager } from '@/components/consent-manager'
import Footer from '@/components/global/footer/footer'
import NavBar from '@/components/global/navigation/navbar'

const inter = localFont({
  src: './fonts/InterVariable.ttf',
  display: 'swap',
  variable: '--font-inter',
})

const nunito = localFont({
  src: './fonts/NunitoVariable.ttf',
  display: 'swap',
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: {
    template: '%s | The Plankton Project',
    default: 'The Plankton Project',
  },
  description:
    'A CIC dedicated to researching the diversity of near-shore plankton and sharing that knowledge with others.',
  keywords: [
    'plankton',
    'marine biology',
    'oceanography',
    'environmental conservation',
    'marine ecosystems',
    'biodiversity',
    'climate change',
    'sustainability',
    'research',
    'education',
  ],
  referrer: 'origin-when-cross-origin',
  generator: 'Next.js',
  applicationName: 'The Plankton Project',
  authors: [
    { name: 'The Plankton Project', url: 'https://planktonproject.org.uk/' },
    { name: 'Big Pixel', url: 'https://www.big-pixel.com' },
  ],
  openGraph: {
    title: 'The Plankton Project',
    description:
      'A CIC dedicated to researching the diversity of near-shore plankton and sharing that knowledge with others.',
    url: 'https://planktonproject.org.uk/',
    siteName: 'The Plankton Project',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/metadata/og-generic.png`,
        width: 1200,
        height: 630,
        alt: 'The Plankton Project',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isEnabled: isDraftMode } = await draftMode()
  const [{ data: mainNav }, { data: footerNav }, { data: footerData }] = await Promise.all([
    sanityFetch({ query: navigationQuery }),
    sanityFetch({ query: footerNavigationQuery }),
    sanityFetch({ query: footerQuery }),
  ])

  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Plankton" />
      </head>
      <body className={`${inter.variable} ${nunito.variable} overflow-x-hidden`}>
        <ConsentManager>
          <div className="min-h-screen w-full flex flex-col">
            <Toaster />
            {isDraftMode && (
              <>
                <DraftModeToast />
                <VisualEditing />
              </>
            )}
            <SanityLive onError={handleError} />
            <NavBar mainNav={mainNav} />
            {children}
            <Footer footerNav={footerNav} footerData={footerData} />
          </div>
        </ConsentManager>
      </body>
    </html>
  )
}
