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
  const [valueArr, setValueArr] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  const { t } = useTranslation()

  useEffect(() => {
    let array = []
    let valueStr = value.toString()
    valueStr = valueStr.split('').reverse().join('');
    for (let i = 0; i < valueStr.length; i++) {
      array.push(parseInt(valueStr[i]))
    }

    for (let i = 0; i < 10 - valueStr.length; i++) {
      array.push(0)
    }
    array = array.reverse();
    console.log(array);

    setValueArr(array)
  }, [value])

  return (
    <div className="rounded-[25px]">
      <div className="flex flex-col w-full justify-center backdrop-blur-[20px] items-center gap-[15px] rounded-[25px] custom-modal-step2-drop-shadow lg:border-[12px] border-[#457BBA]/40 lg:px-2 lg:py-[8px]">
        <div className="relative p-[3px] rounded-[20px] custom-modal-step2-inner-shadow w-full">
          <div className="relative flex flex-col items-center backdrop-blur-[46px] w-full blur-46px custom-modal-step2-drop-shadow rounded-[20px] px-[5px] lg:px-[41px] lg:pt-[18px] pt-[10px] lg:pb-[32px] pb-[20px] z-[1]">
            <div className="flex flex-col items-center justify-center gap-[20px] lg:px-[20px] px-[5px]">
              <div className="items-center w-full justify-center">
                <div
                  style={{
                    textShadow:
                      '0 0 4px #E2E5E960, 0 0 4px #E2E5E960, 0 0 4px #E2E5E960, 0 0 4px #E2E5E960',
                  }}
                >
                  <p className="text-center font-medium lg:text-[25px] text-[20px]">
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
                            <div className="w-[2px] lg:h-[60px] h-[50px] custom-swap-wheel-number-metalbar-gradient1" />
                            <div className="lg:w-[10px] w-[5px] lg:h-[60px] h-[50px] custom-swap-wheel-number-metalbar-gradient2" />
                            <div className="w-[2px] lg:h-[60px] h-[50px] custom-swap-wheel-number-metalbar-gradient3" />
                          </div>
                          {valueArr.map((value, index) => {
                            return (
                              <div
                                key={index}
                                className="px-[1px] custom-swap-wheel-number-pane-outborder"
                              >
                                <div className="custom-swap-wheel-number-pane-innerborder px-[1px]">
                                  <div className="flex custom-swap-wheel-number-pane-background lg:w-[37px] lg:hidden w-[20px] h-[50px] lg:h-[65px] justify-center items-center">
                                    <AnimatedNumbers
                                      animateToNumber={value}
                                      fontStyle={{
                                        fontSize: 20,
                                      }}
                                    />
                                  </div>
                                  <div className="lg:flex custom-swap-wheel-number-pane-background lg:w-[37px] hidden w-[20px] h-[50px] lg:h-[65px] justify-center items-center">
                                    <AnimatedNumbers
                                      animateToNumber={value}
                                      fontStyle={{
                                        fontSize: 39
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                          <div className="flex flex-row justify-center items-center">
                            <div className="w-[2px] lg:h-[60px] h-[50px] custom-swap-wheel-number-metalbar-gradient3" />
                            <div className="lg:w-[10px] w-[5px] lg:h-[60px] h-[50px] custom-swap-wheel-number-metalbar-gradient2" />
                            <div className="w-[2px] lg:h-[60px] h-[50px] custom-swap-wheel-number-metalbar-gradient1" />
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
