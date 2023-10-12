import './globals.css'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'

import { Header, Footer, ResponsiveContainer } from '@/components'

const outfit = Outfit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'Houdini Swap',
  description:
    "Swap without a trace! Break the link between sending and receiving crypto wallets. You don't walk around with a nametag of your net worth in real life, so why should crypto be any different?",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-outfit`}>
        <ResponsiveContainer>
          <Header />
          {children}
          <Footer />
        </ResponsiveContainer>
      </body>
    </html>
  )
}
