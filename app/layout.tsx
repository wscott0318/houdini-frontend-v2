import { Footer, Header, ResponsiveContainer } from '@/components'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'

import './globals.css'

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
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${outfit.variable} container mx-auto font-outfit bg-[#2e2d3e]`}
      >
        <ResponsiveContainer>
          <Header />
          {children}
          <Footer />
        </ResponsiveContainer>
        <div id="portal"></div>
      </body>
    </html>
  )
}
