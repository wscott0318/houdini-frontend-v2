import React from 'react'
import { toast } from 'react-toastify'

import {
  EXPORT_MISSING_SWAP,
  INVALID,
  MISSING_QUOTE_FIXED,
  ORDER_ID,
  ORDER_STATUS,
  ORDER_STATUS_FAKE,
  QUOTE_FAILED,
  REFERRAL_ID,
  SAME_ANONYMOUS,
  SEND_AMOUNT,
  SUPPORT,
  WRONG_PWD,
} from './constants'

export const validateWalletAddress = (addressTo: string, token: any) => {
  let validator = token?.network?.addressValidation
  try {
    validator = new RegExp(validator)

    if (validator instanceof RegExp) {
      if (addressTo && !addressTo.match(validator)) {
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

export const kformatter = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/

  const item = lookup
    .slice()
    .reverse()
    .find((currentItem) => num >= currentItem.value)

  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0'
}
export const copyText = (txt: string) => {
  var textField = document.createElement('textarea')
  textField.innerText = txt
  document.body.appendChild(textField)
  textField.select()
  document.execCommand('copy')
  textField.remove()
}

export const showMsg = (type: any, messageTemp: any, t: any, time = 5000) => {
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
      toast.success(message)
      break
    case 'info':
      toast.info(message)
      break
    case 'warning':
      toast.warning(message)
      break
    case 'error':
      toast.error(message)
      break
    default:
      console.error('Invalid notification type')
  }
}

// export const copyButton = (e: any, t: any) => {
//   return (
//     <img
//       className="track__copybutton"
//       src={copy}
//       alt={t('copy')}
//       onClick={() => callCopyFunc(e, t)}
//     />
//   );
// };

/**
 *
 * @param {ApolloError | {userMessage: string, requestId: string, code: string} } err
 * @param {number} timeout
 */
export const showErrorMessage = (err: any, t: any, timeout = 10000) => {
  const error =
    (err?.graphQLErrors ? err.graphQLErrors[0]?.extensions : err) || {}
  const { requestId, code, userMessage } = error
  let errorMessage = t(code) || t('somethingWentWrongContactSupport')
  ;('')
  if (code || requestId) {
    if (
      code === '50000' ||
      code === '50002' ||
      code === '50011' ||
      code === '50011' ||
      code.match(/^4.*/)
    ) {
      errorMessage = t(code)
    }
    errorMessage += ' ('
    if (requestId) {
      errorMessage += `${t('requestId')}: ${requestId}`
      if (code) {
        errorMessage += ', '
      }
    }
    if (code) {
      errorMessage += `${t('code')}: ${code}`
    }
    errorMessage += ')'
  }
  toast.error(
    requestId || code
      ? //   <span>
        //     {errorMessage} {copyButton(errorMessage, t)}
        //   </span>
        // ) : (
        errorMessage
      : // ),
        t('error'),
    t('error'),
  )
}

export const getTokenDetails = (tokens: any, symbol: string) =>
  (tokens as Token[])?.find((token: any) => token.id === symbol)

export const animation = {
  hidden: {
    y: '100%',
    transition: { duration: 0.3 },
  },
  visible: {
    y: '0',
    transition: { duration: 0.3 },
  },
}

export function formatNumberFromString(numberString: string) {
  const number = parseFloat(numberString)
  return !isNaN(number)
    ? number.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : ''
}
