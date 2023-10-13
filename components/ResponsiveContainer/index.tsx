'use client'

export function ResponsiveContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grid grid-cols-1 gap-4 p-10">
      {children}
    </main>
  )
}
