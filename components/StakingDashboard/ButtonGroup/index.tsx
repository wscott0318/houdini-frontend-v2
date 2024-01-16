import React, { Component, useState } from 'react'

interface Props {
  names: string[]
}

const ButtonGroup = ({ names }: Props) => {
  const [selected, setSelected] = useState(0)
  return (
    <div className="flex flex-row">
      {names.map((name, index) => (
        <button
          key={index}
          className={
            selected == index
              ? `px-[30px] py-[10px] rounded-[20px] bg-gradient-to-b from-[#6C5DD3] to-[#4154C9]`
              : `px-[30px] py-[10px] rounded-[20px]`
          }
          onClick={() => {
            setSelected(index)
          }}
        >
          <span
            className={
              selected != index
                ? `text-[18px] font-medium rainbow-text`
                : `text-[18px] font-medium text-[#fff]`
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
