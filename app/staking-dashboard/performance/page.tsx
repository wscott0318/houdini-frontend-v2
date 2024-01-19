'use client'

import { useTranslation } from 'react-i18next'

import Performance from '@/components/Performance'
import StakingDashboardResponsivePage from '@/components/StakingDashboardResponsivePage'

export default function StakingDashboard() {
  const { t } = useTranslation()
  return (
    <StakingDashboardResponsivePage>
      <Performance />
    </StakingDashboardResponsivePage>
  )
}
