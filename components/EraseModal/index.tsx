import { useMutation } from '@apollo/client'
import { AnimatePresence, motion } from 'framer-motion'
import { CardComponent, Portal } from 'houdini-react-sdk'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { ERASE_ORDER_MUTATION } from '@/lib/apollo/query'
import { animation, showErrorMessage } from '@/utils/helpers'

export const EraseOrder: React.FC<DeleteOrderProps> = ({
  eraseModal,
  setEraseModal,
  houdiniId,
}) => {
  const { t } = useTranslation()

  const handleCloseEraseModal = () => {
    setEraseModal(false)
  }

  const [eraseOrderMutation] = useMutation(ERASE_ORDER_MUTATION, {
    onError: (err) => {
      // setIsLoading(false);
      setEraseModal(false)
      showErrorMessage(err, t)
    },
    onCompleted: () => {
      // setIsLoading(false)
      toast.success(t('successfullyErased'))
    },
  })

  const handleErase = async () => {
    // setIsLoading(true)
    try {
      setEraseModal(false)
      const params = {
        id: houdiniId,
      }
      await eraseOrderMutation({ variables: params })
      // await refetch()
    } catch (error) {
      console.log('Something went wrong with handleErase')
    } finally {
      // setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {eraseModal ? (
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
            <div
              onClick={(e) => {
                e.preventDefault()
                const target = e.target as HTMLElement
                if (target.id === 'dropdownClickable') {
                  setEraseModal(false)
                }
              }}
              className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 drop-shadow-2xl backdrop-blur-[5px]"
            >
              <div
                id="dropdownClickable"
                className="flex relative min-h-full items-end justify-center sm:items-center p-6 md:p-0"
              >
                <CardComponent>
                  <h2 className="mt-4 text-center text-xl font-bold text-white">
                    Are you sure you want to erase?
                  </h2>
                  <div className="mb-5 mt-8 flex w-full justify-center">
                    <button
                      className="mr-4 block rounded-full  border-2 border-white px-10 py-2 font-bold text-white"
                      onClick={handleCloseEraseModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="block rounded-full border-2 bg-white px-10 py-2 font-bold text-black"
                      onClick={handleErase}
                    >
                      Erase
                    </button>
                  </div>
                </CardComponent>
              </div>
            </div>
          </motion.div>
        </Portal>
      ) : null}
    </AnimatePresence>
  )
}
