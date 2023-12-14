export const Steps = ({children} : LayoutProps) => {
    return (
        <div className="p-[3px] custom-step-gradient1 rounded-[20px]">
            <div className="flex flex-col px-[15px] py-[10px] justify-center items-center custom-step-gradient custom-step-shadow rounded-[16px]">
                {children}
            </div>
        </div>
    )
}
