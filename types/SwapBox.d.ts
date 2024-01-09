interface SendReceiveInput {
  memoNeeded?: any
  name: string
  color: string
  value: string
  icon?: string
  displayName: string
}

interface SwapFormi18n {
  privateLeftText?: string
  privateRightText?: string
  variableLeftText?: string
  variableRightText?: string
  sendInputLabel?: string
  receiveInputLabel?: string
  sendCurrencyTitle?: string
  sendCurrencySubtitle?: string
  receiveCurrencyTitle?: string
  receiveCurrencySubtitle?: string
  receiverWalletLabel?: string
  receiverWalletPlaceholder?: string
}

interface Swapi18n extends SwapFormi18n {
  swapBoxTitle?: string
  swapBoxSubTitle?: string
  multiSendLeftText?: string
  multiSendRightText?: string
  saveOrderText?: string
  addSwapText?: string
  bottomText?: string
  accountId?: string
  proceedButtonText?: string
  priceQuoteError?: string
  missingQuoteFixesError?: string
  noSendAmountError?: string
  sendTokenNotFoundError?: string
  receiveTokenNotFoundError?: string
  emptyReceiverAddressError?: string
  invalidAddressError?: string
  tokenPairError?: string
  generalError?: string
  networkError?: string
  referalError?: string
}

interface Swap {
  maxAmount: number
  flipArrow: any
  destinationTag: string | number | readonly string[] | undefined
  minAmount: number
  id: string
  send: SendReceiveInput
  receive: SendReceiveInput
  anonymous?: boolean
  fixed?: boolean
  receiveAddress: string
  collapsed?: boolean
  direction: string
  anonymousToken: string
  partnerId: string | null
}

interface SwapBoxProps {
  i18n?: Swapi18n
}

interface SwapFormProps {
  i18n?: SwapFormi18n
}
