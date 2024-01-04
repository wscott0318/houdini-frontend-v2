import React from 'react'
import CTAButton from '../CTAButton';
import { QuestionMarkSvg } from '@/components/Svg';

const XBlockPerformanceStatsBox = () => {
  return (
      <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] w-[422px] h-[447px] p-[30px]">
        <div className="flex flex-col justify-between w-full h-full gap-[30px]">
          <div className='flex flex-row justify-between'>
            <span>xBlock Performance Statistics</span>
            <button><QuestionMarkSvg className="w-[18px] h-[18px]"/></button>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-row gap-[55px]">
              <div className="flex flex-col gap-[10px]">
                <span className='text-[18px] font-medium custom-xBlock-gold-gradient-text'>Last Week Swaps</span>
                <span className='text-[20px] font-medium'>1,234,456</span>
              </div>
              <div className="flex flex-col gap-[10px]">
                <span className='text-[18px] font-medium custom-xBlock-gold-gradient-text'>Total Swaps</span>
                <span className='text-[20px] font-medium'>34,456,030</span>
              </div>
            </div>
            <div className="flex flex-row gap-[50px]">
              <div className="flex flex-col gap-[10px]">
                <span className='text-[18px] font-medium custom-xBlock-blue-gradient-text'>Monthly Volume</span>
                <div className='flex flex-row gap-[5px] items-center'>
                  <span className='text-[20px] font-medium'>34,456,030</span>
                  <span className='bg-[#0000004D] rounded-[8px] px-[8px] py-[5px] text-[10px]'>$USD</span>
                </div>
              </div>
              <div className="flex flex-col gap-[10px]">
                <span className='text-[18px] font-medium custom-xBlock-blue-gradient-text'>Total Volume</span>
                <div className='flex flex-row gap-[5px] items-center'>
                  <span className='text-[20px] font-medium'>34,456,030</span>
                  <span className='bg-[#0000004D] rounded-[8px] px-[8px] py-[5px] text-[10px]'>$USD</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-[30px]">
              <div className="flex flex-col gap-[10px]">
                <span className='text-[18px] font-medium custom-xBlock-purple-gradient-text'>Last Week Buybacks</span>
                <div className='flex flex-row gap-[5px] items-center'>
                  <span className='text-[20px] font-medium'>4,456.00</span>
                  <span className='bg-[#0000004D] rounded-[8px] px-[8px] py-[5px] text-[10px]'>$USD</span>
                </div>
              </div>
              <div className="flex flex-col gap-[10px]">
                <span className='text-[18px] font-medium custom-xBlock-purple-gradient-text'>Total Buybacks</span>
                <div className='flex flex-row gap-[5px] items-center'>
                  <span className='text-[20px] font-medium'>3,234,456.00</span>
                  <span className='bg-[#0000004D] rounded-[8px] px-[8px] py-[5px] text-[10px]'>$USD</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <CTAButton height='48px'>
              <div className='flex flex-row gap-[7px] justify-center items-center'>
                <span className="text-[16px] font-medium">More Info</span>
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
  );
}

export default XBlockPerformanceStatsBox;