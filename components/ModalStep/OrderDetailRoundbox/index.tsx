export const OrderDetailRoundbox = ({children}: LayoutProps) => {
    return (
        <div className="p-[3px] custom-houdini-id-gradient1 rounded-[100px]">
            <div className="flex flex-row justify-center gap-[10px] items-center custom-houdini-id-gradient custom-houdini-id-shadow rounded-[100px] px-[15px] py-[10px]">
                {children}
            </div>
        </div>
    )
}
