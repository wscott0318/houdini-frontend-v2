import i18n from '@/app/i18n'

export const MESSAGE1 =
  'HoudiniSwap is experiencing longer than usual swap times. Please be prepared for your swap to take up to one-hour to process. We apologize for the inconvenience.'
export const MESSAGE2 =
  'Cryptocurrencies are broadly experiencing high volatility. If prices are affected during the time it takes to process your transaction, the amount you may receive more or less than the amount initially quoted.'
export const MESSAGE3 =
  'Please note, the transaction status icons are not functioning properly. Your transaction is safe! Contact support with any questions.'
export const WHITE_PAPER = process.env.REACT_APP_WHITE_PAPER

export const QUOTE_FAILED = 'quoteFailed'
export const SUPPORT = 'support'
export const REFERRAL_ID = 'referralID'
export const INVALID = 'invalid'
export const SEND_AMOUNT = 'sendAmount'
export const ORDER_ID = 'orderId'
export const SAME_ANONYMOUS = 'sameAnonymous'
export const WRONG_PWD = 'wrongPwd'
export const MISSING_QUOTE_FIXED = 'missingQuoteFixed'
export const EXPORT_MISSING_SWAP = 'exportMissingSwap'

export const poofLink =
  'https://app.uniswap.org/#/swap?outputCurrency=0x888cea2bbdd5d47a4032cf63668d7525c74af57a'
export const stakingLink = 'https://staking.houdiniswap.com/'

export const swapFormi18n = {
  privateLeftText: i18n.t('privateLeftText') as string,
  privateRightText: i18n.t('privateRightText') as string,
  variableLeftText: i18n.t('variableLeftText') as string,
  variableRightText: i18n.t('variableRightText') as string,
  sendInputLabel: i18n.t('sendInputLabel') as string,
  receiveInputLabel: i18n.t('receiveInputLabel') as string,
  sendCurrencyTitle: i18n.t('sendCurrencyTitle') as string,
  sendCurrencySubtitle: i18n.t('sendCurrencySubtitle') as string,
  receiveCurrencyTitle: i18n.t('receiveCurrencyTitle') as string,
  receiveCurrencySubtitle: i18n.t('receiveCurrencySubtitle') as string,
  receiverWalletLabel: i18n.t('receiverWalletLabel') as string,
  receiverWalletPlaceholder: i18n.t('receiverWalletPlaceholder') as string,
}

export const swapi18n = {
  swapBoxTitle: i18n.t('swapBoxTitle') as string,
  swapBoxSubTitle: i18n.t('swapBoxSubTitle') as string,
  multiSendLeftText: i18n.t('multiSendLeftText') as string,
  multiSendRightText: i18n.t('multiSendRightText') as string,
  saveOrderText: i18n.t('saveOrderText') as string,
  addSwapText: i18n.t('addSwapText') as string,
  bottomText: i18n.t('bottomText') as string,
  proceedButtonText: i18n.t('proceedButtonText') as string,
  priceQuoteError: i18n.t('priceQuoteError') as string,
  missingQuoteFixesError: i18n.t('missingQuoteFixesError') as string,
  noSendAmountError: i18n.t('noSendAmountError') as string,
  sendTokenNotFoundError: i18n.t('sendTokenNotFoundError') as string,
  receiveTokenNotFoundError: i18n.t('receiveTokenNotFoundError') as string,
  emptyReceiverAddressError: i18n.t('emptyReceiverAddressError') as string,
  invalidAddressError: i18n.t('invalidAddressError') as string,
  tokenPairError: i18n.t('tokenPairError') as string,
}

export const ORDER_STATUS = {
  NEW: -1,
  WAITING: 0,
  CONFIRMING: 1,
  EXCHANGING: 2,
  ANONYMIZING: 3,
  FINISHED: 4,
  EXPIRED: 5,
  FAILED: 6,
  REFUNDED: 7,
  DELETED: 8,
}
