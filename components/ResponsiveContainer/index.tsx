'use client'

export function ResponsiveContainer({ children }: LayoutProps) {
  return (
    // overflow-auto max-h-[100vh]
    <main className="grid grid-cols-1 gap-4 pt-10 px-4 lg:px-10">
      {children}
    </main>
  )
}
