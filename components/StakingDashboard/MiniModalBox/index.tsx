import React from 'react'
import { useTranslation } from 'react-i18next'
import SwitchButton from './SwitchButton';
import QTYButton from '../QTYButton';
import { StakeMoreSvg } from '@/components/Svg';

const MiniModalBox = () => {
  const { t } = useTranslation()
  return (
      <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] h-[394px] p-[1px]">
        <div className='w-full h-full p-[30px] rounded-[28px] custom-balances-box-inner-shadow flex flex-col gap-[40px]'>
          <div className='flex flex-col gap-[20px]'>
            <SwitchButton />
            <div className='flex flex-row w-full gap-[10px]'>
              <QTYButton text="25%" />
              <QTYButton text="50%" />
              <QTYButton text="75%" />
              <QTYButton text="Max" />
            </div>
            <div className='bg-gradient-to-b from-[#fff] to-[#000] rounded-[16px] justify-center items-center flex p-[2px]'>
              <div className='rounded-[16px] h-[78px] w-full px-[24px] py-[15px] flex flex-row justify-between bg-gradient-to-b from-[#0b0d11] to-[#343d50]'>
                <div className='flex flex-col justify-between'>
                  <span className='text-[10px] font-semibold uppercase'>{t('amountToStake')}</span>
                  <span className='text-[20px] font-medium leading-[20px]'>423525.6598</span>
                </div>
                <div className='flex items-end'><span className='text-[14px] font-bold leading-[24px] uppercase'>{t('lock')}</span></div>
              </div>
            </div>
            <span className='text-[12px] leading-[16px] font-medium'>Fee: 0.125% / 0.125%</span>
          </div>
          <button
            className={'p-[16px] flex justify-center items-center rounded-[120px] bg-gradient-to-b from-[#6C5DD3] to-[#4154C9]'}
            onClick={() => {}}
          >
            <div className='flex flex-row gap-[7px] justify-center items-center'>
              <StakeMoreSvg className="w-[16px] h-[16px]"/>
              <span className="text-[16px] font-semibold">{t('stake')}</span>
            </div>
          </button>
        </div>
      </div>
  );
}

export default MiniModalBox;