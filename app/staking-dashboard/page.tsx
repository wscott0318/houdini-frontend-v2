'use client'

import { useTranslation } from 'react-i18next'

import Dashboard from '@/components/Dashboard'
import StakingDashboardResponsivePage from '@/components/StakingDashboardResponsivePage'

export default function StakingDashboard() {
  const { t } = useTranslation()
  return (
    <StakingDashboardResponsivePage>
      <Dashboard />
    </StakingDashboardResponsivePage>
  )
}
