export const OrderDetailRoundbox = ({children}: LayoutProps) => {
    return (
        <div className="p-[2.5px] w-full custom-houdini-id-gradient1 rounded-[100px]">
            <div className="flex flex-row justify-center gap-[10px] items-center custom-houdini-id-gradient custom-houdini-id-shadow rounded-[100px] w-full lg:px-[15px] lg:py-[10px] px-[15px] py-[5px]">
                {children}
            </div>
        </div>
    )
}
