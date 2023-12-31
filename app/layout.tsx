import './globals.css'
import type { Metadata } from 'next'
import { Comic_Neue, Sigmar } from 'next/font/google'

const comic = Comic_Neue({ subsets: ['latin'], weight: ["300", "400", "700"], variable: "--font-comic" })
const sigmar = Sigmar({subsets: ['latin'], weight: ["400"], variable: "--font-sigmar" })

export const metadata: Metadata = {
  title: 'Bada-boom',
  description: 'Game sederhana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${comic.variable} ${sigmar.variable} bg-[url('/image/neon-bg.jpg')] h-screen bg-cover bg-center`}>{children}</body>
    </html>
  )
}
