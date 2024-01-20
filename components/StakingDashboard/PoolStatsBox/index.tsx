import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  RainbowQuestionMarkSvg,
  RewardsCircleIconSvg,
  ShareSvg,
  StakeMoreSvg,
  StakedCircleIconSvg,
  SupplyCircleIconSvg,
  TVLCircleIconSvg,
} from '@/components/Svg'

import CTAButton from '../CTAButton'
import DonutChart from './DonutChart'
import { useScaffoldContract, useScaffoldContractRead } from '@/staking/hooks/scaffold-eth'
import { formatUnits } from 'viem'
import { useNetwork } from 'wagmi'

const formatter = Intl.NumberFormat('en', { notation: 'compact' });
const USD_DECIMALS = 6;


const addresses: any = {
  1: {
    weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    usd: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  },
  31337: {
    weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    usd: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  },
  11155111: {
    weth: "0x7b79995e5f793a07bc00c21412e50ecae098e7f9",
    usd: "0x779877a7b0d9e8603169ddbd7836e478b4624789",
  },
}


const PoolStatsBox = () => {
  const { chain } = useNetwork();
  const { t } = useTranslation()
  // Pool stats
  const [pool, setPool] = useState<{
    earlyUnstakeFee: bigint
    fallenDripWizardDuration: bigint
    fallenWizardFunds: bigint
    lastUpdateTime: bigint
    locked: boolean
    minWithdrawCooldown: bigint
    periodFinish: bigint
    rewardPerTokenStored: bigint
    rewardRate: bigint
    rewardsDuration: bigint
    rewardsEnabled: boolean
    totalRewardFunds: bigint
    totalRewardsPaid: bigint
  }>();
  const [supply, setSupply] = useState(0n);
  const [weightedSupply, setWeightedSupply] = useState(0n);
  const [rewardForDuration, setRewardForDuration] = useState(0n);
  const [poolApy, setPoolApy] = useState(0n);
  const [rewardRemaining, setRewardRemaining] = useState(0n);
  const [rewardsPaid, setRewardsPaid] = useState(0n);

  const { data: stakerContract } = useScaffoldContract({ contractName: "Staker" })
  const { data: tokenContract } = useScaffoldContract({ contractName: "Houdini" })

  const fallenWizardApyPercent = parseFloat((Number(pool ? (pool?.fallenWizardFunds * 100n / pool?.totalRewardFunds) : 0n)).toFixed(2));

  const { data: poolData } = useScaffoldContractRead({
    contractName: "Staker",
    functionName: "pool",
  } as any);


  const { data: tokensLocked } = useScaffoldContractRead({
    contractName: "Houdini",
    functionName: "balanceOf",
    args: [stakerContract?.address]
  } as any);


  const addressPath = [tokenContract?.address, addresses[chain?.id ?? 1].weth, addresses[chain?.id ?? 1].usd];
  const { data: tvl } = useScaffoldContractRead({
    contractName: "UniswapRouter2",
    functionName: "getAmountsOut",
    args: [tokensLocked, addressPath]
  } as any);

  const { data: tokenSupply } = useScaffoldContractRead({
    contractName: "Houdini",
    functionName: "totalSupply",
  } as any);

  useEffect(() => {
    if (poolData) {
      const poolDataArr = poolData as any;
      setPool(poolDataArr[0]);
      setSupply(poolDataArr[1]);
      setWeightedSupply(poolDataArr[2]);
      setRewardForDuration(poolDataArr[3]);
      setPoolApy(poolDataArr[4]);
      setRewardRemaining(poolDataArr[5]);
      setRewardsPaid(poolDataArr[6]);
    }
  }, [poolData]);


  return (
    <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] w-[482px] h-[697px] p-[1px]">
      <div className="p-[30px] w-full h-full rounded-[28px] custom-balances-box-inner-shadow">
        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex flex-row justify-between w-full">
            <span className="text-[20px] font-medium">{t('poolStats')}</span>
            <CTAButton height="42px" width="98px">
              <div className="flex flex-row gap-[7px] w-full h-full justify-center items-center my-[11px] mx-[18px]">
                <ShareSvg className="w-[14px] h-[14px]" />
                <span className="text-[14px] font-semibold leading-normal">
                  {t('share')}
                </span>
              </div>
            </CTAButton>
          </div>
          <div className="flex flex-row gap-[20px] pt-[10px] pb-[20px]">
            <div className="flex flex-col gap-[30px]">
              <div className="flex flex-col gap-[14px]">
                <div className="flex flex-row gap-[5px] items-center">
                  <StakedCircleIconSvg className="w-[35px] h-[35px]" />
                  <span className="rainbow-text text-[18px] font-semibold">
                    {t('totalLockStaked')}
                  </span>
                </div>
                <div className="flex flex-row items-center pl-[40px] gap-[5px]">
                  <span>{formatter.format(Math.round(parseFloat(formatUnits(supply, 18))))}</span>
                  <span className="bg-[#0000004D] rounded-[8px] px-[8px] py-[5px] text-[10px] uppercase">
                    $LOCK
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[14px]">
                <div className="flex flex-row gap-[5px] items-center">
                  <TVLCircleIconSvg className="w-[35px] h-[35px]" />
                  <span className="rainbow-text text-[18px] font-semibold">
                    {t('totalTVL')}
                  </span>
                </div>
                <div className="flex flex-row items-center pl-[40px] gap-[5px]">
                  <span>${formatter.format(Math.round(parseFloat(formatUnits(tvl as unknown as bigint ?? 0n, USD_DECIMALS))))}</span>
                  <span className="bg-[#0000004D] rounded-[8px] px-[8px] py-[5px] text-[10px]">
                    $USD
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[30px]">
              <div className="flex flex-col gap-[14px]">
                <div className="flex flex-row gap-[5px] items-center">
                  <SupplyCircleIconSvg className="w-[35px] h-[35px]" />
                  <span className="rainbow-text text-[18px] font-semibold">
                    % of Supply
                  </span>
                  <button>
                    <RainbowQuestionMarkSvg className="w-[18px] h-[18px]" />
                  </button>
                </div>
                <div className="flex flex-row items-center pl-[40px] gap-[5px]">
                  <span>{tokenSupply ? (parseFloat(formatUnits(supply, 18)) * 100 / parseFloat(formatUnits(tokenSupply as unknown as bigint, 18))).toFixed(2) : 0}%</span>
                </div>
              </div>
              <div className="flex flex-col gap-[14px]">
                <div className="flex flex-row gap-[5px] items-center">
                  <RewardsCircleIconSvg className="w-[35px] h-[35px]" />
                  <span className="rainbow-text text-[18px] font-semibold">
                    {t('totalRewardsPaid')}
                  </span>
                </div>
                <div className="flex flex-row items-center pl-[40px] gap-[5px]">
                  <span>{formatter.format(Math.round(parseFloat(formatUnits(rewardsPaid, 18))))}</span>
                  <span className="bg-[#0000004D] rounded-[8px] px-[8px] py-[5px] text-[10px]">
                    $LOCK
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[17px]">
            <span className="text-[20px]">{t('lastWeeksAPYbreakdown')}</span>
            <div className="flex flex-row gap-[71px]">
              <DonutChart fallen={fallenWizardApyPercent} />
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-row gap-[20px] items-center">
                  <div className="w-[10px] h-[36px] bg-gradient-to-b from-[#BCAAFF] to-[#B364D1] rounded-t-[100px] rounded-b-[100px]"></div>
                  <div className="flex flex-col gap-[8px]">
                    <span className="text-[18px] font-semibold rainbow-text">
                      {t('buyBack')}
                    </span>
                    <span>{100-fallenWizardApyPercent}%</span>
                  </div>
                </div>
                <div className="flex flex-row gap-[20px] items-center">
                  <div className="w-[10px] h-[36px] bg-gradient-to-b from-[#FB792F] via-[#F3C755] to-[#F5C341] rounded-t-[100px] rounded-b-[100px]"></div>
                  <div className="flex flex-col gap-[8px]">
                    <span className="text-[18px] font-semibold rainbow-text">
                      {t('fallenWizards')}
                    </span>
                    <span>{fallenWizardApyPercent}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-[50px]">
            <CTAButton height="48px" width="150px">
              <div className="flex flex-row gap-[7px] w-full h-full justify-center items-center">
                <span className="text-[16px] font-semibold">
                  {t('buyLock')}
                </span>
              </div>
            </CTAButton>
            <CTAButton height="48px" width="150px">
              <div className="flex flex-row gap-[7px] w-full h-full justify-center items-center">
                <StakeMoreSvg className="w-[16px] h-[16px]" />
                <span className="text-[16px] font-semibold">
                  {t('stakeMore')}
                </span>
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PoolStatsBox
