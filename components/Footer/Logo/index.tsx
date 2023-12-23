import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/logo.png'

import { FooterXBlockSvg, LogoSvg } from '../../Svg'

export const Logo = ({ isHeader = false }: { isHeader?: boolean }) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
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
