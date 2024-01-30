import React, { useState } from 'react'

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

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className={`${className} cursor-pointer`}
    >
      {show && (
        <div
          style={{ whiteSpace: 'pre-line' }}
          className={`${additionalClassNames} backdrop-blur-3xl	bg-gray-900 bg-opacity-90 p-2 shadow-2xl rounded-lg absolute z-[9999] rounded text-[12px] leading-tight text-stormDust sm:text-md`}
        >
          {text}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}

export default Tooltip
