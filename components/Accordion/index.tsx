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
    <div className="w-[1000px] flex flex-col border-b border-white">
      <button
        type="button"
        onClick={() => {
          console.log('clicked')
          setIsActive(!isActive)
        }}
        className={`flex items-center justify-between w-full py-5 font-medium text-left text-white`}
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
        <div className="p-5">{content}</div>
      </motion.div>
    </div>
  )
}
