import { ORDER_STATUS, ORDER_STEPS, OrderStep } from '@/utils/constants'

import { CheckedBullet, UncheckedBullet } from '../Svg'

interface BulletButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean
  order: any
  currentStep: OrderStep
}

interface BulletButtonsProps {
  currentStep: OrderStep
  setCurrentStep: Function
  order: any
  className?: string
}

export const BulletButton = ({
  checked,
  disabled,
  order,
  currentStep,
  ...props
}: BulletButtonProps) => (
  <button
    disabled={disabled}
    {...props}
    className={
      disabled || checked
        ? `pointer-events-none ${disabled ? 'opacity-70' : ''}`
        : 'cursor-pointer'
    }
  >
    {checked ? (
      <CheckedBullet
        className={`${
          order?.status > ORDER_STATUS.WAITING ||
          order?.status === ORDER_STATUS.FINISHED
            ? 'fill-[#27C100]'
            : 'fill-white animate-pulse'
        }`}
      />
    ) : (
      <UncheckedBullet className={`fill-white`} />
    )}
  </button>
)

export const BulletButtons = ({
  currentStep,
  setCurrentStep,
  order,
  className,
}: BulletButtonsProps) => (
  <div className={`w-[40px] flex justify-between ${className || ''}`}>
    <BulletButton
      currentStep={currentStep}
      order={order}
      checked={currentStep === ORDER_STEPS.NEXT_STEP}
      onClick={() => {
        setCurrentStep(ORDER_STEPS.NEXT_STEP)
      }}
    />
    <BulletButton
      currentStep={currentStep}
      order={order}
      checked={currentStep === ORDER_STEPS.ORDER_DETAILS}
      onClick={() => {
        setCurrentStep(ORDER_STEPS.ORDER_DETAILS)
      }}
    />
  </div>
)
