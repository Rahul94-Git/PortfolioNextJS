import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio | Full Stack Developer',
  description: 'Professional portfolio showcasing full-stack development projects, skills, and experience in modern web technologies.',
  keywords: ['portfolio', 'full stack developer', 'web development', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Portfolio Owner' }],
  creator: 'Portfolio Owner',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Portfolio | Full Stack Developer',
    description: 'Professional portfolio showcasing full-stack development projects and skills.',
    siteName: 'Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Full Stack Developer',
    description: 'Professional portfolio showcasing full-stack development projects and skills.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}