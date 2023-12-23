import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import logo from '@/assets/logo.png'

import { FooterXBlockSvg, LogoSvg } from '../../Svg'

export const Logo = ({ isHeader = false }: { isHeader?: boolean }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => {
        router.push('/')
      }}
      className="hover:cursor-pointer flex flex-col gap-2 justify-center items-center"
    >
      {!isHeader ? (
        <Image src={logo} className="w-[144px] h-[151px]" alt="logo" />
      ) : null}
      <LogoSvg className="w-[200px] h-[80px] fill-white" />
      {!isHeader ? (
        <div className="z-[1] justify-start items-center">
          <Link className="group flex flex-row" href="#">
            <FooterXBlockSvg className="w-[128px] h-[26px]" />
          </Link>
        </div>
      ) : null}
    </div>
  )
}
