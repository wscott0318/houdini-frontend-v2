interface Token {
  id: string
  name: string
  symbol: string
  network: {
    name: string
    shortName: string
    addressValidation: string
    memoNeeded: boolean
    hashUrl?: string
    explorerUrl: string
    addressUrl: string
  }
  color: string
  keyword: string
  displayName: string
  icon?: string
  hasFixed?: boolean
  hasFixedReverse?: boolean
  address: `0x${string}` | string | null
  chain?: number
}
