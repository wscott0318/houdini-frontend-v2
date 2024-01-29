'use client'

import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { CONFIG_QUERY } from '@/lib/apollo/query'
import { MESSAGE1, MESSAGE2, MESSAGE3 } from '@/utils/constants'

import { Footer } from '../Footer'
import { Header } from '../Header'
import Maintenance from '../Maintenance'

export function ResponsiveContainer({ children }: LayoutProps) {
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  const msgArr = [MESSAGE1, MESSAGE2, MESSAGE3]

  const { loading: mtnStatusLoading, data: mtnStatusData } = useQuery(
    CONFIG_QUERY,
    {
      variables: {
        key: 'maintenance_status',
      },
    },
  )

  const { loading: warningStatusLoading, data: warningStatusData } = useQuery(
    CONFIG_QUERY,
    {
      variables: {
        key: 'warning_msg_status',
      },
    },
  )

  useEffect(() => {
    if (!mtnStatusLoading && mtnStatusData) {
      setMaintenanceMode(mtnStatusData.config.value === 'true' ? true : false)
    }
  }, [mtnStatusLoading])

  useEffect(() => {
    if (!warningStatusLoading && warningStatusData) {
      const warningStatusValue = warningStatusData.config.value.split('_')
      if (warningStatusValue[0] === 'true') {
        toast.warn(msgArr[parseInt(warningStatusValue[1]) - 1])
      }
    }
  }, [warningStatusLoading])

  return (
    // overflow-auto max-h-[100vh]
    <main className="grid grid-cols-1 gap-4 pt-4 px-2 sm:pt-10 sm:px-4 lg:px-10">
      {!maintenanceMode ? (
        <>{children}</>
      ) : (
        <>
          <Header />
          <Maintenance />
        </>
      )}
    </main>
  )
}
