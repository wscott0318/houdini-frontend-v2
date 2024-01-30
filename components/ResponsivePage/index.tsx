export function ResponsivePage({ children }: LayoutProps) {
  return (
    <div className="row-start-2 min-h-[2000px] sm:min-h-[500px] row-end-3 flex flex-col gap-[30px] md:gap-[80px] justify-start items-start lg:justify-center lg:items-center my-[80px] sm:px-0 px-6">
      {children}
    </div>
  )
}
