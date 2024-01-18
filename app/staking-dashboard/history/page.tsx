'use client'

import { useTranslation } from 'react-i18next'

import History from '@/components/History'
import StakingDashboardResponsivePage from '@/components/StakingDashboardResponsivePage'

export default function StakingDashboard() {
  const { t } = useTranslation()
  return (
    <StakingDashboardResponsivePage>
      <History />
    </StakingDashboardResponsivePage>
  )
}
