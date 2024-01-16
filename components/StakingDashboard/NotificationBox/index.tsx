import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import NotificationIcon1 from '@/assets/NotificationIcon1.png'
import { DownloadSvg, LoadingSvg } from '@/components/Svg'

import ButtonGroup from '../ButtonGroup'
import NotificationItem from './NotificationItem'

const data = [
  {
    title: 'Upcoming News for $LOCK Token Staking',
    content:
      'Lorem ipsum dolor sit amet consectetur. Sit lectus sodales volutpat amet arcu nisi quis dignissim sapien. Porta porttitor.',
    time: '24m ago',
    isRead: false,
  },
  {
    title: 'Last Chance to use your Re-stake to Reclaim Spell! ',
    content:
      'Lorem ipsum dolor sit amet consectetur. Sit lectus sodales volutpat amet arcu nisi quis dignissim sapien. Porta porttitor.',
    time: '35m ago',
    isRead: false,
  },
  {
    title: 'Your Upcoming Staking Withdrawl',
    content:
      'Lorem ipsum dolor sit amet consectetur. Sit lectus sodales volutpat amet arcu nisi quis dignissim sapien. Porta porttitor.',
    time: '1d ago',
    isRead: true,
  },
  {
    title: 'Welcome to Houdini Swap Dashboard',
    content:
      'Lorem ipsum dolor sit amet consectetur. Sit lectus sodales volutpat amet arcu nisi quis dignissim sapien. Porta porttitor.',
    time: '1d ago',
    isRead: true,
  },
  {
    title: 'Welcome to Houdini Swap Dashboard',
    content:
      'Lorem ipsum dolor sit amet consectetur. Sit lectus sodales volutpat amet arcu nisi quis dignissim sapien. Porta porttitor.',
    time: '1d ago',
    isRead: true,
  },
]

interface Item {
  title: string
  content: string
  time: string
  isRead: boolean
}

const buttonNames = ['All', 'Your Activity', 'Promotions', 'Alerts']

const NotificationBox = () => {
  const [headValue, setHeadValue] = useState(0)
  const [listData, setListData] = useState<Item[]>([])

  useEffect(() => {
    setListData(data)
  }, [])

  const removeItem = (index: number) => {
    const temp = [...listData]
    temp.splice(index, 1)
    setListData(temp)
  }

  const markAsRead = (index: number) => {
    const temp = [...listData]
    temp[index].isRead = temp[index].isRead == false
    setListData(temp)
  }

  return (
    <div className="flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] w-[1071px] p-[1px]">
      <div className="w-full h-full p-[30px] rounded-[28px] custom-balances-box-inner-shadow relative">
        <div className="flex flex-row gap-[10px] absolute right-[30px] top-[30px] justify-center items-center">
          <button className="h-[56px] rounded-[16px] justify-center items-center flex bg-gradient-to-b from-[#6C5DD3] to-[#4154C9] px-[20px] py-[12px]">
            <DownloadSvg className="w-[20px] h-[20px]" />
          </button>
        </div>

        <div className="flex flex-col gap-[20px]">
          <span className="rainbow-text text-[18px] font-medium">History</span>
          <ButtonGroup names={buttonNames} />
          <div className="flex flex-col">
            <div className="flex flex-col">
              {listData.map((item, index) => (
                <div key={index}>
                  <NotificationItem
                    data={item}
                    removeItem={removeItem}
                    markAsRead={markAsRead}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex items-center justify-center mt-[47px]">
            <button className="w-[96px] h-[48px] rounded-[15px] bg-gradient-to-b from-[#6C5DD3] to-[#4154C9] items-center justify-center flex">
              <LoadingSvg className="w-[16px] h-[16px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationBox
