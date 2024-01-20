import React, { useState } from 'react'

interface QTYButtonProps {
  text: string
  isSet: boolean
  onClick?: () => void
}

export default function QTYButton(props: QTYButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      className={`p-[2px] rounded-[12px] custom-QTY-button-outline`}
      style={{ cursor: 'pointer' }}
      onClick={props.onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.isSet == true ? (
        <div className="px-[20px] py-[6px] rounded-[12px]  text-[16px] font-semibold bg-gradient-to-b from-[#6C5DD3] to-[#4154C9]">
          {props.text}
        </div>
      ) : (
        <div className="px-[20px] py-[6px] rounded-[12px] bg-black text-[16px] font-semibold hover:bg-[#101115]">
          {props.text}
        </div>
      )}
    </div>
  )
}
