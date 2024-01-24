import { useQuery } from '@apollo/client'
import { useCallback } from 'react'

import { TOKENS_QUERY } from '@/lib/apollo/query'

export const useTokens = () => {
  const { data: tokensData, loading } = useQuery(TOKENS_QUERY)

  const getAddressUrl = (symbol: string) => {
    const token = ((tokensData?.tokens || []) as Token[]).find(
      (item) => item.id === symbol,
    )

    if (!token) {
      return ''
    }

    return token.network.addressUrl
  }

  const getExplorerUrl = (symbol: string) => {
    const token = ((tokensData?.tokens || []) as Token[]).find(
      (item) => item.id === symbol,
    )

    if (!token) {
      return ''
    }

    return token.network.explorerUrl
  }

  const findTokenById = useCallback(
    (symbol: string) => {
      if (!loading) {
        const tokens = tokensData?.tokens
        // setTokens(tokens)
        const token = tokens?.find((token: any) => token?.id === symbol)
        return token
          ? { displayName: token?.displayName, icon: token?.icon }
          : null
      }
      return { displayName: '', icon: '' }
    },
    [loading],
  )

  const getTokenDetails = (symbol: string) =>
    (tokensData?.tokens || []).find((token: any) => token.id === symbol)

  return {
    tokens: tokensData && tokensData.tokens ? tokensData.tokens : [],
    loading,
    getAddressUrl,
    findTokenById,
    getTokenDetails,
    getExplorerUrl,
  }
}
