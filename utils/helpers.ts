import { toast } from 'react-toastify'

import {
  EXPORT_MISSING_SWAP,
  INVALID,
  MISSING_QUOTE_FIXED,
  ORDER_ID,
  ORDER_STATUS,
  QUOTE_FAILED,
  REFERRAL_ID,
  SAME_ANONYMOUS,
  SEND_AMOUNT,
  SUPPORT,
  WRONG_PWD,
} from './constants'

export const validateWalletAddress = (addressTo: string, token: Token) => {
  let validator = token?.network?.addressValidation

  try {
    if (validator && validator.startsWith('^') && validator.endsWith('$')) {
      validator = new RegExp(validator.slice(1, -1)) as unknown as string
    }

    if ((validator as any) instanceof RegExp) {
      if (!addressTo.match(validator)) {
        return false
      }
    }
    return true
  } catch (error) {
    console.log('validateWalletAddress catch error: ', error, validator)
    return false
  }
}

export const fixedFloat = (val: any, digits = 4) => {
  const input = Number(val)
  const multiplier = parseInt((input * 10 ** digits).toString())
  return multiplier / 10 ** digits
}

export const getEllipsisTxt = (str: string, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`
  }
  return ''
}

export const getOrderStatusKey = (statusValue: number) => {
  const entry = Object.entries(ORDER_STATUS).find(
    ([key, value]) => value === statusValue,
  )
  return entry ? entry[0] : null // return the key if found, otherwise return null
}

export const copyText = (txt: string) => {
  var textField = document.createElement('textarea')
  textField.innerText = txt
  document.body.appendChild(textField)
  textField.select()
  document.execCommand('copy')
  textField.remove()
}

export const showMsg = (type, messageTemp, t, time = 5000) => {
  let message = ''
  let title = ''
  if (messageTemp === SUPPORT) {
    message = t('pleaseContactSupport')
    title = t('somethingWentWrong')
  }
  if (messageTemp === REFERRAL_ID) {
    message = t('checkAccount')
    title = t('invalidAccount')
  }
  if (messageTemp === INVALID) {
    message = t('inputReceiverAddress')
    title = t('invalidReceiverAddress')
  }
  if (messageTemp === SEND_AMOUNT) {
    message = t('invalidAmount')
  }
  if (messageTemp === ORDER_ID) {
    message = t('pleaseContactSupport')
    title = t('invalidOrderId')
  }
  if (messageTemp === QUOTE_FAILED) {
    message = t('quoteMessage')
    title = t('fetchFailed')
  }
  if (messageTemp === WRONG_PWD) {
    message = t('wrongPwd')
    title = t('pleaseTryAgain')
  }
  if (messageTemp === SAME_ANONYMOUS) {
    message = 'sameAnonymous'
    title = t('differentTokenPair')
  }

  if (messageTemp === MISSING_QUOTE_FIXED) {
    message = t('missingQuoteFixed')
    title = t('unableGetQuote')
  }

  if (messageTemp === EXPORT_MISSING_SWAP) {
    message = t('pleaseAddSwap')
    title = t('unableExport')
  }

  switch (type) {
    case 'success':
      toast.success(message, title, time)
      break
    case 'info':
      toast.info(message, title, time)
      break
    case 'warning':
      toast.warning(message, title, time)
      break
    case 'error':
      toast.error(message, title, time)
      break
    default:
      console.error('Invalid notification type')
  }
}
