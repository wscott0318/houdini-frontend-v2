export const MetalboarderedRoundbox = ({ children }: LayoutProps) => {
  return (
    <div className="p-[2px] custom-step-gradient1 rounded-[20px] w-full">
      <div className="w-full flex flex-wrap flex-col py-[10px] px-[3px] justify-start items-center custom-step-gradient custom-step-shadow rounded-[16px]">
        {children}
      </div>
    </div>
  )
}
