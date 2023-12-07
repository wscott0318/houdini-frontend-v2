'use client'

import { useQuery } from '@apollo/client'
import { motion } from 'framer-motion'
import {
  CardComponent,
  CheckBox,
  Dropdown,
  HoudiniButton,
  TextField,
} from 'houdini-react-sdk'
import Image from 'next/image'
import React, { useState } from 'react'

import upDown from '@/assets/up-down.png'
import { GeneralModal } from '@/components/GeneralModal'
import { IndustrialCounterLockup } from '@/components/GeneralModal/IndustrialCounterLockup'
import { ResponsivePage } from '@/components/ResponsivePage'
import {
  ArcSvg,
  BoltbotSvg,
  BulletSvg,
  FiraSvg,
  InfoSvg,
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
import { CONFIG_QUERY } from '@/lib/apollo/query'
import { useWindowSize } from '@/utils/hooks/useWindowSize'

const tokensInit = [
  {
    icon: Protocol8Svg,
    title: 'BITCOIN',
    subtitle: 'BTC on Bitcoin',
  },
  {
    icon: Protocol7Svg,
    title: 'ETHEREUM',
    subtitle: 'Ethereum on ETH Mainnet (ERC-20)',
  },
  {
    icon: Protocol8Svg,
    title: 'BITCOIN',
    subtitle: 'BTC on Bitcoin',
  },
  {
    icon: Protocol8Svg,
    title: 'BITCOIN',
    subtitle: 'BTC on Bitcoin',
  },
  {
    icon: Protocol8Svg,
    title: 'BITCOIN',
    subtitle: 'BTC on Bitcoin',
  },
  {
    icon: Protocol8Svg,
    title: 'BITCOIN',
    subtitle: 'BTC on Bitcoin',
  },
  {
    icon: Protocol8Svg,
    title: 'BITCOIN',
    subtitle: 'BTC on Bitcoin',
  },
]

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
  const { loading: warningStatusLoading, data: warningStatusData } = useQuery(
    CONFIG_QUERY,
    {
      variables: {
        key: 'warning_msg_status',
      },
    },
  )

  const [width] = useWindowSize()
  const [privateSwap, setPrivate] = useState(false)
  const [variableSwap, setVariable] = useState(false)
  const [direction, setDirection] = useState(false)
  const [isMulti, setIsMulti] = useState(false)

  const handlePrivateSwap = () => {
    setPrivate(!privateSwap)
  }

  const handleVariableSwap = () => {
    setVariable(!variableSwap)
  }

  return (
    <ResponsivePage>
      <div>
        <div className="lg:text-[81px] text-center text-[35px] font-bold leading-normal capitalize tracking-[-0.85px]">
          Keep your transactions private
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

      <div className="flex flex-col justify-center items-center gap-2">
        <GeneralModal>
          <IndustrialCounterLockup>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center w-full gap-[16px]">
              <div className="flex flex-col justify-center items-center sm:items-start gap-[16px]">
                <div className="text-[28px] whitespace-nowrap sm:text-[34px] font-bold leading-[38px] text-white">
                  Swap-Send-Bridge
                </div>
                <div className="text-[15px] font-medium font-poppins rainbow-text">
                  Private, Compliant, No Sign Up
                </div>
              </div>
              <div
                className="w-[200px] h-[40px] border-[2px] border-white flex items-center justify-center flex-row rounded-[24px] relative cursor-pointer"
                onClick={() => {
                  setIsMulti(!isMulti)
                }}
              >
                <motion.div
                  className="left-1 bg-white text-sm h-[30px] w-1/2 text-black flex items-center justify-center rounded-[14px] absolute"
                  animate={{ x: isMulti ? '90px' : '0px' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                >
                  {isMulti ? 'Multi send' : 'Single'}
                </motion.div>
                <div
                  className={`${
                    !isMulti ? 'opacity-0' : 'opacity-100'
                  } w-1/2 h-full flex text-sm justify-center items-center transition-all duration-100`}
                >
                  Single
                </div>
                <div
                  className={`${
                    isMulti ? 'opacity-0' : 'opacity-100'
                  } w-1/2 h-full flex text-sm justify-center items-center`}
                >
                  Multi send
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:px-[30px] lg:py-[10px] lg:gap-[20px] gap-[10px] w-full">
              <div className="flex flex-col my-[20px] sm:my-0 sm:flex-row gap-4 justify-between items-start sm:items-center w-full">
                <div className="flex flex-row justify-start items-center gap-[13px]">
                  <div className="mr-[8px] sm:mr-0">Private</div>
                  <CheckBox onChange={handlePrivateSwap} name="privateSwap" />
                  <div>Semi Private</div>
                  <InfoSvg className="w-[20px] h-[20px] hover:cursor-pointer" />
                </div>
                <div className="flex flex-row justify-start items-center gap-[13px]">
                  <div>Variable</div>
                  <CheckBox onChange={handleVariableSwap} name="variableSwap" />
                  <div>Exact</div>
                  <InfoSvg className="w-[20px] h-[20px] hover:cursor-pointer" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-start -space-y-6 sm:space-y-0 items-center gap-[14px] sm:-space-x-7 w-full">
                <TextField id="send" label="Send:" placeholder="0.0">
                  <Dropdown
                    title="Sending Currency"
                    subtitle="Popular Protocols"
                    target="#portal"
                    tokens={tokensInit}
                  />
                </TextField>
                <Image
                  src={upDown}
                  width={100}
                  height={100}
                  alt="upDown"
                  onClick={() => {
                    setDirection(!direction)
                  }}
                  className={`${
                    direction ? 'scale-y-[-1]' : ''
                  } w-[45px] h-[45px] hover:cursor-pointer rotate-180 sm:rotate-90 hover:-translate-y-1 transition-all duration-100 relative z-0`}
                />
                <TextField id="receive" label="Receive:" placeholder="0.0">
                  <Dropdown
                    title="Receiving Currency"
                    subtitle="Popular Protocols"
                    target="#portal"
                    tokens={tokensInit}
                  />
                </TextField>
              </div>

              <div className="w-full my-[20px] sm:my-0">
                <TextField
                  id="receivingWallet"
                  label="Receiving Wallet (BTC) Address:"
                  placeholder="Receiving Wallet (BTC) Address"
                />
              </div>
            </div>
            <div className="gradient-text my-[20px] font-medium text-xs font-poppins">
              Only send To/From wallets. Transactions sent To/From smart
              contracts are not accepted
            </div>
            <HoudiniButton
              text={'Proceed'}
              onClick={() => {
                console.log('clicked!!')
              }}
            />
          </IndustrialCounterLockup>
        </GeneralModal>
      </div>
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
        <div className="w-full md:w-[350px] rounded-[24px] h-[190px] bg-gray-500 flex flex-col justify-center items-center">
          <div className="text-[25px] font-medium text-center leading-[38px]">
            Total Swap Volume
          </div>
          <div className="text-[35px] text-white leading-[50px] font-medium text-center">
            123
          </div>
        </div>
        <div className="w-[260px] rounded-[24px] h-[140px] sm:flex hidden flex-col justify-center items-center">
          <CardComponent>
            <div className="text-[23px] rainbow-text leading-[34px] text-center font-light">
              $POOF Buybacks
            </div>
            <div className="text-[35px] text-white leading-[50px] font-medium text-center">
              5.7m
            </div>
          </CardComponent>
        </div>
      </div>

      <div className="flex flex-col rounded-[24px] items-center justify-center gap-5  md:w-[650px] lg:w-[850px] max-w-[850px] md:h-[320px] lg:h-[230px] py-8 px-20">
        <CardComponent widthClass="600px" heightClass="400px">
          <div
            className={`text-[20px] text-white leading-[24px] text-center font-medium`}
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

      <CardComponent
        widthClass={width >= 768 ? '600px' : '100%'}
        heightClass={width >= 768 ? '400px' : '100%'}
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
    </ResponsivePage>
  )
}
