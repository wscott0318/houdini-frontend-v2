import Avax from '@/assets/AVAX-AVAXC.png'
import Copy from '@/assets/Copy.png'
import Eth from '@/assets/ETH-ETH.png'
import Help from '@/assets/help.png'
import Image from 'next/image'

import {
  CopyBtnDemo,
  IndustrialCounterLockup,
  ModalStep,
  OrderDetailRoundbox,
  Steps,
  WalletRoundbox,
} from '../ModalStep'
import { NeedHelp } from '../NeedHelp'
import DigitalLockup from './DigitalLockup'
import RadialProgress from './DigitalLockup'

export const WorkingMagic = () => {
  return (
    <>
      <div
        id="workingmagic"
        className="flex flex-col justify-center items-center gap-[30px] lg:gap-[10px]"
      >
        <div className="lg:text-[81px] text-center font-bold leading-[102.06px] capitalize tracking-[-0.85px]">
          Working Our Magic
        </div>
        <div className="flex flex-col font-normal lg:text-[19px] leading-[30px] items-center justify-center text-[#B8CAFC] text-center">
          Your transaction is being processed
        </div>
      </div>

      <div className="flex flex-col pb-[165px]">
        <div className="flex flex-col items-center gap-[10px]">
          <ModalStep3></ModalStep3>
          <div className="flex px-[100px] py-[50px] items-center">
            <div className="flex px-[100px] py-[20px] items-center">
              <NeedHelp />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const RoundBox = ({ children }: LayoutProps) => {
  return (
    <>
      {/* <div className="p-[4.5px] custom-step-gradient1 rounded-[20px]"> */}
      <div className="p-[4.5px] rounded-[20px]">
        {/* <div className="relative flex flex-col justify-center items-center custom-step-gradient custom-step-shadow rounded-[20px]"> */}
        <div className="relative flex flex-col justify-center items-center rounded-[20px]">
          {children}
          {/* <div className="absolute w-full h-full top-[0px] left-[0px] "></div> */}
          <div
            className="absolute w-full h-full top-[0px] left-[0px] rounded-[20px] bg-gradient-to-br from-black from-20% to-transparent"
            style={{ zIndex: -1 }}
          ></div>
        </div>
      </div>
    </>
  )
}

const ModalStep3 = () => {
  return (
    <>
      <ModalStep>
        <div className="flex flex-row justify-between items-center w-[984px] h-[54px] px-[10px] py-[5px]">
          <OrderDetailRoundbox>
            <div className="text-center text-[15.25px] font-bold text-[#FFFFFF] text-opacity-60">
              Order ID:
            </div>
            <CopyBtnDemo
              concept="pR7h3raq71otwFuCqvSpqf"
              fontSize="font-[15.25px]"
              fontWeight="font-normal"
              lineHeight="leading-[24px]"
              textColor="[#FFFFFF]"
              textOpacity="text-opacity-50"
            />
          </OrderDetailRoundbox>

          <OrderDetailRoundbox>
            <div className="text-center text-[14.88px] text-[#FFFFFF] leading-[24px] text-opacity-60 font-bold">
              Creation Time:
            </div>
            <div className="text-center text-[15.25px] text-[#FFFFFF] leading-[24px] text-opacity-50 font-normal">
              21/09/2023, 19:14:37
            </div>
          </OrderDetailRoundbox>
        </div>

        {/* <div className="p-[2.49px] custom-industrial-counter-lockup-gradient1 rounded-[20px] w-full"> */}
        <IndustrialCounterLockup>
          <div className="flex flex-col items-center justify-center gap-[20px] px-[20px]">
            <div className="items-center w-full">
              <RoundBox>
                <div className="relative flex flex-row gap-[32px] px-[50px] py-[30px]">
                  <DigitalLockup
                    value="0"
                    text="ORDER RECEIVED"
                  ></DigitalLockup>
                  <DigitalLockup
                    value="0"
                    text="ORDER RECEIVED"
                  ></DigitalLockup>
                  <DigitalLockup
                    value="0"
                    text="ORDER RECEIVED"
                  ></DigitalLockup>
                  <DigitalLockup
                    value="0"
                    text="ORDER RECEIVED"
                  ></DigitalLockup>
                  <DigitalLockup
                    value="0"
                    text="ORDER RECEIVED"
                  ></DigitalLockup>
                </div>
              </RoundBox>
            </div>
            <RoundBox>
              <div className="flex flex-row gap-[32px] px-[60px] py-[10px] w-full h-full">
                <div className="text-center text-[19px] leading-[23.94px] font-medium rainbow-text whitespace-nowrap">
                  Todays Average Swap Time :
                </div>
                <div className="text-center text-[19px] leading-[23.94px] font-bold whitespace-nowrap">
                  30 minutes
                </div>
              </div>
            </RoundBox>
          </div>
        </IndustrialCounterLockup>

        <div className="pt-[15px] px-[10px] pb-[5px] w-full">
          <div className="p-[2.5px] w-full rounded-[20px] custom-houdini-id-gradient1">
            <div className="flex flex-row justify-center items-center rounded-[20px] w-full custom-houdini-id-gradient custom-houdini-id-shadow px-[15px] py-[10px]">
              <div className="text-center w-full text-[15.25px] font-bold text-opacity-60">
                Recipient Wallet:
              </div>
              <div className="text-center w-full text-[15.25px] font-normal text-opacity-50">
                0xferv3552mnjud953234sddn2323434bdffswfd8
              </div>
              <div className=" text-center w-full text-[15.25px] font-normal text-opacity-50">
                will receive
              </div>
              <div className="flex flex-row justify-center w-full items-center gap-2.5">
                <div className="text-center text-[15.25px] font-normal">
                  175.7936
                </div>
                <Image src={Avax} width={20} height={20} alt="AVAX" />
                <div className="text-base text-center text-[15.25px] font-normal">
                  AVAX
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalStep>
    </>
  )
}
