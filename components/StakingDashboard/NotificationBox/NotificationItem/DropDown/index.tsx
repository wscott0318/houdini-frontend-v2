import React, { useState } from 'react'

import { MoreIconSvg } from '@/components/Svg'

const content = [{ text: 'Mark as read' }, { text: 'Remove this notification' }]

interface Props {
  isRead: boolean
  markAsRead: any
  removeItem: any
  index: number
}

export default function DropDown({
  isRead,
  markAsRead,
  removeItem,
  index,
}: Props) {
  const [hovered, setIsHovered] = useState(false)
  const [selected, setSelected] = useState(' ')

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hovered == true ? (
        <button>
          <MoreIconSvg className="w-[40px] h-[40px]" />
        </button>
      ) : (
        <button
          className={
            isRead == true
              ? `w-[12px] h-[12px] bg-white rounded-[100px]`
              : `w-[12px] h-[12px] bg-[#3F8CFF] rounded-[100px]`
          }
        ></button>
      )}
      {hovered == true && (
        <div className="absolute top-[30px] left-[-120px] z-[1]">
          <div className="w-[252px] h-[25px]"></div>
          <div className="rounded-[28px] p-[2px] custom-QTY-button-outline ">
            <div className="rounded-[28px]  pt-[26px] pb-[25px] pl-[24px] pr-[18px] bg-gradient-to-r from-[#212a36] to-[#363a50]">
              <div className="flex flex-col gap-[12px] ">
                {content.map((value, number) => {
                  return (
                    <button
                      key={number}
                      className="flex flex-row gap-[12px] items-center"
                      onClick={() => {
                        setSelected(content[number].text)
                        if (number == 0) {
                          markAsRead(index)
                        } else if (number == 1) {
                          removeItem(index)
                        }
                        setIsHovered(false)
                      }}
                    >
                      <div
                        className={
                          value.text === selected ? 'visible' : 'invisible'
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="14"
                          viewBox="0 0 17 14"
                          fill="none"
                        >
                          <path
                            d="M6.44668 8.59961L3.24668 5.39961L0.84668 7.79961L6.44668 13.3996L16.8467 2.99961L14.4467 0.599609L6.44668 8.59961Z"
                            fill="url(#paint0_linear_1733_25822)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1733_25822"
                              x1="5.62897"
                              y1="0.599609"
                              x2="31.4613"
                              y2="9.73698"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#FB792F" />
                              <stop offset="0.520833" stop-color="#F3C755" />
                              <stop offset="1" stop-color="#F5C341" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div
                        className={`${
                          value.text === selected
                            ? 'bg-gradient-to-r from-[#FB792F] via-[#F3C755] to-[#F5C341] bg-clip-text text-transparent'
                            : 'text-white'
                        } text-[16px] font-semibold`}
                      >
                        {value.text}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="w-[252px] h-[41px]"></div>
        </div>
      )}
    </div>
  )
}
