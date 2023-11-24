export const ModalStep = ({children}: LayoutProps) => {
    return (
        <div className='w-full custom-modal-step2-inner-shadow rounded-[24.913px]'>
            <div className="test-class flex flex-col justify-center items-center gap-[15px] rounded-[24.913px] custom-modal-step2-drop-shadow border-[3px] lg:border-[12px] lg:w-[1000px] border-[#457BBA]/40 lg:px-2 px-[4px] py-p[2px] lg:py-[8px]">
                {children}
            </div>
        </div>
    )
}
