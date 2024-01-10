'use client'

import { ApolloProvider } from '@apollo/client'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import 'houdini-react-sdk/styles.css'
import { MatomoProvider, createInstance } from 'matomo-react'
import { Outfit, Poppins } from 'next/font/google'
import { useSearchParams } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { bsc, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

import { Footer, Header, ResponsiveContainer } from '@/components'
import { userClient } from '@/lib/apollo/apollo-client'
import { useWindowSize } from '@/utils/hooks/useWindowSize'

// import { smokeEffect } from '@/utils/smokeEffect'
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

const { chains, publicClient } = configureChains(
  [mainnet, bsc],
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'HoudiniSwap',
  projectId: process.env.NEXT_APP_PROJECT_ID || '',
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

if (process.env.NODE_ENV !== 'production') {
  // Adds messages only in a dev environment
  loadDevMessages()
  loadErrorMessages()
}

const instance = createInstance({
  urlBase: 'https://api5.houdiniswap.com',
  siteId: 1,
  // userId: 'UID76903202', // optional, default value: `undefined`.
  trackerUrl: 'https://api5.houdiniswap.com/session.php', // optional, default value: `${urlBase}matomo.php`
  srcUrl: 'https://api5.houdiniswap.com/session.js', // optional, default value: `${urlBase}matomo.js`
  // permanentTitle: 'My Awesome App', // optional, always use this title for tracking, ignores document.title. Useful for SPAs.
  // permanentHref: '/', // optional, always use this href for tracking, ignores window.location.href. Useful for SPAs.
  disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
  heartBeat: {
    // optional, enabled by default
    active: true, // optional, default value: true
    seconds: 15, // optional, default value: 15
  },
  linkTracking: true, // optional, default value: true
  configurations: {
    // optional, default value: {}
    // any valid matomo configuration, all below are optional
    // disableCookies: true,
    setSecureCookie: process.env.NODE_ENV === 'production',
    setRequestMethod: 'POST',
  },
})

export default function RootLayout({ children }: LayoutProps) {
  const [width] = useWindowSize()

  const searchParams = useSearchParams()

  const widgetMode = searchParams.get('widgetMode')

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
        className={`${outfit.variable} ${poppins.variable} relative font-outfit bg-black text-white m-0 p-0`}
      >
        {!widgetMode ? (
          <>
            <div className="absolute w-full h-full top-[0px] left-[0px] bg-[#0e0e0e] z-[-3]" />
            <div className="absolute w-full h-full top-[0px] left-[0px] bg-cover custom-top-background-img z-[-2]" />
          </>
        ) : null}

        {!widgetMode ? (
          <div className="container mx-auto z-1">
            <MatomoProvider value={instance}>
              <ApolloProvider client={userClient}>
                <WagmiConfig config={wagmiConfig}>
                  <RainbowKitProvider chains={chains}>
                    <ResponsiveContainer>
                      <Header />
                      {children}
                      <ToastContainer
                        position={width <= 767 ? 'bottom-right' : 'top-right'}
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                        className="m-10"
                      />
                      <Footer />
                    </ResponsiveContainer>
                  </RainbowKitProvider>
                </WagmiConfig>
              </ApolloProvider>
            </MatomoProvider>
          </div>
        ) : (
          <MatomoProvider value={instance}>
            <ApolloProvider client={userClient}>
              <WagmiConfig config={wagmiConfig}>
                <RainbowKitProvider chains={chains}>
                  <ResponsiveContainer>
                    {children}
                    <ToastContainer
                      position={width <= 767 ? 'bottom-right' : 'top-right'}
                      autoClose={3000}
                      hideProgressBar={false}
                      newestOnTop
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="colored"
                      className="m-10"
                    />
                  </ResponsiveContainer>
                </RainbowKitProvider>
              </WagmiConfig>
            </ApolloProvider>
          </MatomoProvider>
        )}

        <div id="portal"></div>

        {!widgetMode ? (
          <canvas className="banner_canvas" id="canvas_banner" />
        ) : null}
      </body>
    </html>
  )
}
