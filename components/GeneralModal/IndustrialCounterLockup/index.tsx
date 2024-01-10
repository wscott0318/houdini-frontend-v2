import { useSearchParams } from 'next/navigation'

export const IndustrialCounterLockup = ({ children }: LayoutProps) => {
  const searchParams = useSearchParams()

  const widgetMode = searchParams.get('widgetMode')

  return (
    <>
      {!widgetMode ? (
        <div className="relative p-[3px] rounded-[20px] custom-modal-step2-inner-shadow w-full">
          <div className="relative flex flex-col items-center backdrop-blur-[46px] w-full blur-46px custom-modal-step2-drop-shadow rounded-[20px] lg:px-[60px] lg:pt-[20px] lg:pb-[40px] px-[5px] py-[20px] z-[1]">
            {children}
            <div className="absolute top-[0px] left-[0px] rounded-[20px] w-full h-full backdrop-filter-[47.61] custom-industrial-background-img bg-[length:20%_20%] opacity-[5%] z-[-2]"></div>
            <div className="absolute top-[0px] left-[0px] rounded-[20px] w-full h-full backdrop-filter-[47.61] bg-gradient-to-br from-[#a3ceff] via-[#989898] to-[#284b65] opacity-[5%] z-[-1]"></div>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  )
}
