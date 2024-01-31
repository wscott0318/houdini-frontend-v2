import { AnimatePresence, motion } from 'framer-motion'
import { Portal } from 'houdini-react-sdk'
import { useState } from 'react'

import { animation } from '@/utils/helpers'

interface StepComponent {
  Component: React.ComponentType<any>
  key: string
  props?: CustomProps
}

interface StateMachineProps {
  steps: StepComponent[]
  isOpen: boolean
  onClose: () => void
  stateMachine: { [key: string]: { next: string; previous: string } }
  maxStep: number
  minStep: number
}

interface CustomProps {
  user?: any
  timeLeft?: any
  address?: any
  setIsPenalty?: any
  setUnlockRequested?: any
  unlockRequested?: boolean
}

const StateMachine = ({
  steps,
  isOpen,
  onClose,
  stateMachine,
  maxStep,
  minStep,
}: StateMachineProps) => {
  const initialState = {
    step: 0,
  }

  const [state, setState] = useState(initialState)

  const currentState = `step${state.step}`

  const handleNext = () => {
    const nextState = stateMachine[currentState]?.next ?? ''
    const nextStep = parseInt(nextState.slice(-1), 10)

    setState({
      step: Math.min(nextStep, maxStep),
    })
  }

  const handlePrevious = () => {
    const previousState = stateMachine[currentState]?.previous ?? ''
    const previousStep = parseInt(previousState.slice(-1), 10)

    setState({
      step: Math.max(previousStep, minStep),
    })
  }

  const handleResetState = () => {
    setState(initialState)
  }

  const handleClose = () => {
    onClose()
    handleResetState?.()
  }

  const { Component, props: componentProps } = steps[state.step]

  return (
    <>
      {isOpen && (
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
              <div
                onClick={(e) => {
                  const target = e.target as HTMLElement
                  if (target.id === 'dropdownClickable') {
                    e.preventDefault()
                    handleClose()
                  }
                }}
                className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 drop-shadow-2xl backdrop-blur-[5px]"
              >
                <div
                  id="dropdownClickable"
                  className="flex relative min-h-full items-start justify-center sm:items-center p-6 md:p-0"
                >
                  <div className="flex flex-col xl:flex-row justify-center items-start gap-[56px]">
                    <Component
                      handleNext={handleNext}
                      handlePrevious={handlePrevious}
                      handleClose={handleClose}
                      handleResetState={handleResetState}
                      {...componentProps}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </Portal>
        </AnimatePresence>
      )}
    </>
  )
}

export default StateMachine
