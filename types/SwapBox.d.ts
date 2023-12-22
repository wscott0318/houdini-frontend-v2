interface SendReceiveInput {
  memoNeeded?: any
  name: string
  color: string
  value: string
  icon?: string
  displayName: string
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
