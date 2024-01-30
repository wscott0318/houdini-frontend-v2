import React, { useState } from 'react'

const Tooltip = ({
  text,
  children,
  className,
  additionalClassNames = 'min-w-[250px] sm:min-w-max bg-verdigrisOpacity -left-[104px] mt-7 p-2',
}: {
  text: string
  children: React.ReactNode
  className?: string
  additionalClassNames?: string
}) => {
  const [show, setShow] = useState(false)

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className={`${className} cursor-pointer`}
    >
      {show && (
        <div
          style={{ whiteSpace: 'pre-line' }}
          className={`${additionalClassNames} absolute z-[9999] rounded text-[9px] leading-tight text-stormDust sm:text-xs`}
        >
          {text}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}

export default Tooltip
