import Image from 'next/image'
import React, { useState } from 'react'

import DropDown from './DropDown'

export interface IGroupedData {
  title: string
  content: string
  time: string
  isRead: boolean
}

interface Props {
  data: IGroupedData
  removeItem: (index: number) => void
  markAsRead: (index: number) => void
  index: number
}

const NotificationItem = ({ data, removeItem, markAsRead, index }: Props) => {
  const [value, setValue] = useState(0)

  return (
    <div className="py-[20px] px-[30px]">
      <div className="flex w-full justify-between">
        <div className="flex gap-[24px] items-center">
          {/* <Image src={imageUrl} alt={imageUrl} className="w-[48px] h-[48px]" /> */}
          <Image
            src="/NotificationIcon1.png"
            alt="NotificationIcon1"
            className="w-[48px] h-[48px]"
          />
          <div className="flex flex-col gap-[10px]">
            <span className="font-semibold text-[16px] leading-[20px]">
              {data.title}
            </span>
            <span className="text-[13px] font-normal leading-[20px] w-[400px] text-[#808191]">
              {data.content}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] items-center justify-center">
          <div className="w-full justify-end flex">
            <span className="text-[14px] font-semibold leading-[24px] text-[#808191]">
              {data.time}
            </span>
          </div>
          <div className="w-full justify-end flex">
            <DropDown
              isRead={data.isRead}
              removeItem={removeItem}
              markAsRead={markAsRead}
              index={index}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationItem
