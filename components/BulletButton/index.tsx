import { ORDER_STEPS, OrderStep } from "@/utils/constants"
import { CheckedBullet, UncheckedBullet } from "../Svg"

interface BulletButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    checked: boolean
}

interface BulletButtonsProps {
    currentStep: OrderStep,
    setCurrentStep: Function
    order: any
    className?: string
}

export const BulletButton = ({ checked, disabled, ...props }: BulletButtonProps) =>
    <button disabled={disabled} {...props} className={disabled || checked ? `pointer-events-none ${disabled ? 'opacity-70' : ''}` : 'cursor-pointer'}>
        {checked ? <CheckedBullet /> : <UncheckedBullet />}
    </button>


export const BulletButtons = ({ currentStep, setCurrentStep, order, className }: BulletButtonsProps) =>
    <div className={`w-[40px] flex justify-between ${className || ''}`}>
        <BulletButton checked={currentStep === ORDER_STEPS.NEXT_STEP} onClick={() => { setCurrentStep(ORDER_STEPS.NEXT_STEP) }} />
        <BulletButton checked={currentStep === ORDER_STEPS.ORDER_DETAILS} onClick={() => { setCurrentStep(ORDER_STEPS.ORDER_DETAILS) }} />
    </div>
