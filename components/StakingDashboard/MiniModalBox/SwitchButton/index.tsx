import React, { useState } from 'react'

const SwitchButton = () => {
  const [value, setValue] = useState(0)

  return (
    <div className="flex flex-row justify-between rounded-[120px] h-[50px] bg-[#00000033]">
      <button
        className={
          value === 0
            ? 'text-[20px] text-[#ffffff] font-semibold justify-center items-center w-[142px] rounded-[120px] bg-gradient-to-b from-[#6C5DD3] to-[#4154C9]'
            : 'text-[#ffffff4d] justify-center items-center w-[142px]'
        }
        onClick={() => {
          if (value == 0) {
            setValue(1)
          }
        }}
      >
        Stake
      </button>
      <button
        className={
          value === 1
            ? 'text-[20px] text-[#ffffff] font-semibold justify-center items-center w-[142px] rounded-[120px] bg-gradient-to-b from-[#6C5DD3] to-[#4154C9]'
            : 'text-[#ffffff4d] justify-center items-center w-[142px]'
        }
        onClick={() => {
          if (value == 1) {
            setValue(0)
          }
        }}
      >
        Buy
      </button>
    </div>
  )
}

export default SwitchButton
