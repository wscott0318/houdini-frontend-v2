import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Humanize from 'humanize-plus'
import { formatUnits } from 'viem'

import LockTokenIcon1 from '@/assets/LockTokenIcon1.png'
import LockTokenIcon2 from '@/assets/LockTokenIcon2.png'
import { StakeMoreSvg } from '@/components/Svg'

import CTAButton from '../CTAButton'
import HalfCircledDonutChart from './HalfCircledDonutChart'
import { useScaffoldContract, useScaffoldContractRead } from '@/staking/hooks/scaffold-eth'
import { ADDRESSES, USD_DECIMALS } from '@/utils/constants'
import { useNetwork } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

const BalanceBox = ({ user, earned, setStakeOpen, address }: any) => {
  const { t } = useTranslation()
  const { openConnectModal } = useConnectModal()

  const userTotalLocked = (user?.balance as bigint ?? 0n) + (earned as bigint ?? 0n);

  const { chain } = useNetwork()
  const { data: tokenContract } = useScaffoldContract({
    contractName: 'Houdini',
  })
  const addressPath = [
    tokenContract?.address,
    ADDRESSES[chain?.id ?? 1]?.weth,
    ADDRESSES[chain?.id ?? 1]?.usd,
  ]
  const { data: totalUsd } = useScaffoldContractRead({
    contractName: 'UniswapRouter2',
    functionName: 'getAmountsOut',
    args: [userTotalLocked ?? 0n, addressPath],
    enabled: userTotalLocked > 0n,
  } as any)

  const { data: balanceUsd } = useScaffoldContractRead({
    contractName: 'UniswapRouter2',
    functionName: 'getAmountsOut',
    args: [user?.balance ?? 0n, addressPath],
    enabled: userTotalLocked > 0n,
  } as any)

  const userBalanceNumber = parseFloat(
    formatUnits(
      (user?.balance as bigint) ?? 0n,
      18,
    ),
  );

  const userEarnedNumber = parseFloat(
    formatUnits(
      (earned as bigint) ?? 0n,
      18,
    ),
  );

  return (
    <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] w-full xl:w-[360px] xl:h-[706px] p-[1px]">
      <div className="w-full h-full p-[30px] rounded-[28px] custom-balances-box-inner-shadow">
        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex flex-col justify-start items-start ">
            <div className="flex flex-col gap-[26px]">
              {t('balanceboxTitle')}
              <div className="relative lg:w-[198px] lg:h-[109px] w-[100px] h-[50px]">
                <HalfCircledDonutChart deposited={userBalanceNumber} earned={userEarnedNumber} heightCustom={198} widthCustom={198} />
              </div>
            </div>
            <div className="flex flex-col pt-[20px]">
              <div className="flex flex-col">
                <div className="text-[18px] font-normal text-[#D9D9D9] leading-normal">
                  {t('totakLockBalance')}
                </div>
                <div className="text-[20px] lg:text-[50px] font-normal leading-normal">
                  {Humanize.formatNumber(parseFloat(formatUnits(userTotalLocked ?? 0n, 18)))}
                </div>
                <div className="text-[14px] font-normal text-[#A5A5A5] leading-normal">
                  ({Humanize.formatNumber(parseFloat(formatUnits((totalUsd as any)?.[2] as unknown as bigint ?? 0n, USD_DECIMALS)), 2)} USD)
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[20px] pt-[53px]">
              <div className="flex flex-row gap-[20px] items-center">
                <Image
                  src={LockTokenIcon1}
                  className="w-[42px] h-[42px]"
                  alt="LockTokenIcon1"
                />
                <div className="flex flex-col gap-[6px]">
                  <span
                    className={
                      'bg-gradient-to-b from-purple-400 to-blue-900 bg-clip-text text-transparent text-[18px] font-medium'
                    }
                  >
                    {t('deposited')}
                  </span>
                  <span className="text-[20px] font-medium leading-[19px]">
                    {Humanize.formatNumber(userBalanceNumber)} $LOCK
                  </span>
                  <span className="text-[#A5A5A5]">{Humanize.formatNumber(parseFloat(formatUnits((balanceUsd as any)?.[2] as unknown as bigint ?? 0n, USD_DECIMALS)), 2)} USD</span>
                </div>
              </div>
              <div className="flex flex-row gap-[20px] items-center">
                <Image
                  src={LockTokenIcon2}
                  className="w-[42px] h-[42px]"
                  alt="LockTokenIcon2"
                />
                <div className="flex flex-col gap-[6px]">
                  <span
                    className={
                      'bg-gradient-to-t from-green-300 to-green-700 bg-clip-text text-transparent text-[18px] font-medium'
                    }
                  >
                    {t('earned')}
                  </span>
                  <span className="text-[20px] font-medium leading-[19px]">
                    {Humanize.formatNumber(userEarnedNumber)} $LOCK
                  </span>
                  <span
                    className={
                      'bg-gradient-to-t from-green-300 to-green-700 bg-clip-text text-transparent text-[14px] font-medium'
                    }
                  >
                    + {Humanize.formatNumber(parseFloat(formatUnits(((totalUsd as any)?.[2] as unknown as bigint ?? 0n) - ((balanceUsd as any)?.[2] as unknown as bigint ?? 0n), USD_DECIMALS)), 2)} USD
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col  mt-[30px] gap-[20px] lg:gap-0 lg:flex-row justify-between z-[999] relative">
            <CTAButton height="48px" width="123px">
              <div className="flex flex-row gap-[7px] justify-center items-center mx-[20px] my-[14px]">
                <span className="text-[16px] font-semibold">
                  {t('buyLock')}
                </span>
              </div>
            </CTAButton>
            <CTAButton onClick={() => { address ? setStakeOpen(true) : openConnectModal?.() }} height="48px" width="146px">
              <div className="flex flex-row gap-[7px] justify-center items-center mx-[20px] my-[14px]">
                <StakeMoreSvg className="w-[16px] h-[16px]" />
                <span className="text-[16px] font-semibold">
                  {address ?
                    user?.balance > 0n ? t('stakeMore') : t('Stake') :
                    t('Stake')
                  }
                </span>
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BalanceBox
