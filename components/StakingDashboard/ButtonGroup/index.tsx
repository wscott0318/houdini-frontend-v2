import React, { useState } from 'react'

interface Props {
  names: string[]
  onSelect?: (name: string) => void
}

const ButtonGroup = ({ names, onSelect }: Props) => {
  const [selected, setSelected] = useState(0)
  return (
    <div className="flex flex-row justify-start gap-0 items-center max-w-[700px]">
      {names.map((name, index) => (
        <button
          key={index}
          className={
            selected == index
              ? `px-[10px] min-h-[60px] h-auto py-[5px] rounded-[20px] bg-gradient-to-b from-[#6C5DD3] to-[#4154C9]`
              : `px-[10px] min-h-[60px] h-auto py-[5px] rounded-[20px]`
          }
          onClick={() => {
            setSelected(index)
            onSelect(names[index])
          }}
        >
          <span
            className={
              selected != index
                ? `text-[14px] font-medium rainbow-text`
                : `text-[14px] font-medium text-[#fff]`
            }
          >
            {names[index]}
          </span>
        </button>
      ))}
    </div>
  )
}

export default ButtonGroup
