import React, { useState } from 'react'

import { FCheckWhiteSvg } from '@/components/Svg'

const CheckBox = (props: any) => {
  return (
    <>
      {props.value == 1 ? (
        <button
          className="w-[20px] h-[20px] flex rounded-[4px] justify-center items-center bg-[#6C5DD3]"
          onClick={() => {
            props.setValue(0)
          }}
        >
          <FCheckWhiteSvg className="w-[10px] h-[8px]" />
        </button>
      ) : (
        <button
          className="w-[20px] h-[20px] rounded-[4px] justify-center items-center"
          onClick={() => {
            props.setValue(1)
          }}
        >
          <div className="w-[20px] h-[20px] border-[2px] border-white rounded-[4px]"></div>
        </button>
      )}
    </>
  )
}

export default CheckBox
