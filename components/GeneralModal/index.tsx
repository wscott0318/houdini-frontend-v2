export const GeneralModal = ({children}: LayoutProps) => {
    return (
        <div className='w-full custom-modal-step2-inner-shadow rounded-[25px] max-w-[1000px]'>
            <div className="test-class flex flex-col w-full justify-center backdrop-blur-[20px] items-center gap-[15px] rounded-[25px] max-w-[1000px] custom-modal-step2-drop-shadow border-[3px] lg:border-[12px] border-[#457BBA]/40 lg:px-2 px-[4px] py-p[2px] lg:py-[8px]">
                {children}
            </div>
        </div>
    )
}
