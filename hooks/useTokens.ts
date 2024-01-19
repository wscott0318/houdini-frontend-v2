import { useQuery } from '@apollo/client'
import React, { useCallback } from 'react'

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

  const findTokenBySymbol = useCallback(
    (symbol: string) => {
      if (!loading) {
        const tokens = tokensData?.tokens
        // setTokens(tokens)
        const token = tokens?.find((token: any) => token?.symbol === symbol)
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
    findTokenBySymbol,
    getTokenDetails,
  }
}
