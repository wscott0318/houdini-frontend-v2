'use client'

import { Footer, Header, ResponsiveContainer } from '@/components'
import { userClient } from '@/lib/apollo/apollo-client'
import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className="m-0 p-0">
      <head>
        <title>Houdini Swap</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Swap without a trace! Break the link between sending and receiving crypto wallets. You don't walk around with a nametag of your net worth in real life, so why should crypto be any different?"
        />
      </head>
      <body
        className={`${outfit.variable} container mx-auto font-outfit bg-[#1e1d28] text-white m-0 p-0`}
      >
        <ApolloProvider client={userClient}>
          <ResponsiveContainer>
            <Header />
            {children}
            <Footer />
          </ResponsiveContainer>
        </ApolloProvider>
        <div id="portal"></div>
      </body>
    </html>
  )
}
