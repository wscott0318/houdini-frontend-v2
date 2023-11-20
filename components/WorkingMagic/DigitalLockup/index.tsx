import Radial0 from '@/assets/RadialProgress0.png'
import Radial100 from '@/assets/RadialProgress100.png'
import Image from 'next/image'

export default function DigitalLockup(props: any) {
  return (
    <>
      <div className="flex flex-col gap-[20px]">
        <div className="items-center ">
          {props.value == '0' ? (
            <Image src={Radial0} alt="ETH-ETH" />
          ) : (
            <Image src={Radial100} alt="ETH-ETH" />
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
    </>
  )
}
