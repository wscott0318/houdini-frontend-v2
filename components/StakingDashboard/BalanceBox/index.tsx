import React from 'react'
import DonutChart from './DonutChart';
import Image from 'next/image';
import LockTokenIcon1 from '@/assets/LockTokenIcon1.png'
import LockTokenIcon2 from '@/assets/LockTokenIcon2.png'
import { useTranslation } from 'react-i18next'

const donutData = [
  {name: "deposited", value: 50},
  {name: "earned", value: 10},
 ]

const BalanceBox = () => {
  const { t } = useTranslation()
  return (
      <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] w-[360px] h-[706px] p-[30px]">
        <div className="flex flex-col justify-between w-full h-full">
          <div className='flex flex-col justify-start items-start '>
            <div className='flex flex-col gap-[26px]'>
            {t('balanceboxTitle')}
            </div>
            <div className='flex flex-col gap-[20px]'>
              <DonutChart data={donutData}  />
              <div className='flex flex-col'>
                <div className='text-[18px] font-normal text-[#D9D9D9] leading-normal'>Total $LOCK Balance</div>
                <div className='text-[50px] font-normal leading-normal'>45,492.07</div>
                <div className='text-[14px] font-normal text-[#A5A5A5] leading-normal'>(3,700.96 USD)</div>
              </div>
            </div>
            <div className="flex flex-col gap-[20px] pt-[53px]">
              <div className="flex flex-row gap-[20px] items-center">
                <Image src={LockTokenIcon1} className="w-[42px] h-[42px]" alt="LockTokenIcon1"/>
                <div className="flex flex-col gap-[6px]">
                  <span className={'bg-gradient-to-b from-purple-400 to-blue-900 bg-clip-text text-transparent text-[18px] font-medium'}>Deposited</span>
                  <span className="text-[20px] font-medium leading-[19px]">42,000.00 $LOCK</span>
                  <span className="text-[#A5A5A5]">3,000.00 USD</span>
                </div>
              </div>
              <div className="flex flex-row gap-[20px] items-center">
                <Image src={LockTokenIcon2} className='w-[42px] h-[42px]' alt="LockTokenIcon2"/>
                <div className="flex flex-col gap-[6px]">
                  <span className={'bg-gradient-to-t from-green-300 to-green-700 bg-clip-text text-transparent text-[18px] font-medium'}>Earned</span>
                  <span className="text-[20px] font-medium leading-[19px]">3,492.07 $LOCK</span>
                  <span className={'bg-gradient-to-t from-green-300 to-green-700 bg-clip-text text-transparent text-[14px] font-medium'}>+ 700.96 USD</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
          </div>
        </div>
      </div>
  );
}

export default BalanceBox;