export const IndustrialCounterLockup = ({children}: LayoutProps) => {
    return (
        <div className="relative p-[3px] rounded-[20px] custom-modal-step2-inner-shadow w-full">
            <div className="relative flex flex-col items-center backdrop-blur-[46px] w-full blur-46px custom-modal-step2-drop-shadow rounded-[20px] px-[60px] pt-[20px] pb-[40px] z-[1]">
                {children}
                <div className="absolute top-[0px] left-[0px] rounded-[20px] w-full h-full backdrop-filter-[48] custom-industrial-background-img bg-[length:20%_20%] opacity-[5%] z-[-2]"></div>
                <div className="absolute top-[0px] left-[0px] rounded-[20px] w-full h-full backdrop-filter-[48] bg-gradient-to-br from-[#a3ceff] via-[#989898] to-[#284b65] opacity-[5%] z-[-1]"></div>
            </div>
        </div>
    )
}
