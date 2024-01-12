import React, { useState } from 'react'

const content = [
  { text: 'Select Amount' },
  { text: 'Max' },
  { text: '75%' },
  { text: '50%' },
  { text: '25%' },
]

export default function ValueDropDown() {
  const [selected, setSelected] = useState(content[1])

  return (
    <div className="relative inline-flex ">
      <div className="inline-flex w-[250px] items-center justify-center p-[2px] height-[56px] rounded-[12px] bg-gradient-to-b from-white to-black">
        <span className="pl-[11px] pr-[19px] py-[8px] inline-flex justify-between rounded-[12px] w-full h-[40px] gap-[7px] items-center bg-gradient-to-br from-black to-[#252932]">
          <span className="text-[16px] font-semibold ms-[10px]">
            {selected.text}
          </span>
        </span>
      </div>
      <div className="absolute w-[250px] top-[40px] rounded-[28px] p-[2px] custom-QTY-button-outline">
        <div className="rounded-[28px]  py-[24px] pl-[29px] pr-[55px] bg-gradient-to-r from-[#212a36] to-[#363a50]">
          <div className="flex flex-col gap-[12px] ">
            {content.map((value, index) => {
              return (
                index !== 0 && (
                  <div
                    key={index}
                    className="flex flex-row gap-[12px] items-center"
                  >
                    <div
                      className={
                        value.text === selected.text ? 'visible' : 'invisible'
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
                        value.text === selected.text
                          ? 'bg-gradient-to-r from-[#FB792F] via-[#F3C755] to-[#F5C341] bg-clip-text text-transparent'
                          : 'text-white'
                      } text-[16px] font-semibold`}
                    >
                      {value.text}
                    </div>
                  </div>
                )
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
