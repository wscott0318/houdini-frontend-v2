import React, { useState } from 'react'

interface CTAButtonProps {
  width?: string,
  height: string,
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function CTAButton(props: CTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const width = props.width || 'auto';
  const handleMouseEnter = () => {
    setIsHovered(true);
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  }
  return (
    <div className={`p-[2px] rounded-[12px] custom-QTY-button-outline h-[${props.height}] w-[${props.width || 'auto'}]`}
      style={{cursor: 'pointer'}}
      onClick={props.onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`items-center justify-center px-[20px] py-[12px] rounded-[12px] bg-black text-[16px] font-semibold hover:custom-QTA-button-hover-background`}>
        {props.children}
      </div>
    </div>
  );
}