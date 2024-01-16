'use client'

import { useTranslation } from 'react-i18next'

import Notification from '@/components/Notification'
import StakingDashboardResponsivePage from '@/components/StakingDashboardResponsivePage'

export default function StakingDashboard() {
  const { t } = useTranslation()
  return (
    <StakingDashboardResponsivePage>
      <Notification />
    </StakingDashboardResponsivePage>
  )
}
