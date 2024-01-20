import React, { useEffect, useState } from 'react'

import { DownloadSvg, LoadingSvg } from '@/components/Svg'

import ButtonGroup from '../ButtonGroup'
import CheckBox from './CheckBox'
import ListLine, { IGroupedData } from './ListLine'
import Timeframe from './Timeframe'
import { useScaffoldEventHistory } from '@/staking/hooks/scaffold-eth'
import { useAccount, usePublicClient } from 'wagmi'
import { formatUnits } from 'viem'
import { t } from 'i18next'


const eventTypes = {
  Staked: t("Staked"),
  Withdrawn: t("Withdrawn"),
  RewardPaid: t("RewardPaid"),
  RequestUnlock: t("RequestUnlock"),
  FallenWizardFee: t("FallenWizardFee"),
  MultiplierChanged: t("MultiplierChanged"),
}
const buttonNames = [t("all"), ...Object.values(eventTypes)];

const HistoryModalBox = () => {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const [fromBlock, setFromBlock] = useState<bigint>(0n);
  const [events, setEvents] = useState<IGroupedData[]>([]);

  useEffect(() => {
    publicClient.getBlockNumber().then((data: bigint) => setFromBlock(data - 800n));
  }, [address, publicClient])

  const {
    data: stakedEvents,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "Staker",
    eventName: "Staked",
    fromBlock,
    watch: true,
    // filters: { premium: true },
    blockData: true,
    transactionData: true,
    receiptData: true,
  });

  const {
    data: withdrawnEvents,
    isLoading: isLoadingWithdrawnEvents,
    error: errorWithdrawnEvents,
  } = useScaffoldEventHistory({
    contractName: "Staker",
    eventName: "Withdrawn",
    fromBlock,
    watch: true,
    filters: { user: address },
    blockData: true,
    transactionData: false,
    receiptData: false,
  });

  const {
    data: rewardPaidEvents,
    isLoading: isLoadingRewardPaid,
    error: errorRewardPaid,
  } = useScaffoldEventHistory({
    contractName: "Staker",
    eventName: "RewardPaid",
    fromBlock,
    watch: true,
    filters: { user: address },
    blockData: true,
    transactionData: false,
    receiptData: false,
  });

  const {
    data: requestUnlockEvents,
    isLoading: isLoadingRequestUnlock,
    error: errorrRequestUnlock,
  } = useScaffoldEventHistory({
    contractName: "Staker",
    eventName: "RequestUnlock",
    fromBlock,
    watch: true,
    filters: { user: address },
    blockData: true,
    transactionData: false,
    receiptData: false,
  });

  const {
    data: fallenWizardFeeEvents,
    isLoading: isLoadingFallenWizardFee,
    error: errorFallenWizardFee,
  } = useScaffoldEventHistory({
    contractName: "Staker",
    eventName: "FallenWizardFee",
    fromBlock,
    watch: true,
    filters: { user: address },
    blockData: true,
    transactionData: false,
    receiptData: false,
  });

  const {
    data: multiplierChangedEvents,
    isLoading: isLoadingMultiplierChanged,
    error: errorMultiplierChanged,
  } = useScaffoldEventHistory({
    contractName: "Staker",
    eventName: "MultiplierChanged",
    fromBlock,
    watch: true,
    filters: { user: address },
    blockData: true,
    transactionData: false,
    receiptData: false,
  });

  useEffect(() => {
    let allEvents: any[] = [];
    stakedEvents?.map((event: any) => {
      allEvents.push(event);
    });
    withdrawnEvents?.map((event: any) => {
      allEvents.push(event);
    });
  
    rewardPaidEvents?.map((event: any) => {
      allEvents.push(event);
    });
  
    requestUnlockEvents?.map((event: any) => {
      allEvents.push(event);
    });
  
    fallenWizardFeeEvents?.map((event: any) => {
      allEvents.push(event);
    });
  
    multiplierChangedEvents?.map((event: any) => {
      allEvents.push(event);
    });
  
    allEvents = allEvents.sort((a: any, b: any) => {
      if (a?.block?.timestamp < b?.block?.timestamp) {
        return -1; // a should be sorted before b
      } else if (a?.block?.timestamp > b?.block?.timestamp) {
        return 1; // a should be sorted after b
      } else {
        return 0; // a and b are equal
      }
    });
    allEvents.map(v => {
      setEvents([...events
        , {
        type: v?.log?.eventName,
        date: new Date(Number(v?.block?.timestamp) * 1000).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        }),
        amount: Math.round(parseFloat(formatUnits(v?.args?.amount ?? 0n, 18))).toString(),
        addressUp: v.transaction?.from,
        addressDown: v.block?.hash,
      }
    ]);
    })
  },[fallenWizardFeeEvents, multiplierChangedEvents, requestUnlockEvents, rewardPaidEvents, stakedEvents, withdrawnEvents] )

  const [headValue, setHeadValue] = useState(0)

  // if (!address) {
  //   return <div className='p-4 mb-4 w-[100%] text-sm text-white rounded-lg bg-orange-900 dark:bg-gray-800 dark:text-red-400'>Please connect your wallet first</div>;
  // }
  return (
    <div className="flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] w-[1071px] p-[1px] z-[1]">
      <div className="w-full h-full p-[30px] rounded-[28px] custom-balances-box-inner-shadow relative">
        <div className="flex flex-row gap-[10px] absolute right-[30px] top-[30px] justify-center items-center">
          {/* <button className="h-[56px] rounded-[16px] justify-center items-center flex bg-gradient-to-b from-[#6C5DD3] to-[#4154C9] px-[20px] py-[12px]">
            <DownloadSvg className="w-[20px] h-[20px]" />
          </button> */}
          {/* <Timeframe /> */}
        </div>

        <div className="flex flex-col gap-[20px]">
          <span className="rainbow-text text-[18px] font-medium">History</span>
          {/* <ButtonGroup names={buttonNames} /> */}
          <div className="flex flex-col min-h-[400px]">
            <div className="flex flex-row px-[21px] py-[20px] gap-[178px] relative items-center">
              {/* <div className="absolute top-[26px] left-[27px]">
                <CheckBox />
              </div> */}
              <span className="text-[18px] leading-normal font-medium">
                Type
              </span>
              <span className="text-[18px] leading-normal font-medium">
                Date
              </span>
              <span className="text-[18px] leading-normal font-medium">
                Amount
              </span>
              <span className="text-[18px] leading-normal font-medium">
                Address
              </span>
            </div>
            <div className="flex flex-col">
              {events && events.map((item, index) => (
                <div key={index}>
                  <ListLine data={item} index={index % 2} />
                </div>
              ))}
            </div>
          </div>
          <span className="text-[12px] font-semibold leading-[14px] text-center text-[#A0AEC0]">
            Please note: Transaction times are displayed in UTC
          </span>
          <div className="w-full flex items-center justify-center">
            {isLoadingEvents || isLoadingWithdrawnEvents || isLoadingFallenWizardFee || isLoadingRequestUnlock || isLoadingMultiplierChanged ? 
            <a className="w-[96px] h-[48px] rounded-[15px] bg-gradient-to-b from-[#6C5DD3] to-[#4154C9] items-center justify-center flex">
              <LoadingSvg className="w-[16px] h-[16px]" />
            </a> : <></>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryModalBox
