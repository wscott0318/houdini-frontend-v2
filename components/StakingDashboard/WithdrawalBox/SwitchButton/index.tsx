import React, { useState } from 'react'

const SwitchButton = (props: any) => {
  const value = props.value
  return (
    <div
      className={
        value == 0
          ? `flex flex-row justify-start rounded-[120px] w-[35px] h-[26px] border-white border-2 custom-penalty-switch-button-gradient py-[2px] px-[2px]`
          : `flex flex-row justify-end rounded-[120px] w-[35px] h-[26px] border-white border-2 custom-nopenalty-switch-button-gradient py-[2px] px-[2px]`
      }
    >
      <button
        className="w-[18px] h-[18px] rounded-[7px] bg-white"
        onClick={() => {
          props.setValue(value == 0)
        }}
      />
    </div>
  )
}

export default SwitchButton
