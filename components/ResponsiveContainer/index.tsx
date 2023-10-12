'use client'

export function ResponsiveContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-[#2e2d3e] px-[150px] py-[50px]">
      {children}
    </main>
  )
}
