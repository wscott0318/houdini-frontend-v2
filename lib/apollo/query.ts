import { gql } from '@apollo/client'

// Queries
export const ACCOUNT_EXISTS_QUERY = gql`
  query accountExists($inputAccount: String!) {
    accountExists(inputAccount: $inputAccount)
  }
`

export const PRICE_QUOTE_QUERY = gql`
  query Quote(
    $anonymous: Boolean!
    $to: String!
    $from: String!
    $amount: Float!
  ) {
    quote(anonymous: $anonymous, to: $to, from: $from, amount: $amount) {
      quote {
        amountOut
        min
        max
      }
    }
  }
`

export const createMultiplePriceQuery = (swaps: any) => {
  const subQueries = swaps
    .map((swap: any, index: any) => {
      return `
      quote_${swap.id}: quote(
      anonymous: ${swap.anonymous},
      to: "${swap.receive.name}",
      from: "${swap.send.name}",
      amount: ${
        (swap.fixed && swap.direction === 'to'
          ? parseFloat(swap.receive.value)
          : parseFloat(swap.send.value)) || 0
      }
      fixed: ${swap.fixed || false}
      direction: "${swap.direction || 'from'}"
      anonymousToken: "${swap.anonymousToken || 'XMR'}"
      partnerId: "${swap.partnerId || null}"
    ) {
      quote{
        amountIn
        amountOut
        min
        max
      }
      error{
          message
          type
          requestId
          userMessage
          code
      }
    }
  `
    })
    .join('')

  return gql`query {
    ${subQueries}
  }`
}

export const GET_CREATED_QUERY = gql`
  query Status($id: String!) {
    status(id: $id) {
      created
      status
    }
  }
`
export const STATUS_QUERY = gql`
  query Status($id: String!) {
    status(id: $id) {
      houdiniId
      created
      senderAddress
      receiverAddress
      status
      anonymous
      expires
      inAmount
      inSymbol
      outAmount
      outSymbol
      senderTag
      hashUrl
      fixed
      direction
      transactionHash
      notified
      eta
      inAmountUsd
    }
  }
`

export const createMultipleStatusQuery = (orderIds: any) => {
  const subQueries = orderIds
    .map(
      (orderId: any, index: any) => `
    status_${orderId.id}: status(
      id: "${orderId.houdiniId}"
    ) {
      houdiniId
      created
      senderAddress
      receiverAddress
      status
      anonymous
      expires
      inAmount
      inSymbol
      outAmount
      outSymbol
      senderTag
      hashUrl
      fixed
      direction
      transactionHash
      notified
      eta
    }
  `,
    )
    .join('')

  return gql`query {
    ${subQueries}
  }`
}

export const CONFIG_QUERY = gql`
  query config($key: String!) {
    config(key: $key) {
      value
    }
  }
`

export const ARTICLES_QUERY = gql`
  query articles {
    articles {
      id
      title
      subtitle
      url
      imageLink
      published
    }
  }
`

// Mutations

export const createMultipleExchange = (
  swaps: any,
  walletId: any,
  widgetMode: any,
  partnerId: any,
) => {
  const filteredSwaps = [...swaps]
  if (swaps.length > 1 && !swaps[swaps.length - 1].send.value) {
    filteredSwaps.pop()
  }

  const subMutations = filteredSwaps
    .map((swap) => {
      return `
    exchange_${swap.id}: exchange(
      addressTo: "${swap.receiveAddress || 'nan'}"
      anonymous: ${swap.anonymous}
      to: "${swap.receive.name}"
      from: "${swap.send.name}"
      amount: ${parseFloat(
        swap.direction === 'to' && swap.fixed
          ? swap.receive.value
          : swap.send.value,
      )}
      ${walletId !== '' ? `walletId: "${walletId}"` : ''}
      destinationTag: "${swap.destinationTag}"
      fixed: ${swap.fixed || false}
      direction: "${swap.direction || 'from'}"
      widgetMode: ${widgetMode || false}
      anonymousToken: "${swap.anonymousToken || 'XMR'}"
      partnerId: "${partnerId || null}"
    ) {
      order{
        houdiniId
      }
      error{
        message
        type
        requestId
        userMessage
        code
      }
    }
  `
    })
    .join('')

  return gql`mutation {
    ${subMutations}
  }`
}

