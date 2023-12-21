export const MetalboarderedTransRoundbox = ({children}: LayoutProps) => {
	return (
		<div className="p-[4.5px] rounded-[20px] w-full">
			<div className="relative flex flex-col justify-center items-center rounded-[20px] w-full">
				{children}
				<div className="absolute w-full h-full top-[0px] left-[0px] rounded-[20px] bg-gradient-to-br from-black from-20% to-transparent z-[-1]"></div>
			</div>
		</div>
	)
}