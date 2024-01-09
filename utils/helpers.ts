import { ORDER_STATUS } from './constants'

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
