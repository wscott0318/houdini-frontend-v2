import { useTranslation } from 'react-i18next'

import { RadialProgressSvg } from '@/components/Svg'

interface DigitalProps {
  value: number
  status: boolean
  text: string
}

export const DigitalLockup = (props: DigitalProps) => {
  const { t } = useTranslation()

  const circumference = 2 * 3.141592 * 73
  const offset = circumference * ((100 - props.value) / 100)

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="items-center ">
        <div className="relative">
          <RadialProgressSvg width={118} height={118} />
          {props.value == 100 ? (
            <svg
              className="absolute top-0 left-0"
              width="118"
              height="118"
              viewBox="0 0 200 200"
              style={{ transform: 'rotate(-90deg)' }}
            >
              <defs>
                <radialGradient id="gradientCompleted">
                  <stop offset="80%" stopColor="#52FF78" />
                  <stop offset="95%" stopColor="#27C100" />
                </radialGradient>
              </defs>
              <circle
                r="73"
                cx="100"
                cy="100"
                fill="transparent"
                strokeLinecap="round"
                stroke="url(#gradientCompleted)"
                strokeWidth="37px"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>
          ) : (
            props.value != 0 && (
              <svg
                className="absolute top-0 left-0"
                width="118"
                height="118"
                viewBox="0 0 200 200"
                style={{ transform: 'rotate(-90deg)' }}
              >
                <defs>
                  <radialGradient id="gradientInprogress">
                    <stop offset="85%" stopColor="#FFC840" />
                    <stop offset="95%" stopColor="#FF9F0E" />
                  </radialGradient>
                </defs>
                <circle
                  r="73"
                  cx="100"
                  cy="100"
                  fill="transparent"
                  strokeLinecap="round"
                  stroke="url(#gradientInprogress)"
                  strokeWidth="37px"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                ></circle>
              </svg>
            )
          )}
        </div>
      </div>
      <div>
        <div className="p-[2.73px] custom-step-gradient1 rounded-[60px]">
          <div className="flex flex-col justify-center items-center custom-step-gradient custom-step-shadow rounded-[60px] px-[15px] py-[5px]">
            <div className="text-center w-full leading-[21.88px] text-[10.03px] font-bold whitespace-nowrap">
              {props.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
