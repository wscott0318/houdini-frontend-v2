export const WalletRoundbox = ({children}: LayoutProps) => {
    return (
        <div className="p-[2px] custom-need-help-gradient1 rounded-[15px]">
            <div className={`bg-[#2d3346] rounded-[15px]`}>
                {children}
            </div>
        </div>
    )
}
