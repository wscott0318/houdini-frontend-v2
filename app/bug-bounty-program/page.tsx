'use client'

import { ResponsivePage } from '@/components/ResponsivePage'
import { useTranslation } from 'react-i18next'

export default function BugBountyProgram() {
  const { t } = useTranslation()
  return <ResponsivePage>{t('youAreAboutToResetText')}</ResponsivePage>
}
