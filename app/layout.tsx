'use client'

import { Footer, Header, ResponsiveContainer } from '@/components'
import { userClient } from '@/lib/apollo/apollo-client'
import { ApolloProvider } from '@apollo/client'
import 'houdini-react-sdk/styles.css'
import { Outfit, Poppins } from 'next/font/google'

import '../styles/globals.css'

const outfit = Outfit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
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
        className={`${outfit.variable} ${poppins.variable} relative font-outfit bg-white text-white m-0 p-0`}
      >
        <div className="absolute w-full h-full top-[0px] left-[0px] bg-[#0e0e0e] z-[-3]"></div>
        <div className="absolute w-full h-full top-[0px] left-[0px] bg-cover custom-top-background-img z-[-2]"></div>

        <div className=" container mx-auto z-1">
          <ApolloProvider client={userClient}>
            <ResponsiveContainer>
              <Header />
              {children}
              <Footer />
            </ResponsiveContainer>
          </ApolloProvider>
        </div>
        <div id="portal"></div>
      </body>
    </html>
  )
}
