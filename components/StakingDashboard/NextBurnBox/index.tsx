import React from 'react'
import { QuestionMarkSvg } from '@/components/Svg';
import LockTokenIcon1 from '@/assets/LockTokenIcon1.png'
import Image from 'next/image';

const NextBurnBox = () => {
  return (
      <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] w-[422px] h-[297px] p-[1px]">
        <div className='w-full h-full p-[30px] rounded-[28px] custom-balances-box-inner-shadow'>
          <div className="flex flex-col justify-between w-full h-full gap-[20px]">
            <div className='flex flex-row justify-between'>
              <span className='text-[20px] font-medium'>Next Burn</span>
              <button><QuestionMarkSvg className="w-[18px] h-[18px]"/></button>
            </div>
            <div className="flex flex-col gap-[10px] items-center">
              <div className='flex flex-col items-center'>
                <div className="flex flex-row gap-[10px] justify-center items-center">
                  <Image src={LockTokenIcon1} className="w-[42px] h-[42px]" alt="LockTokenIcon1"/>
                  <span className='text-[50px] font-medium rainbow-text'>574,638.94 </span>
                </div>
                <span className='text-[12px] font-semibold text-[#A0AEC0]'>(3,234,456.00 $USD)</span>
              </div>
              <span className='text-[22px] font-medium rainbow-text'>Gets burned in...</span>
              <div className='flex flex-row justify-center items-center gap-[10px]'>
                <div className='w-[44px] h-[44px] flex flex-col justify-between items-center'>
                  <span className='text-[20px] font-medium'>10</span>
                  <span className='text-[#A0AEC0] text-[12px] font-semibold'>Days</span>
                </div>
                <div className='w-[44px] h-[44px] flex flex-col justify-between items-center'>
                  <span className='text-[20px] font-medium'>12</span>
                  <span className='text-[#A0AEC0] text-[12px] font-semibold'>Hours</span>
                </div>
                <div className='w-[44px] h-[44px] flex flex-col justify-between items-center'>
                  <span className='text-[20px] font-medium'>30</span>
                  <span className='text-[#A0AEC0] text-[12px] font-semibold'>Mins</span>
                </div>
                <div className='w-[44px] h-[44px] flex flex-col justify-between items-center'>
                  <span className='text-[20px] font-medium'>20</span>
                  <span className='text-[#A0AEC0] text-[12px] font-semibold'>Sec</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default NextBurnBox;