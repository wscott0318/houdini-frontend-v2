'use client'

import { CardComponent } from 'houdini-react-sdk'
import React, { useEffect, useState } from 'react'

import { SwapBox } from '@/components'
import { ResponsivePage } from '@/components/ResponsivePage'
import {
  ArcSvg,
  BoltbotSvg,
  BulletSvg,
  FiraSvg,
  Protocol1Svg,
  Protocol2Svg,
  Protocol3Svg,
  Protocol4Svg,
  Protocol5Svg,
  Protocol6Svg,
  Protocol7Svg,
  Protocol8Svg,
  Protocol9Svg,
  Protocol10Svg,
  Protocol11Svg,
  Protocol12Svg,
  Protocol13Svg,
  Protocol14Svg,
  Protocol15Svg,
  Protocol16Svg,
  Protocol17Svg,
  Protocol18Svg,
  Protocol19Svg,
  Protocol20Svg,
  Protocol21Svg,
  Protocol22Svg,
  Protocol23Svg,
  Protocol24Svg,
  Protocol25Svg,
  Protocol26Svg,
  Protocol27Svg,
  Protocol28Svg,
  Protocol29Svg,
  SwiftSvg,
  XenifySvg,
} from '@/components/Svg'
import { SwapVolume } from '@/components/SwapVolume'
import { swapFormi18n, swapi18n } from '@/utils/constants'
import { useWindowSize } from '@/utils/hooks/useWindowSize'

const partnersIcons = [
  <BulletSvg className="w-[133px] h-[35px] gap-[60px]" key="bulletsvg" />,
  <FiraSvg key="firasvg" />,
  <ArcSvg key="arcsvg" />,
  <BoltbotSvg key="boltbotsvg" />,
  <XenifySvg key="xenifysvg" />,
  <SwiftSvg key="swiftsvg" />,
]

const suportedProtocolIcons = [
  <Protocol1Svg className="w-[32px] h-[32px]" key="protocol1" />,
  <Protocol2Svg key="protocol2" />,
  <Protocol3Svg key="protocol3" />,
  <Protocol4Svg key="protocol4" />,
  <Protocol5Svg key="protocol5" />,
  <Protocol6Svg key="protocol6" />,
  <Protocol7Svg key="protocol7" />,
  <Protocol8Svg key="protocol8" />,
  <Protocol9Svg key="protocol9" />,
  <Protocol10Svg key="protocol10" />,
  <Protocol11Svg key="protocol11" />,
  <Protocol12Svg key="protocol12" />,
  <Protocol13Svg key="protocol13" />,
  <Protocol14Svg key="protocol14" />,
  <Protocol15Svg key="protocol15" />,
  <Protocol16Svg key="protocol16" />,
  <Protocol17Svg key="protocol17" />,
  <Protocol18Svg key="protocol18" />,
  <Protocol19Svg key="protocol19" />,
  <Protocol20Svg key="protocol20" />,
  <Protocol21Svg key="protocol21" />,
  <Protocol22Svg key="protocol22" />,
  <Protocol23Svg key="protocol23" />,
  <Protocol24Svg key="protocol24" />,
  <Protocol25Svg key="protocol25" />,
  <Protocol26Svg key="protocol26" />,
  <Protocol27Svg key="protocol27" />,
  <Protocol28Svg key="protocol28" />,
  <Protocol29Svg key="protocol29" />,
]
export default function Home() {
  const [width] = useWindowSize()

  const [value, setValue] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setValue(Math.floor(Math.random() * 1000))
    }, 2000)
    return () => clearInterval(timer)
  }, [value])

  return (
    <ResponsivePage>
      <div>
        <div className="lg:text-[81px] text-center text-[35px] font-bold leading-normal capitalize tracking-[-0px]">
          Keep transactions private
        </div>
        <div className="flex flex-col font-normal text-[19px] leading-[30px] items-center justify-center text-[#B8CAFC] text-center">
          <div>Privately swap, send or bridge with magical ease</div>
          <div>
            With no traceable connection between the sending and receiving
            wallets
          </div>
          <div>It&rsquo;s safe, compliant and always lowest cost</div>
        </div>
      </div>

      <SwapBox i18n={{ ...swapFormi18n, ...swapi18n }} />

      <div className="rainbow-text flex flex-col justify-center items-center text-center">
        <div>
          For your enhanced security, Houdini order details disappear after 48
          hours.
        </div>
        <div>If you ever need our support, we’re here for you 24/7</div>
      </div>

      <div className="flex flex-col w-full lg:flex-row justify-center items-center gap-4">
        <div className="w-[260px] h-[140px] rounded-[24px] sm:flex hidden flex-col justify-center items-center">
          <CardComponent>
            <div className="text-[23px] rainbow-text leading-[34px] text-center font-light">
              Total Transactions
            </div>

            <div className="text-[35px] text-white leading-[50px] font-medium text-center">
              123k
            </div>
          </CardComponent>
        </div>
        <SwapVolume value={value} />
        <div className="w-[260px] rounded-[24px] h-[140px] sm:flex hidden flex-col justify-center items-center">
          <CardComponent>
            <div className="text-[23px] rainbow-text leading-[34px] text-center font-light">
              $LOCK Buybacks
            </div>
            <div className="text-[35px] text-white leading-[50px] font-medium text-center">
              5.7m
            </div>
          </CardComponent>
        </div>
      </div>

      <div className="flex flex-col rounded-[24px] items-center justify-center gap-5  md:w-[650px] lg:w-[850px] max-w-[850px] md:h-[320px] lg:h-[230px] py-8 px-20">
        <CardComponent
          widthClass={width >= 768 ? 'w-[600px]' : 'w-full'}
          heightClass={width >= 768 ? 'h-[300px]' : 'h-full'}
        >
          <div
            className={`text-[20px] gradient-text pb-[18px] leading-[24px] text-center font-medium`}
          >
            Partners
          </div>
          <div
            className={`flex flex-row items-start justify-center gap-[60px] flex-wrap`}
          >
            {partnersIcons.map((icon: any, index) =>
              React.cloneElement(icon, {
                key: index,
                className: 'w-[133px] h-[35px]',
              }),
            )}
          </div>
        </CardComponent>
      </div>

      <div className="max-w-[600px]">
        <CardComponent
          widthClass={width >= 768 ? 'w-[600px]' : 'w-full'}
          heightClass={width >= 768 ? 'h-[400px]' : 'h-full'}
        >
          <div
            className={`text-[20px] text-[#8c9ae9] leading-[24px] pb-[18px] text-center font-medium`}
          >
            Supported Protocols
          </div>
          <div
            className={`flex flex-row items-start justify-center gap-[35px] flex-wrap`}
          >
            {suportedProtocolIcons.map((icon: any, index) =>
              React.cloneElement(icon, {
                key: index,
                className: 'w-[32px] h-[32px]',
              }),
            )}
          </div>
        </CardComponent>
      </div>
    </ResponsivePage>
  )
}
