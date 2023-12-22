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
