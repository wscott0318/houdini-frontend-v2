import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import logo from '@/assets/logo.png'

import { FooterXBlockSvg, LogoSvg } from '../../Svg'

export const Logo = ({ isHeader = false }: { isHeader?: boolean }) => {
  const router = useRouter()

  function handleClick(event: React.MouseEvent) {
    const target = event.target as HTMLElement
    console.log('target', target)
    if (target && target.id !== 'xblock') {
      router.push('/')
    }
  }

  return (
    <div
      onClick={(e) => {
        handleClick(e)
      }}
      className="hover:cursor-pointer flex flex-col gap-2 justify-center items-center"
    >
      {!isHeader ? (
        <Image src={logo} className="w-[144px] h-[151px]" alt="logo" />
      ) : null}
      <LogoSvg className="w-[200px] h-[80px] fill-white" />
      {!isHeader ? (
        <div className="flex justify-start items-center">
          <Link
            target="_blank"
            className="group flex flex-row"
            href="https://www.xblock.tech/"
          >
            <FooterXBlockSvg id="xblock" className="w-[128px] h-[26px]" />
          </Link>
        </div>
      ) : null}
    </div>
  )
}
