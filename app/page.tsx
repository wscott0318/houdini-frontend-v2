'use client'
import { HoudiniButton } from '@/node_modules/react-sdk'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-9xl">Hello new Houdini!</div>
      <HoudiniButton />
    </main>
  );
}
