import { CardComponent } from 'houdini-react-sdk'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { TelegramSvg } from '@/components/Svg'
import { useWindowSize } from '@/hooks'

export const NeedHelp = () => {
  const { t } = useTranslation()
  const [width] = useWindowSize()

  return (
    <CardComponent
      widthClass={width > 1024 ? '540px' : '100%'}
      heightClass={width > 1024 ? '212px' : '100%'}
    >
      <div className="text-center w-full lg:text-[46px] text-[20px] lg:leading-[75px] font-semibold whitespace-nowrap">
        {t('needHelpModalTitle')}
      </div>

      <div className="text-center w-full lg:text-[17px] font-medium rainbow-text ">
        {t('needHelpModalContent')}
      </div>

      <Link href="https://t.me/HoudiniSwapSupport_bot" target="_blank">
        <TelegramSvg className="w-6 h-6 fill-white group-hover:fill-[#F5C341]" />
      </Link>
    </CardComponent>
  )
}
