import { AnimatePresence, motion } from 'framer-motion'
import { Portal } from 'houdini-react-sdk'
import Image from 'next/image'

import loadingImg from '@/assets/reinvested.png'

export const Loading = () => {
  const animation = {
    hidden: {
      y: '100%',
      transition: { duration: 0.1 },
    },
    visible: {
      y: '0',
      transition: { duration: 0.1 },
    },
  }

  return (
    <AnimatePresence>
      <Portal>
        <motion.div
          className="z-10 fixed left-0 top-0 w-screen h-screen"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          initial="hidden"
          exit="hidden"
          animate="visible"
          variants={animation}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 drop-shadow-2xl backdrop-blur-[5px]">
            <div
              id="dropdownClickable"
              className="flex relative min-h-full items-end justify-center sm:items-center p-6 md:p-0"
            >
              <Image
                src={loadingImg}
                alt="loading spinner"
                className="animate-spin"
              />
            </div>
          </div>
        </motion.div>
      </Portal>
    </AnimatePresence>
  )
}
