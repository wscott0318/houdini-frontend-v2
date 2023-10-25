export function ResponsivePage({ children }: LayoutProps) {
  return (
    <div className="row-start-2 row-end-3 flex flex-col gap-[30px] md:gap-[80px] justify-center items-center my-[80px] sm:px-0 px-6">
      {children}
    </div>
  )
}
