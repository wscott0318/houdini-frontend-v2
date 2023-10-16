import { motion } from 'framer-motion'
import React from 'react'

export const Drawer: React.FC<{
  children: React.ReactNode
  setIsOpen: (value: boolean | ((prevState: boolean) => boolean)) => void
  isOpen?: boolean
}> = ({ children, setIsOpen, isOpen }) => {
  const drawerAnimation = {
    hidden: {
      x: '100%',
      transition: { duration: 0.3 },
    },
    visible: {
      x: '0',
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      exit="hidden"
      animate="visible"
      variants={drawerAnimation}
      className="fixed right-0 top-0 z-[100] flex h-screen w-full items-center justify-center bg-gray-500 bg-gray-500/50 drop-shadow-2xl backdrop-blur-[20px]"
    >
      <div className="relative flex h-full w-full flex-col items-center justify-start p-4 md:p-10">
        <div className="flex relative h-full w-full flex-row items-center justify-between md:mt-10">
          <button
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            className="text-white absolute right-0 top-0"
          >
            X
          </button>
          {children}
        </div>
      </div>
    </motion.div>
  )
}
