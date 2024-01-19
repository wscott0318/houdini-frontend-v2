import React, { useState } from 'react'

import { ArrowCopySvg, CalenderDateSvg, FCheckGoldSvg } from '@/components/Svg'

const content = [
  { text: 'All Time' },
  { text: 'This past week' },
  { text: 'This past Month' },
  { text: 'This past Year' },
]

export default function Timeframe() {
  const [selected, setSelected] = useState(content[0])
  const [dropedDown, setDropedDown] = useState(false)

  return (
    <div className="relative inline-flex">
      <button
        onClick={() => {
          setDropedDown(dropedDown == false)
        }}
      >
        <div className="inline-flex items-center justify-center p-[2px] rounded-[12px] bg-gradient-to-b from-white to-black">
          <div className="inline-flex justify-center rounded-[12px] w-full h-full items-center bg-gradient-to-br from-black to-[#252932] py-[8px] pl-[11px] pr-[19px]">
            <div className="w-[220px] h-[40px] flex justify-between items-center">
              <div className="flex flex-row gap-[10px] justify-center items-center">
                <CalenderDateSvg className="w-[14px] h-[15px]" />
                <span>Timeframe</span>
              </div>
              <ArrowCopySvg className="w-[6px] h-[12px] stroke-2 stroke-white" />
            </div>
          </div>
        </div>
      </button>
      {dropedDown == true && (
        <div className="absolute w-[250px] top-[50px] rounded-[28px] p-[2px] custom-QTY-button-outline z-[1]">
          <div className="rounded-[28px]  py-[24px] pl-[29px] pr-[55px] bg-gradient-to-r from-[#212a36] to-[#363a50]">
            <div className="flex flex-col gap-[12px] ">
              {content.map((value, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setSelected(value)
                      setDropedDown(false)
                    }}
                  >
                    <div className="flex flex-row gap-[12px] items-center">
                      <div
                        className={
                          value.text === selected.text ? 'visible' : 'invisible'
                        }
                      >
                        <FCheckGoldSvg className="w-[16px] h-[12.8px]" />
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
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
