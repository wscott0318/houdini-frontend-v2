import Image from 'next/image'
import { useRouter } from 'next/navigation'

import logo from '@/assets/logo.png'

import { LogoSvg } from '../../Svg'

export const Logo = ({ isHeader = false }: { isHeader?: boolean }) => {
  const router = useRouter()

  function handleClick(event: React.MouseEvent) {
    const target = event.target as HTMLElement
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
      {!isHeader && (
        <Image src={logo} className="w-[90px] h-[70px]" alt="logo" />
      )}
      <LogoSvg className="w-[150px] h-[60px] fill-white" />
      {/* {!isHeader && (
        <div className="flex justify-start items-center">
          <Link
            target="_blank"
            className="group flex flex-row"
            href="https://www.xblock.tech/"
          >
            <FooterXBlockSvg id="xblock" className="w-[128px] h-[26px]" />
          </Link>
        </div>
      )} */}
    </div>
  )
}
