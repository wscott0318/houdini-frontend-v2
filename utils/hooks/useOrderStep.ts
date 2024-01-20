import { useEffect, useState } from "react"
import { ORDER_STEPS, OrderStep } from "../constants"

export default function useOrderStep(order: any) {

    const defaultStep = order?.status > 0 ? ORDER_STEPS.ORDER_DETAILS : ORDER_STEPS.NEXT_STEP
    const [currentStep, setCurrentStep] = useState<OrderStep>(defaultStep)

    useEffect(() => {
        if (order?.status > 0) {
            setCurrentStep(ORDER_STEPS.ORDER_DETAILS)
        }
    }, [order?.status])

    return {
        currentStep,
        setCurrentStep
    }
}