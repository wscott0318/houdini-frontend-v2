'use client'

import upDown from '@/assets/up-down.png'
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
import { CONFIG_QUERY } from '@/lib/apollo/query'
import { useQuery } from '@apollo/client'
import { motion } from 'framer-motion'
import { CheckBox, TextField } from 'houdini-react-sdk'
import { HoudiniButton, IconGrid } from 'houdini-react-sdk'
import { set } from 'lodash'
import Image from 'next/image'
import React, { useState } from 'react'

export default function Home() {
  const { loading: warningStatusLoading, data: warningStatusData } = useQuery(
    CONFIG_QUERY,
    {
      variables: {
        key: 'warning_msg_status',
      },
    },
  )

  const [privateSwap, setPrivate] = useState(false)
  const [variableSwap, setVariable] = useState(false)
  const [direction, setDirection] = useState(false)

  const [isMulti, setIsMulti] = useState(false)

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
        <div className="rounded-[24px] bg-gray-900 w-full lg:w-[1000px] h-[600px] flex flex-col justify-between items-center py-[35px] px-[60px]">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-col justify-center items-start gap-[16px]">
              <div className="text-[34px] font-bold leading-[38px] text-white">
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
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row justify-start items-center gap-[13px]">
              <div>Private</div>
              <CheckBox
                checked={privateSwap}
                setChecked={setPrivate}
                name="privateSwap"
              />
              <div>Semi Private</div>
            </div>
            <div className="flex flex-row justify-start items-center gap-[13px]">
              <div>Variable</div>
              <CheckBox
                checked={variableSwap}
                setChecked={setVariable}
                name="variableSwap"
              />
              <div>Exact</div>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center gap-[14px] -space-x-7 w-full">
            <TextField id="send" label="Send:" placeholder="0.0" />
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
              } w-[45px] h-[45px] hover:cursor-pointer rotate-90 hover:-translate-y-1 transition-all duration-100 relative z-50`}
            />
            <TextField id="receive" label="Receive:" placeholder="0.0" />
          </div>
          <TextField
            id="receivingWallet"
            label="Receiving Wallet (BTC) Address:"
            placeholder="Receiving Wallet (BTC) Address"
          />
          <div className="gradient-text font-medium text-xs font-poppins">
            Only send To/From wallets. Transactions sent To/From smart contracts
            are not accepted
          </div>
          <HoudiniButton
            text={'Proceed'}
            onClick={() => {
              console.log('clicked!!')
            }}
          />
        </div>
        <div className="rainbow-text flex flex-col justify-center items-center text-center">
          <div>
            For your enhanced security, Houdini order details disappear after 48
            hours.
          </div>
          <div>If you ever need our support, we’re here for you 24/7</div>
        </div>
      </div>

      <div className="flex flex-col w-full lg:flex-row justify-center items-center gap-4">
        <div className="w-[260px] h-[140px] rounded-[24px] bg-gray-500 sm:flex hidden flex-col justify-center items-center">
          <div className="text-[23px] rainbow-text leading-[34px] text-center font-light">
            Total Transactions
          </div>
          <div className="text-[35px] text-white leading-[50px] font-medium text-center">
            123k
          </div>
        </div>
        <div className="w-full md:w-[350px] rounded-[24px] h-[190px] bg-gray-500 flex flex-col justify-center items-center">
          <div className="text-[25px] font-medium text-center leading-[38px]">
            Total Swap Volume
          </div>
          <div className="text-[35px] text-white leading-[50px] font-medium text-center">
            123
          </div>
        </div>
        <div className="w-[260px] rounded-[24px] h-[140px] bg-gray-500 sm:flex hidden flex-col justify-center items-center">
          <div className="text-[23px] rainbow-text leading-[34px] text-center font-light">
            $POOF Buybacks
          </div>
          <div className="text-[35px] text-white leading-[50px] font-medium text-center">
            5.7m
          </div>
        </div>
      </div>

      <IconGrid
        title="Partners"
        icons={[
          <BulletSvg
            className="w-[133px] h-[35px] gap-[60px]"
            key="bulletsvg"
          />,
          <FiraSvg key="firasvg" />,
          <ArcSvg key="arcsvg" />,
          <BoltbotSvg key="boltbotsvg" />,
          <XenifySvg key="xenifysvg" />,
          <SwiftSvg key="swiftsvg" />,
        ]}
      />

      <IconGrid
        title="Supported Protocols"
        icons={[
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
        ]}
        titleColor="text-[#8C9AE9]"
        gap="[10px] sm:gap-[25px]"
        iconWidth="[32px]"
        iconHeight="[32px]"
        containerWidth="w-full md:w-[600px]"
        containerHeight="sm:h-[400px] md:h-[350px]"
        paddingX="px-10 md:px-20"
      />
    </ResponsivePage>
  )
}
