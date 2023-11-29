interface OrderDetailRoundboxProps {
    border: string,
    children: React.ReactNode
  }  
export const OrderDetailRoundbox = (props: OrderDetailRoundboxProps) => {
    return (
        <div className={`p-[2.5px] w-full ${props.border} rounded-[100px]`}>
            <div className="flex flex-row justify-center gap-[10px] items-center custom-houdini-id-gradient custom-houdini-id-shadow rounded-[100px] w-full lg:px-[15px] lg:py-[10px] px-[15px] py-[5px]">
                {props.children}
            </div>
        </div>
    )
}
