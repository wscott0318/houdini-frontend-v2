import { motion } from 'framer-motion'
import { useState } from 'react'

import { AddSvg } from '../Svg'

export const Accordion = ({
  title,
  content,
}: {
  title: string
  content: React.ReactNode
}) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="w-[1300px] flex flex-col">
      <button
        type="button"
        onClick={() => {
          console.log('clicked')
          setIsActive(!isActive)
        }}
        className={`${
          isActive ? 'border-transparent' : 'border-white'
        } flex items-center justify-between w-full py-5 font-medium text-left text-white border-b`}
      >
        <span className="text-[22px] leading-[33px]">{title}</span>
        <AddSvg className="w-7 h-7 rounded-lg" />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isActive ? 'auto' : 0 }}
        transition={{ duration: 0.25 }}
        className={`overflow-hidden`}
      >
        <div className="p-5 border-b border-white">{content}</div>
      </motion.div>
    </div>
  )
}
