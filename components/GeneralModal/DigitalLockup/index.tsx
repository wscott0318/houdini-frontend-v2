import {
  RadialProgressSvg,
} from '@/components/Svg'

interface DigitalProps {
  value: number
  text: string
  status: boolean
}

export const DigitalLockup = (props: DigitalProps) => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="items-center ">
        {props.status == false ? (
          <RadialProgressSvg width={118} height={118}/>
        ) : (
          <RadialProgressSvg width={118} height={118}/>
        )}
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