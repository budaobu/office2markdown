import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/theme-provider'
// import { Analytics } from './components/analytics'

const inter = Inter({ subsets: ['latin'] })

// 定义 GA ID
// const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-1YPLDXL622'

export const metadata: Metadata = {
  title: 'Free office files to markdown converter',
  description: 'Convert Office files to Markdown format easily in your browser. Support for Word, Excel, PowerPoint, PDF, and more.',
  keywords: ['office', 'markdown', 'converter', 'docx', 'xlsx', 'pptx', 'pdf', 'online tool'],
  authors: [{ name: 'Joey Hu', url: 'https://markitdown.dakaiai.app' }],
  metadataBase: new URL('https://markitdown.dakaiai.app'),
  openGraph: {
    title: 'Free office files to markdown converter',
    description: 'Convert Office files to Markdown format easily in your browser',
    url: 'https://markitdown.dakaiai.app',
    siteName: 'Office to Markdown Converter',
    /* images: [
      {
        url: 'https://markitdown.dakaiai.app/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ], */
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free office files to markdown converter',
    description: 'Convert Office files to Markdown format easily in your browser',
    creator: '@lizhaoshui',
    // images: ['https://markitdown.dakaiai.app/twitter-image.jpg'],
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
  verification: {
    google: 'sGlqgAPbK-u7Wa1yVSCJO-bMoN7irMVCkUsJTtX3B4k',
    /* other: {
      'msvalidate.01': 'YOUR_BING_VERIFICATION_CODE', // Bing 验证码
      'yandex-verification': 'YOUR_YANDEX_VERIFICATION_CODE', // Yandex 验证码（如果需要）
      'y_key': 'YOUR_YAHOO_VERIFICATION_CODE', // Yahoo 验证码（如果需要）
    } */
  },
  /* icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    ],
  },
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Office to Markdown Converter',
  },
  applicationName: 'Office to Markdown Converter',
  msapplication: {
    tileColor: '#ffffff',
    tileImage: '/ms-icon-144x144.png',
  }, */
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        {/* <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" /> */}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {/* <Analytics measurementId={googleAnalyticsId} /> */}
      </body>
    </html>
  )
}