import React, { useState } from 'react'

interface QTAButtonProps {
  text: string,
  width: string,
  height: string,
  onClick?: () => void;
}

export default function QTAButton(props: QTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  }
  
  return (
    <div className={`p-[2px] rounded-[12px] custom-QTY-button-outline w-[${props.width}] h-[${props.height}]`}
      style={{cursor: 'pointer'}}
      onClick={props.onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="items-center justify-center px-[20px] py-[6px] rounded-[12px] h-full w-full bg-black text-[16px] font-semibold hover:custom-QTA-button-hover-background">
        <span>{props.text}</span>
      </div>
    </div>
  );
}