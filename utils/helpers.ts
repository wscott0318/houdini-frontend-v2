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
