import { useMutation } from '@apollo/client'
import { AnimatePresence, motion } from 'framer-motion'
import { CardComponent, Portal } from 'houdini-react-sdk'
import React, { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { CONFIRM_DEPOSIT } from '@/lib/apollo/query'
import { animation, showErrorMessage } from '@/utils/helpers'

export const ConfirmDeposit: React.FC<ConfirmDepositProps> = ({
  confirmDepositModal,
  setConfirmDepositModal,
  houdiniId,
}) => {
  const [txHash, setTxHash] = useState('')
  const { t } = useTranslation()

  const [confirmDeposit] = useMutation(CONFIRM_DEPOSIT, {
    variables: {
      hash: txHash,
      id: houdiniId,
    },
    onError: (err) => {
      showErrorMessage(err, t)
    },
    onCompleted: (data) => {
      const { confirmDeposit } = data
      if (confirmDeposit) {
        toast.success('Your request has been sent')
      } else {
        toast.error('Something went wrong. Please contact support!')
      }
    },
  })

  const handleConfirmDeposit = async () => {
    await confirmDeposit()

    setTxHash('')
    setConfirmDepositModal(false)
  }

  const handleCloseConfirmDepositModal = () => {
    setConfirmDepositModal(false)
  }

  return (
    <AnimatePresence>
      {confirmDepositModal ? (
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
                  setConfirmDepositModal(false)
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
                    Alert support automatically by sending in your tx hash here:
                  </h2>
                  <input
                    type="text"
                    className="w-full rounded-2xl border-[1px] border-white bg-inherit p-2.5 text-white"
                    placeholder="TX Hash"
                    id="houdini-search-v2"
                    value={txHash}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setTxHash(e.target.value)
                    }
                  />
                  <div className="mb-5 mt-4 flex w-full justify-center">
                    <button
                      className="mr-4 block rounded-full  border-2 border-white px-10 py-2 font-bold text-white"
                      onClick={handleCloseConfirmDepositModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="block rounded-full border-2 bg-white px-10 py-2 font-bold text-black"
                      onClick={handleConfirmDeposit}
                    >
                      Send TX Hash
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
