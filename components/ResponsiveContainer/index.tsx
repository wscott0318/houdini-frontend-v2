'use client'

export function ResponsiveContainer({ children }: LayoutProps) {
  return (
    <main className="grid grid-cols-1 gap-4 pt-10 px-4 lg:px-10">
      {children}
    </main>
  )
}
