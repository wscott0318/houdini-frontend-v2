import Avax from '@/assets/AVAX-AVAXC.png'
import Copy from '@/assets/Copy.png'
import Eth from '@/assets/ETH-ETH.png'
import Help from '@/assets/help.png'
import Image from 'next/image'

export const ModalStep = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="w-[1000px] custom-modal-step2-inner-shadow rounded-[24.913px]">
        <div className="test-class flex flex-col justify-center items-center gap-[15px] w-[1000px] rounded-[24.913px] custom-modal-step2-drop-shadow border-[12px] border-[#457BBA]/40 px-2 py-2">
          {children}
        </div>
      </div>
    </>
  )
}

export const OrderDetailRoundbox = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="p-[2.5px] custom-houdini-id-gradient1 rounded-[100px]">
        <div className="flex flex-row justify-center gap-[10px] items-center custom-houdini-id-gradient custom-houdini-id-shadow rounded-[100px] px-[15px] py-[10px]">
          {children}
        </div>
      </div>
    </>
  )
}

export const WalletRoundbox = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="p-[2.4px] custom-need-help-gradient1 rounded-[15px]">
        <div className={`bg-[#2d3346] rounded-[15px]`}>{children}</div>
      </div>
    </>
  )
}

export const CopyBtnDemo = (props: any) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.concept)
  }
  return (
    <>
      <div className="flex flex-row gap-[10px]">
        <div
          className={`${props.textColor} ${props.fontSize} ${props.fontWeight} ${props.lineHeight} ${props.textOpacity} text-center`}
        >
          {props.concept}
        </div>
        <button onClick={copyToClipboard}>
          <div className="text-base text-center text-[20px] font-extrabold">
            <Image src={Copy} width={19} height={22} alt="Copy" />
          </div>
        </button>
      </div>
    </>
  )
}

export const Steps = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="p-[2.5px] custom-step-gradient1 rounded-[20px]">
        <div className="flex flex-col px-[15px] py-[10px] justify-center items-center custom-step-gradient custom-step-shadow rounded-[16px]">
          {children}
        </div>
      </div>
    </>
  )
}

export const IndustrialCounterLockup = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="relative p-[3px] rounded-[20px] custom-modal-step2-inner-shadow w-full">
        <div
          className="relative flex flex-col items-center backdrop-blur-[46px] w-full blur-46px custom-modal-step2-drop-shadow rounded-[20px] px-[60px] pt-[20px] pb-[40px]"
          style={{ zIndex: 1 }}
        >
          {children}
          <div
            className="absolute top-[0px] left-[0px] rounded-[20px] w-full h-full backdrop-filter-[47.61] custom-industrial-background-img bg-[length:20%_20%] opacity-[5%]"
            style={{ zIndex: -2 }}
          ></div>
          <div
            className="absolute top-[0px] left-[0px] rounded-[20px] w-full h-full backdrop-filter-[47.61] bg-gradient-to-br from-[#a3ceff] via-[#989898] to-[#284b65] opacity-[5%]"
            style={{ zIndex: -1 }}
          ></div>
        </div>
      </div>
    </>
  )
}
