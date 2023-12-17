'use client'

import { ApolloProvider } from '@apollo/client'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import 'houdini-react-sdk/styles.css'
import { Outfit, Poppins } from 'next/font/google'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { bsc, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

import { Footer, Header, ResponsiveContainer } from '@/components'
import { userClient } from '@/lib/apollo/apollo-client'
import { useWindowSize } from '@/utils/hooks/useWindowSize'
import { smokeEffect } from '@/utils/smokeEffect'

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

export default function RootLayout({ children }: LayoutProps) {
  // const [smoke, setSmoke] = useState(false)

  useEffect(() => {
    smokeEffect(true)
  }, [])

  const [width] = useWindowSize()

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

        <div className="container mx-auto z-1">
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
                    className="mt-20"
                  />
                  <Footer />
                </ResponsiveContainer>
              </RainbowKitProvider>
            </WagmiConfig>
          </ApolloProvider>
        </div>
        <div id="portal"></div>
        <canvas className="banner_canvas" id="canvas_banner"></canvas>
      </body>
    </html>
  )
}
