export const MetalboarderedRoundbox = ({children} : LayoutProps) => {
    return (
        <div className="p-[2.5px] custom-step-gradient1 rounded-[20px]">
            <div className="flex flex-col lg:px-[15px] py-[10px] px-[3px] justify-center items-center custom-step-gradient custom-step-shadow rounded-[16px]">
                {children}
            </div>
        </div>
    )
}