export const ERASE_ORDER_MUTATION = gql`
  mutation easeOrder($id: String!) {
    eraseOrder(id: $id)
  }
`

export const TOKENS_QUERY = gql`
  query tokens {
    tokens {
      id
      name
      network {
        name
        shortName
        addressValidation
        memoNeeded
        explorerUrl
        addressUrl
      }
      symbol
      color
      keyword
      displayName
      icon
      address
      chain
    }
  }
`

export const SEND_BUG_MUTATION = gql`
  mutation sendBug(
    $email: String!
    $telegram: String!
    $discord: String!
    $twitter: String!
    $description: String!
    $files: [Upload!]!
  ) {
    sendBug(
      email: $email
      telegram: $telegram
      discord: $discord
      twitter: $twitter
      description: $description
      files: $files
    )
  }
`

export const CONFIRM_DEPOSIT = gql`
  mutation confirmDeposit($hash: String!, $id: String!) {
    confirmDeposit(hash: $hash, id: $id)
  }
`

export const SEND_CONTACT_FORM = gql`
  mutation sendContact(
    $email: String!
    $telegram: String!
    $discord: String!
    $twitter: String!
    $website: String!
    $description: String!
    $referral: String!
    $token: String!
    $tokenChain: String!
  ) {
    sendContact(
      email: $email
      telegram: $telegram
      discord: $discord
      twitter: $twitter
      website: $website
      description: $description
      referral: $referral
      token: $token
      tokenChain: $tokenChain
    )
  }
`

export const CREATE_SHORT_URL_FORM = gql`
  mutation createShortUrl($data: ShortUrlInput!) {
    addShortUrl(data: $data) {
      id
    }
  }
`

export const GET_SHORT_URL = gql`
  query getShortUrl($id: String!) {
    getShortUrl(id: $id) {
      swaps
    }
  }
`

export const GET_USD_PRICE = gql`
  query getUsdPrice($from: String!) {
    usdPrice(from: $from)
  }
`

export const GET_NETWORKS = gql`
  query networks {
    networks {
      name
      shortName
      icon
    }
  }
`
export const MULTI_EXCHANGE_MUTATION = gql`
  mutation multiExchange($orders: [OrderInput!]!) {
    multiExchange(orders: $orders) {
      order {
        houdiniId
        created
        modified
        senderAddress
        receiverAddress
        status
        anonymous
        expires
        inAmount
        inSymbol
        outAmount
        outSymbol
        inCreated
        outCreated
        multiId
      }
    }
  }
`

export const MULTI_STATUS_QUERY = gql`
  query multiStatus($multiId: String!) {
    multiStatus(multiId: $multiId) {
      houdiniId
      created
      modified
      senderAddress
      receiverAddress
      status
      anonymous
      expires
      inAmount
      inSymbol
      outAmount
      outSymbol
      inCreated
      outCreated
      multiId
      eta
    }
  }
`

export const RETRY_MULTI_ORDER_MUTATION = gql`
  mutation retryMultiOrder($id: String!) {
    retryMultiOrder(id: $id)
  }
`

export const TOTAL_VOLUME_QUERY = gql`
  query totalVolume {
    totalVolume {
      count
      totalTransactedUSD
      totalBuyback
    }
  }
`
export const EXCHANGE_MUTATION = gql`
  mutation exchange(
    $amount: Float!
    $from: String!
    $to: String!
    $addressTo: String!
    $anonymous: Boolean!
  ) {
    exchange(
      amount: $amount
      from: $from
      to: $to
      addressTo: $addressTo
      anonymous: $anonymous
    ) {
      order {
        houdiniId
        created
        modified
        senderAddress
        receiverAddress
        status
        anonymous
        expires
        inAmount
        inSymbol
        outAmount
        outSymbol
        inCreated
        outCreated
      }
    }
  }
`


export const PERFORMANCE_STATS_QUERY = gql`
query totalVolume {
 totalVolume: totalVolume {
   count, totalTransactedUSD, totalBuyback, totalBuybackUSD
  }
  lastMonth: totalVolume(lastMonth:true) {
   count, totalTransactedUSD, totalBuyback, totalBuybackUSD
  }
  lastWeek: totalVolume(lastWeek:true) {
   count, totalTransactedUSD, totalBuyback, totalBuybackUSD
  }
}
`;