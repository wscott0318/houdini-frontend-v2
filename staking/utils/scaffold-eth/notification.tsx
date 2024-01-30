import { XMarkIcon } from '@heroicons/react/20/solid'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid'
import React, { useEffect } from 'react'
import { toast as HotToast, ToastPosition } from 'react-hot-toast'
import { toast } from 'react-toastify'

type NotificationProps = {
  content: React.ReactNode
  status: 'success' | 'info' | 'loading' | 'error' | 'warning'
  duration?: number
  icon?: string
  position?: ToastPosition
}

type NotificationOptions = {
  duration?: number
  icon?: string
  position?: ToastPosition
}

const ENUM_STATUSES = {
  success: <CheckCircleIcon className="w-7 text-success" />,
  loading:  <div className='block'><svg aria-hidden="true" className="w-7 h-7 text-gray-200 animate-spin dark:text-gray-500 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg></div>,
  error: <ExclamationCircleIcon className="w-7 text-error" />,
  info: <InformationCircleIcon className="w-7 text-info" />,
  warning: <ExclamationTriangleIcon className="w-7 text-warning" />,
}

const DEFAULT_DURATION = 3000
const DEFAULT_POSITION: ToastPosition = 'top-center'

/**
 * Custom Notification
 */
const Notification = ({
  content,
  status,
  duration = DEFAULT_DURATION,
  icon,
  position = DEFAULT_POSITION,
}: NotificationProps) => {
  let style = ''
  if (status === 'success') {
    style = 'bg-green-500 text-white'
  } else if (status === 'info') {
    style = 'bg-blue-500 text-white'
  } else if (status === 'warning') {
    style = 'bg-yellow-500 text-white'
  } else if (status === 'error') {
    style = 'bg-red-500 text-white'
  } else if (status === 'loading') {
    style = 'bg-gray-500 text-white'
  }

  return HotToast.custom(
    (t) => (
      <div
        className={`${style} bg-opacity-75 flex flex-row items-start justify-between max-w-sm rounded-xl shadow-center shadow-accent bg-base-200 p-4 transform-gpu relative transition-all duration-500 ease-in-out space-x-2
        ${
          position.substring(0, 3) == 'top'
            ? `hover:translate-y-1 ${t.visible ? 'top-0' : '-top-96'}`
            : `hover:-translate-y-1 ${t.visible ? 'bottom-0' : '-bottom-96'}`
        }`}
      >
        <div className="leading-[0] self-center">
          {icon ? icon : ENUM_STATUSES[status]}
        </div>
        <div
          className={`overflow-x-hidden break-words whitespace-pre-line ${
            icon ? 'mt-1' : ''
          }`}
        >
          {content}
        </div>

        <div
          className={`cursor-pointertext-lg ${icon ? 'mt-0' : ''}`}
          onClick={() => toast.dismiss(t.id)}
        >
          <XMarkIcon
            className="w-6 ml-5 cursor-pointer"
            onClick={() => HotToast.remove(t.id)}
          />
        </div>
      </div>
    ),
    {
      duration: status === 'loading' ? Infinity : duration,
      position,
    },
  )
}

export const notification = {
  success: (content: React.ReactNode, options?: NotificationOptions) => {
    return Notification({ content, status: 'success', ...options })
  },
  info: (content: React.ReactNode, options?: NotificationOptions) => {
    return Notification({ content, status: 'info', ...options })
  },
  warning: (content: React.ReactNode, options?: NotificationOptions) => {
    return Notification({ content, status: 'warning', ...options })
  },
  error: (content: React.ReactNode, options?: NotificationOptions) => {
    return Notification({ content, status: 'error', ...options })
  },
  loading: (content: React.ReactNode, options?: NotificationOptions) => {
    return Notification({ content, status: 'loading', ...options })
  },
  remove: (toastId: string) => {
    HotToast.remove(toastId)
  },
}
