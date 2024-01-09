import React from 'react'
import { useTranslation } from 'react-i18next'
import QTYButton from '../QTYButton';
import { StakeMoreSvg } from '@/components/Svg';

const WithdrawalExplainerBox = () => {
  const { t } = useTranslation()
  return (
      <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] h-[394px] p-[1px]">
        <div className='w-[612px] h-[602px] p-[30px] rounded-[28px] custom-balances-box-inner-shadow flex flex-col gap-[10px]'>
          <div className='flex flex-col gap-[10px] pb-[20px]'>
            <div className='flex flex-col gap-[5px] text-center'>
              <span className='text-[25px] font-medium leading-normal'>Fallen Wizard Penalty</span>
              <div className='text-[14px] font-normal'>
              </div>
            </div>
          </div>
          <div className='flex flex-row w-full justify-between gap-[10px]'>
            <button
              className={'p-[16px] flex w-full justify-center items-center rounded-[120px] custom-day-widthrawal-button-gradient'}
              onClick={() => {}}
            >
              <div className='flex flex-row gap-[7px] justify-center items-center'>
                <StakeMoreSvg className="w-[16px] h-[16px]"/>
                <span className="text-[16px] font-semibold">90 Day Withdrawal</span>
              </div>
            </button>
            <button
              className={'p-[16px] flex w-full justify-center items-center rounded-[120px] custom-instant-withdrawal-button-gradient'}
              onClick={() => {}}
            >
              <div className='flex flex-row gap-[7px] justify-center items-center'>
                <StakeMoreSvg className="w-[16px] h-[16px]"/>
                <span className="text-[16px] font-semibold">Instant Withdrawal</span>
              </div>
            </button>
          </div>
        </div>
      </div>
  );
}

export default WithdrawalExplainerBox;