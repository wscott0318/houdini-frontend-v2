import { useTranslation } from 'react-i18next'
import dynamic from "next/dynamic"
import { useEffect, useState } from 'react';
const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});

interface SwapVolumeProps {
  value: number
}

export const SwapVolume = (props: SwapVolumeProps) => {
  
  const { t } = useTranslation()
  const [valueArr, setValueArr] = useState(['0','0','0','0','0','0','0'])
  useEffect(() => {
    let valueStr = props.value.toString();
    valueStr = [...valueStr].reverse().join('');
    for ( let i = 0; i < 7 - props.value.toString().length; i++)
      valueStr = valueStr + '0'
    setValueArr([...valueStr].reverse());
  }, [props.value])

  return (
      <div className="flex justify-center items-center rounded-[30px] custom-modal-step2-drop-shadow border-[12px] p-[5px] border-[#457BBA]/40 ">
        <div className="relative rounded-[20px] custom-modal-step2-inner-shadow w-full p-[2px] custom-swap-modal-border2">
          <div className="relative flex flex-col bg-[#2e2d3e] gap-[6px] custom-wallet-shadow items-center backdrop-blur-[46px] w-full blur-46px rounded-[20px] px-[41px] pt-[18px] pb-[32px] z-[1]">
            <div style={{textShadow: '0 0 4px #E2E5E960, 0 0 4px #E2E5E960, 0 0 4px #E2E5E960, 0 0 4px #E2E5E960' }}>
              <p className="font-medium text-[25px]"> { t('totalSwapVolume') } </p>
            </div>
            <div className='p-[3px] rounded-[10px] custom-modal-step2-drop-shadow custom-swap-modal-border3'>
              <div className='p-[3px] rounded-[8px] bg-[#404256] '>
                <div className="p-[3px] rounded-[6px] custom-swap-wheel-number-pane-metalbar">
                  <div className='custom-swap-wheel-background rounded-[3px]'>
                    <div className="flex flex-row bg-[#434055] rounded-[3px]">
                      <div className="flex flex-row justify-center items-center">
                        <div className="w-[2px] h-[60px] custom-swap-wheel-number-metalbar-gradient1"></div>
                        <div className="w-[10px] h-[60px] custom-swap-wheel-number-metalbar-gradient2"></div>
                        <div className="w-[2px] h-[60px] custom-swap-wheel-number-metalbar-gradient3"></div>
                      </div>
                      {valueArr.map((value, index) => {
                        return (
                          <div key={index} className="px-[1px] custom-swap-wheel-number-pane-outborder">
                            <div className="custom-swap-wheel-number-pane-innerborder px-[1px]">
                              <div className='flex custom-swap-wheel-number-pane-background w-[25px] h-[65px] justify-center items-center'>
                                <AnimatedNumbers
                                  animateToNumber={parseInt(value)}
                                  fontStyle={{
                                    fontSize: 28
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="flex flex-row justify-center items-center">
                        <div className="w-[2px] h-[60px] custom-swap-wheel-number-metalbar-gradient3"></div>
                        <div className="w-[10px] h-[60px] custom-swap-wheel-number-metalbar-gradient2"></div>
                        <div className="w-[2px] h-[60px] custom-swap-wheel-number-metalbar-gradient1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[0px] left-[0px] rounded-[20px] w-full h-full custom-industrial-background-img opacity-[5%] z-[-2]" style={{backdropFilter: 'blur(48%)', backgroundSize: '70%'}}></div>
            <div className="absolute top-[0px] left-[0px] rounded-[20px] w-full h-full backdrop-filter-[48] bg-gradient-to-br from-[#a3ceff] via-[#989898] to-[#284b65] opacity-[5%] z-[-1]"></div>
          </div>
        </div>
      </div>
  );
}