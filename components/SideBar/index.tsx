import React from 'react'
import Image from 'next/image'
import {
  LogoSvg,
  ChartSvg,
  DocumentSvg,
  IconSvg,
  NotificationSvg,
  SettingSvg,
  WidthrawSvg,
  SidebarQuestionSvg,
} from '../Svg'
import logo from '@/assets/logo.png'
import avatar from '@/assets/avatar.png'
import { useTranslation } from 'react-i18next'

export function SideBar(){
  const value = 3;
  const { t } = useTranslation()
  return(
      <div className="flex flex-col h-[1000px] pl-[29px] pr-[30px] pt-[44px] pb-[36px] overflow-y-auto custom-sidebar-background  gap-[29px] rounded-r-[50px]">
         <a href="#" className="flex flex-col justify-center items-center">
          <LogoSvg className="lg:w-[209px] lg:h-[71px] lg:block hidden fill-white"/>
          <Image src={logo} className="w-[55px] h-[55px] lg:hidden block" alt="logo"/>
         </a>
         <div className='flex flex-col justify-between h-full'>
          <ul className="space-y-2 font-semibold text-[14px]">
              <li>
                <a href="#" className="flex items-center p-[16px] text-[#A0AEC0]  hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]">
                    <IconSvg className="w-[24px] h-[24px] stroke-white"/>
                    <span className="lg:text-[14px] lg:block hidden lg:ms-[16px]">{t('sidebarDashboard')}</span>
                </a>
              </li>
               <li>
                <a href="#" className="flex items-center p-[16px] text-[#A0AEC0] hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]">
                    <ChartSvg className="w-[24px] h-[24px] "/>
                    <span className="lg:text-[14px] text-[0px] lg:ms-[16px]">{t('sidebarPerformance')}</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-[16px] text-[#A0AEC0] hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]">
                    <DocumentSvg className="w-[24px] h-[24px] "/>
                    <span className="lg:text-[14px] text-[0px] lg:ms-[16px]">{t('sidebarHistory')}</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-[16px] text-[#A0AEC0] hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]">
                  <div className="relative flex">
                    <NotificationSvg className="w-[24px] h-[24px] "/>
                    <span className="lg:text-[14px] text-[0px] lg:ms-[16px] lg:w-[112px]">{t('sidebarNotifications')}</span>
                    <span className="inline-flex items-center justify-center lg:w-[24px] lg:h-[24px] lg:text-[12px] text-[0px] font-medium text-white bg-gradient-to-r from-orange-500 via-yellow-400 to-yellow-300 rounded-full">{value}</span>
                    <span className="absolute lg:top-[0px] lg:right-[0px] top-[-6px] right-[-6px] inline-flex items-center justify-center lg:w-0 lg:h-0 w-[18px] h-[18px] text-[11px] lg:text-[0px] font-medium text-white bg-gradient-to-r from-orange-500 via-yellow-400 to-yellow-300 rounded-full">{value}</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-[16px] text-[#A0AEC0] hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]">
                    <SettingSvg className="w-[24px] h-[24px] "/>
                    <span className="lg:text-[14px] text-[0px] lg:ms-[16px]">{t('sidebarSettings')}</span>
                </a>
              </li>
          </ul>
          <ul className="space-y-2 font-semibold text-[14px]">
            <li>
              <a href="#" className="flex items-center p-[16px] text-[#A0AEC0]  hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]">
                <WidthrawSvg className="w-[24px] h-[24px] stroke-white"/>
                <span className="lg:text-[14px] text-[0px] lg:ms-[16px]">{t('sidebarWidthraw')}</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-[16px] text-[#A0AEC0] hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]">
                <SidebarQuestionSvg className="w-[24px] h-[24px] fill-white"/>
                <span className="lg:text-[14px] text-[0px] lg:ms-[16px]">{t('sidebarSupport')}</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-[16px] text-[#A0AEC0] hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]">
                <Image src={avatar} className='w-[24px] h-[24px]' alt="avatar" />
                <span className="lg:text-[14px] text-[0px] lg:ms-[16px]">{t('sidebarAccount')}</span>
              </a>
            </li>
          </ul>
         </div>
      </div>
  );
}