'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const AnimatedNumbers = dynamic(() => import('react-animated-numbers'), {
  ssr: false,
})

interface SwapVolumeProps {
  value: number
}

export const SwapVolume: React.FC<SwapVolumeProps> = ({ value }) => {
  const [valueArr, setValueArr] = useState([-1, -1, -1, -1, -1, -1, -1])

  const { t } = useTranslation()

  useEffect(() => {
    let array = []
    let valueStr = value.toString()

    for (let i = 0; i < valueStr.length; i++) {
      array.push(parseInt(valueStr[i]))
    }

    for (let i = 0; i < 7 - valueStr.length; i++) {
      array.push(-1)
    }

    setValueArr(array)
  }, [value])

  return (
    <div className="rounded-[25px] w-full max-w-[450px]">
      <div className="flex flex-col w-full justify-center backdrop-blur-[20px] items-center gap-[15px] rounded-[25px] custom-modal-step2-drop-shadow border-[3px] lg:border-[12px] border-[#457BBA]/40 lg:px-2 px-[4px] py-[2px] lg:py-[8px]">
        <div className="relative p-[3px] rounded-[20px] custom-modal-step2-inner-shadow w-full">
          <div className="relative flex flex-col items-center backdrop-blur-[46px] w-full blur-46px custom-modal-step2-drop-shadow rounded-[20px] px-[41px] pt-[18px] pb-[32px] z-[1]">
            <div className="flex flex-col items-center justify-center gap-[20px] px-[20px]">
              <div className="items-center w-full justify-center">
                <div
                  style={{
                    textShadow:
                      '0 0 4px #E2E5E960, 0 0 4px #E2E5E960, 0 0 4px #E2E5E960, 0 0 4px #E2E5E960',
                  }}
                >
                  <p className="text-center font-medium text-[25px]">
                    {' '}
                    {t('totalSwapVolume')}{' '}
                  </p>
                </div>
                <div className="p-[3px] rounded-[10px] custom-modal-step2-drop-shadow custom-swap-modal-border3">
                  <div className="p-[3px] rounded-[8px] bg-[#404256] ">
                    <div className="p-[3px] rounded-[6px] custom-swap-wheel-number-pane-metalbar">
                      <div className="custom-swap-wheel-background rounded-[3px]">
                        <div className="flex flex-row bg-[#434055] rounded-[3px]">
                          <div className="flex flex-row justify-center items-center">
                            <div className="w-[2px] h-[60px] custom-swap-wheel-number-metalbar-gradient1" />
                            <div className="w-[10px] h-[60px] custom-swap-wheel-number-metalbar-gradient2" />
                            <div className="w-[2px] h-[60px] custom-swap-wheel-number-metalbar-gradient3" />
                          </div>
                          {valueArr.map((value, index) => {
                            return (
                              <div
                                key={index}
                                className="px-[1px] custom-swap-wheel-number-pane-outborder"
                              >
                                <div className="custom-swap-wheel-number-pane-innerborder px-[1px]">
                                  <div className="flex custom-swap-wheel-number-pane-background w-[37px] h-[65px] justify-center items-center">
                                    {value != -1 ? (
                                      <AnimatedNumbers
                                        animateToNumber={value}
                                        fontStyle={{
                                          fontSize: 39.285,
                                        }}
                                      />
                                    ) : (
                                      ' '
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                          <div className="flex flex-row justify-center items-center">
                            <div className="w-[2px] h-[60px] custom-swap-wheel-number-metalbar-gradient3" />
                            <div className="w-[10px] h-[60px] custom-swap-wheel-number-metalbar-gradient2" />
                            <div className="w-[2px] h-[60px] custom-swap-wheel-number-metalbar-gradient1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[0px] left-[0px] rounded-[20px] w-full h-full backdrop-filter-[48] custom-swapbox-background-img bg-[length:20%_20%] opacity-[5%] z-[-2]" />
            <div className="absolute top-[0px] left-[0px] rounded-[20px] w-full h-full backdrop-filter-[48] bg-gradient-to-br from-[#a3ceff] via-[#989898] to-[#284b65] opacity-[5%] z-[-1]" />
          </div>
        </div>
      </div>
    </div>
  )
}
