import React, { useState } from 'react'
import { CloseSvg } from '../Svg'
import { useHandleClickAway } from '@/hooks'

const Tooltip = ({
  text,
  children,
  className,
  additionalClassNames = '',
}: {
  text: string | React.ReactNode
  children: React.ReactNode
  className?: string
  additionalClassNames?: string
}) => {
  const [show, setShow] = useState(false)
  const ref = useHandleClickAway(() => setShow(false))
  return (
    <div
      // onMouseEnter={() => setShow(true)}
      onClick={(e) => {
        if ((e.target as any).tagName !== "A")
          setShow(!show);
        else {
          window.open((e.target as any).getAttribute("href"), "_blank", "noreferrer");
        }
      }}
      className={`${className} cursor-pointer`}
    >
      {show && (
        <menu
          ref={ref}
          style={{ whiteSpace: 'pre-line' }}
          className={`${additionalClassNames} backdrop-blur-3xl	bg-gray-900 bg-opacity-90 p-2 shadow-2xl rounded-lg absolute z-[9999] rounded text-[12px] leading-tight text-stormDust sm:text-md`}
        >
          <button className='absolute right-[4px] top-[4px]' onClick={() => setShow(false)}>
            <CloseSvg className=" w-[16px] h-[16px]" />
          </button>
          <div className="mr-4 p-2">
            {text}
          </div>
        </menu>
      )}
      <div>{children}</div>
    </div>
  )
}

export default Tooltip
