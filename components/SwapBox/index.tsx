import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import {
  HoudiniButton,
  Refresh,
  SecondaryButton,
  SingleMultiSend,
} from 'houdini-react-sdk'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import uniqid from 'uniqid'

import { GeneralModal } from '@/components/GeneralModal'
import { IndustrialCounterLockup } from '@/components/GeneralModal/IndustrialCounterLockup'
import {
  CREATE_SHORT_URL_FORM,
  EXCHANGE_MUTATION,
  GET_NETWORKS,
  GET_SHORT_URL,
  MULTI_EXCHANGE_MUTATION,
  TOKENS_QUERY,
  createMultiplePriceQuery,
} from '@/lib/apollo/query'
import { EXPORT_MISSING_SWAP } from '@/utils/constants'
import { copyText, fixedFloat, validateWalletAddress } from '@/utils/helpers'

import { SwapForm } from './SwapForm'

const uuid = uniqid()

export const SwapBox: React.FC<SwapBoxProps> = ({ i18n }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()

  const locationParams = new URLSearchParams()
  const tokenIn = locationParams.get('tokenIn') ?? 'ETH'
  const tokenOut = locationParams.get('tokenOut') ?? 'BTC'
  const anonymous = locationParams.get('anonymous')
  const amount = locationParams.get('amount')
    ? parseFloat(locationParams.get('amount') as string)
    : ''
  const partnerId = locationParams.get('partnerId') ?? ''

  const initialInput = {
    value: amount.toString(),
    name: '',
    icon: '',
    color: '',
    displayName: '',
  }

  const isXMR = tokenIn === 'XMR' || tokenOut === 'XMR'

  const [direction, setDirection] = useState(false)
  const [isMulti, setIsMulti] = useState(false)
  const [importedSwaps, setImportedSwaps] = useState(false)

  const [initialSendInput, setInitialSendInput] = useState<SendReceiveInput>({
    ...initialInput,
    value: amount.toString(),
  })
  const [initialReceiveInput, setInitialReceiveInput] =
    useState<SendReceiveInput>({ ...initialInput, memoNeeded: false })

  const [currentSwap, setCurrentSwap] = useState<Swap | null>({
    send: { ...initialSendInput },
    receive: { ...initialReceiveInput },
    minAmount: 0,
    maxAmount: 0,
    receiveAddress: locationParams.get('receiveAddress') as string,
    anonymous: isXMR
      ? false
      : anonymous === null
        ? true
        : anonymous === 'true'
          ? true
          : false,
    flipArrow: false,
    collapsed: false,
    id: uuid,
    destinationTag: '',
    fixed: false,
    direction: 'from',
    anonymousToken: 'XMR',
    partnerId,
  })

  const [swaps, setSwaps] = useState<Swap[]>([
    {
      send: { ...initialSendInput },
      receive: { ...initialReceiveInput },
      minAmount: 0,
      maxAmount: 0,
      receiveAddress: locationParams.get('receiveAddress') as string,
      anonymous:
        anonymous === null ? true : anonymous === 'true' ? true : false,
      flipArrow: false,
      collapsed: false,
      id: uuid,
      destinationTag: '',
      fixed: false,
      direction: 'from',
      anonymousToken: 'XMR',
      partnerId,
    },
  ])

  const [debouncedSwaps, setDebouncedSwaps] = useState<Swap[]>([
    {
      send: { ...initialSendInput },
      receive: { ...initialReceiveInput },
      minAmount: 0,
      maxAmount: 0,
      receiveAddress: locationParams.get('receiveAddress') as string,
      anonymous:
        anonymous === null ? true : anonymous === 'true' ? true : false,
      flipArrow: false,
      collapsed: false,
      id: uuid,
      destinationTag: '',
      fixed: false,
      direction: 'from',
      anonymousToken: 'XMR',
      partnerId,
    },
  ])

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
  const [quoteQuery, setQuoteQuery] = useState(createMultiplePriceQuery(swaps))

  const [getShortUrl] = useLazyQuery(GET_SHORT_URL)

  const [handlePriceQuote, { loading: isPriceQuoting }] = useLazyQuery(
    quoteQuery,
    {
      onError: (err) => {
        toast.error(`${i18n?.priceQuoteError || 'Price quote error:'} ${err}`)
      },
      onCompleted: (data) => {
        Object.keys(data).map((key) => {
          const swapId = key.replace('quote_', '')
          const quote = data[key]?.quote
          const error = data[key].error

          if (error) {
            toast.error(error.message)

            return
          }

          swaps.forEach((swap) => {
            if (swap.id === swapId) {
              if (!quote) {
                if (
                  (data[key]?.error &&
                    swap.receive.value &&
                    swap.direction === 'to') ||
                  (swap.send.value && swap.direction === 'from')
                ) {
                  toast.error(data[key].error)

                  if (swap.fixed && swap.direction === 'to') {
                    swap.send.value = '0'
                  } else {
                    swap.receive.value = '0'
                  }

                  return
                }
              }
              const dataAmmountOut = quote?.amountOut
              const amountOut =
                dataAmmountOut !== undefined && dataAmmountOut !== -1
                  ? dataAmmountOut
                  : ''
              const minAmount = quote.min ?? 0
              const maxAmount = quote.max ?? 0

              swap.minAmount = minAmount
              swap.maxAmount = maxAmount

              if (swap.fixed && swap.direction === 'to') {
                const dataAmmountIn = quote.amountIn
                const amountIn =
                  dataAmmountIn !== undefined && dataAmmountIn !== -1
                    ? dataAmmountIn
                    : ''
                swap.send.value = fixedFloat(amountIn).toString()

                if (dataAmmountIn === -1) {
                  toast.error('missing quote fixes')
                }
              } else {
                if (swap.fixed && dataAmmountOut === -1) {
                  toast.error(
                    i18n?.missingQuoteFixesError || 'Missing quote fixes',
                  )
                }

                swap.receive.value = fixedFloat(amountOut).toString()
              }
            }
          })
        })
      },
    },
  )

  const [multi_exchange, { loading: isLoadingMultiExchange }] = useMutation(
    MULTI_EXCHANGE_MUTATION,
  )

  const [exchange, { loading: isLoadingExchange }] =
    useMutation(EXCHANGE_MUTATION)

  const [createShortUrl] = useMutation(CREATE_SHORT_URL_FORM)

  const handleExport = async () => {
    const exportSwaps = swaps.filter((swap: any) => {
      if (
        !swap.id ||
        !swap.send.value ||
        swap.send.value === '' ||
        !swap.receive.value ||
        swap.receive.value === '0' ||
        !swap.receiveAddress ||
        swap.receiveAddress === ''
      ) {
        return false
      }

      return true
    })

    if (exportSwaps.length < 1) {
      toast.warning(EXPORT_MISSING_SWAP)
      return
    }

    const res = await createShortUrl({
      variables: {
        data: {
          swaps: JSON.stringify(exportSwaps),
        },
      },
    })

    if (res?.data?.addShortUrl?.id) {
      const url = `${window.location.href}?swap=${res?.data?.addShortUrl?.id}`
      copyText(url)
      toast.success(t('copyToClipboard'))
    } else {
      toast.error(t('tryAgain'))
    }
  }

  const callPriceAPI = useCallback(async () => {
    if (isPriceQuoting) return

    if (
      currentSwap?.send?.name &&
      currentSwap?.receive?.name &&
      (parseFloat(currentSwap?.send?.value as string) > 0 ||
        (currentSwap?.direction === 'to' &&
          currentSwap.fixed &&
          parseFloat(currentSwap.receive.value) > 0))
    ) {
      handlePriceQuote({
        fetchPolicy: 'network-only',
        pollInterval: 30 * 1000, // Poll every 10 seconds
      })
    }
  }, [swaps])

  const APIcall = () => {
    if (isPriceQuoting) {
      return
    }

    const current = swaps[swaps.length - 1]

    if (
      (current.direction === 'from' &&
        (current.send.value === '' || current.send.value === '0')) ||
      (current.direction === 'to' &&
        (current.receive.value === '' || current.receive.value === '0'))
    ) {
      toast.warning(i18n?.noSendAmountError || 'Please enter send amount.')
    } else callPriceAPI()
  }

  useEffect(() => {
    if (importedSwaps === true || (tokenIn && tokenOut && amount)) {
      if (
        currentSwap?.send?.name &&
        currentSwap?.receive?.name &&
        (parseFloat(currentSwap?.send?.value as string) > 0 ||
          (currentSwap?.direction === 'to' &&
            currentSwap.fixed &&
            parseFloat(currentSwap.receive.value) > 0))
      ) {
        setTimeout(() => {
          handlePriceQuote({
            fetchPolicy: 'network-only',
            pollInterval: 30 * 1000, // Poll every 10 seconds
          })
        }, 3000)
      }
    }
  }, [swaps, importedSwaps])

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    setTimeoutId(
      setTimeout(() => {
        const canQuote = debouncedSwaps.find(
          (swap) => swap.send.value || swap.receive.value,
        )
        if (canQuote) {
          setSwaps(JSON.parse(JSON.stringify(debouncedSwaps)))
          setQuoteQuery(createMultiplePriceQuery(swaps))

          callPriceAPI()
        }
      }, 2000),
    )

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [debouncedSwaps])

  const { data: tokensData, loading } = useQuery(TOKENS_QUERY)
  const { data: networksData, loading: loadingNetworks } =
    useQuery(GET_NETWORKS)

  const tokens = tokensData?.tokens

  useEffect(() => {
    if (!tokens || tokens.length < 1) {
      return
    }

    ;(async () => {
      const queryString = searchParams.get('swap')
      if (queryString) {
        const res = await getShortUrl({
          variables: {
            id: queryString,
          },
        })

        if (res?.data?.getShortUrl?.swaps) {
          let swapsImport

          try {
            swapsImport = JSON.parse(res.data.getShortUrl.swaps)
            console.log('swapsImport', swapsImport)
          } catch (error) {
            return
          }

          if (swapsImport.length) {
            setCurrentSwap(swapsImport[swapsImport.length - 1])
            setIsMulti(swapsImport.length > 1 ? true : false)
            setSwaps(swapsImport)
            setDebouncedSwaps(swapsImport)
            setImportedSwaps(true)
          }
        }
      }
    })()
    setDebouncedSwaps(swaps)
  }, [tokens])

  useEffect(() => {
    if (tokens && tokens.length) {
      const defaultInToken = tokens.find((v: Token) => v.id === tokenIn)
      if (!defaultInToken) {
        toast.error(
          i18n?.sendTokenNotFoundError ||
            'Send token not found in the tokens list',
        )
      }

      const newIn: SendReceiveInput = {
        value: amount.toString(),
        name: defaultInToken.id,
        icon: defaultInToken.icon,
        color: defaultInToken.color,
        displayName: defaultInToken.displayName,
        memoNeeded: defaultInToken.network.memoNeeded,
      }
      setInitialSendInput(newIn)

      const defaultOutToken = tokens.find((v: Token) => v.id === tokenOut)

      if (!defaultOutToken) {
        toast.error(
          i18n?.receiveTokenNotFoundError ||
            'Receive token not found in the tokens list',
        )
      }

      const newOut: SendReceiveInput = {
        value: '0',
        name: defaultOutToken.id,
        icon: defaultOutToken.icon,
        color: defaultOutToken.color,
        displayName: defaultOutToken.displayName,
        memoNeeded: defaultOutToken.network.memoNeeded,
      }
      setInitialReceiveInput(newOut)

      const updatedSwaps = swaps.map((swap) => {
        swap.send = newIn
        swap.receive = newOut
        setCurrentSwap(swap)
        return { ...swap }
      })

      setSwaps(updatedSwaps)
    }
  }, [tokens])

  const handleArrows = (swapId: string) => {
    setDirection(!direction)

    const updatedSwaps = swaps.map((swap) => {
      if (swap.id === swapId) {
        const newSendInput = { ...swap.receive }
        const newReceiveInput = { ...swap.send }

        swap.send = newSendInput
        swap.receive = newReceiveInput
        swap.flipArrow = !swap.flipArrow

        setCurrentSwap(swap)
      }

      return { ...swap }
    })

    setSwaps(updatedSwaps)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    swapId: string,
    reverse = false,
  ) => {
    let inputStr = e.target.value
    if (e.target.value.includes('-')) return
    if (inputStr.charAt(0) === '.') inputStr = '0' + inputStr
    if (inputStr.charAt(0) === '0' && inputStr.charAt(1) !== '.') inputStr = '0'
    const rx_live = /^[+-]?\d*(?:[.]\d*)?$/

    if (rx_live.test(inputStr)) {
      const updatedSwaps = swaps.map((swap) => {
        if (swap.id === swapId) {
          if (reverse) {
            swap.receive.value = inputStr
            swap.direction = 'to'
          } else {
            swap.send.value = inputStr
            swap.direction = 'from'
          }
          setCurrentSwap(swap)
        }

        return { ...swap }
      })

      setDebouncedSwaps(updatedSwaps)
    }
  }

  const handleReceiveAddress = (value: string, swapId: string) => {
    const updatedSwaps = swaps.map((swap) => {
      if (swap.id === swapId) {
        swap.receiveAddress = value

        setCurrentSwap(swap)
      }

      return { ...swap }
    })

    setDebouncedSwaps(updatedSwaps)
  }

  const handleAddNewSwap = () => {
    const inputElem: HTMLElement | null =
      document.getElementById('receiver-address')

    if (currentSwap) {
      if (currentSwap.send.value === '') {
        toast.error(i18n?.noSendAmountError || 'Please enter send amount.')

        return
      }

      if (currentSwap.receiveAddress === '') {
        toast.error(
          i18n?.emptyReceiverAddressError || 'Receiver address is empty',
        )

        inputElem?.focus()

        return
      }

      const token = tokens?.find(
        (item: Token) => item.id === currentSwap.receive.name,
      )

      const validRes = validateWalletAddress(currentSwap.receiveAddress, token)

      if (!validRes) {
        toast.error(i18n?.invalidAddressError || 'Invalid address')

        inputElem?.focus()

        return
      }
    }

    const newSwap: Swap = {
      send: { ...initialSendInput },
      receive: { ...initialReceiveInput },
      minAmount: 0,
      maxAmount: 0,
      receiveAddress: '',
      anonymous: true,
      flipArrow: false,
      collapsed: false,
      destinationTag: '',
      id: uniqid(),
      direction: 'from',
      anonymousToken: 'XMR',
      partnerId,
    }

    setCurrentSwap(newSwap)

    const updatedSwaps = swaps.map((swap) => {
      swap.collapsed = true

      return { ...swap }
    })

    setSwaps([...updatedSwaps, newSwap])
  }

  const handleAnonymous = (swapId: string) => {
    if (
      currentSwap?.anonymous &&
      currentSwap.send.name === currentSwap.receive.name
    ) {
      toast.error(i18n?.tokenPairError || 'Please select a different pair')

      return
    }

    const updatedSwaps = swaps.map((swap) => {
      if (swap.id === swapId) {
        swap.anonymous = !swap.anonymous

        if (swap.direction === 'to' && swap.anonymous) {
          swap.direction = 'from'
        }

        setCurrentSwap(swap)
      }

      return { ...swap }
    })

    setDebouncedSwaps(updatedSwaps)
  }

  const handleVariableSwap = (swapId: string) => {
    const updatedSwaps = swaps.map((swap) => {
      if (swap.id === swapId) {
        // debugger
        swap.fixed = !swap.fixed

        if (!swap.fixed) {
          swap.direction = 'from'
        }

        setCurrentSwap(swap)
      }

      return { ...swap }
    })

    setDebouncedSwaps(updatedSwaps)
  }

  const handleMultiSend = () => {
    setIsMulti(!isMulti)
  }

  const selectCoin = (el: Token, field: string, swapId: string) => {
    const currentSwap: Swap = swaps.find((swap) => swap.id === swapId) as Swap

    if (
      field === 'send' &&
      !currentSwap.anonymous &&
      el.id === currentSwap.receive.name
    )
      return
    if (
      field !== 'send' &&
      !currentSwap.anonymous &&
      el.id === currentSwap.send.name
    )
      return

    const newInput = {
      name: el.id,
      icon: el?.icon,
      color: el.color,
      displayName: el.displayName,
      memoNeeded: el.network.memoNeeded,
    }

    const updatedSwaps = swaps.map((swap) => {
      if (swap.id === swapId) {
        if (field === 'send') {
          swap.send = { ...swap.send, ...newInput }
        } else {
          swap.receive = { ...swap.receive, ...newInput }
        }

        setCurrentSwap(swap)
      }

      return { ...swap }
    })

    setSwaps(updatedSwaps)
  }

  const handleDelete = (swapId: string) => {
    const filteredSwaps = swaps.filter((swap) => swap.id !== swapId)

    if (currentSwap?.id === swapId) {
      setCurrentSwap(null)
    }

    setSwaps(filteredSwaps)
  }

  const handleExpand = (swapId: string) => {
    const updatedSwaps = swaps
      .filter((swap) => swap.send.value)
      .map((swap) => {
        if (swap.id === swapId) {
          setCurrentSwap(swap)
          swap.collapsed = false
        } else {
          swap.collapsed = true
        }

        return { ...swap }
      })

    setSwaps([...updatedSwaps])
  }

  const disabledProceed =
    isLoadingMultiExchange ||
    isPriceQuoting ||
    isLoadingExchange ||
    !(currentSwap?.send.value && currentSwap.receiveAddress)

  const handleSwapProceed = async (isMulti: boolean) => {
    if (isMulti) {
      const orders = swaps.map((swap) => ({
        amount: parseFloat(swap.send.value),
        from: swap.send.name,
        to: swap.receive.name,
        addressTo: swap.receiveAddress,
        anonymous: swap.anonymous,
      }))

      const response = await multi_exchange({
        variables: { orders },
      })

      const multiId = response.data.multiExchange[0].order.multiId

      if (multiId) {
        router.push(`/order-details?multiId=${multiId}`)
      }
    } else {
      const order = {
        amount: parseFloat(swaps[0].send.value),
        from: swaps[0].send.name,
        to: swaps[0].receive.name,
        addressTo: swaps[0].receiveAddress,
        anonymous: swaps[0].anonymous,
      }

      const token = tokens?.find(
        (item: Token) => item.id === swaps[0].receive.name,
      )

      const validRes = validateWalletAddress(swaps[0].receiveAddress, token)

      if (!validRes) {
        toast.error(i18n?.invalidAddressError || 'Invalid address')

        return
      }

      const response = await exchange({
        variables: order,
      })

      const orderId = response.data.exchange.order.houdiniId

      if (orderId) {
        router.push(`/order-details?houdiniId=${orderId}`)
      }
    }
  }

  return (
    <div className="z-[1] flex flex-col justify-center items-center gap-2 w-full">
      <GeneralModal>
        <IndustrialCounterLockup>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center w-full gap-[16px]">
            <div className="flex flex-col justify-center items-center sm:items-start gap-[16px]">
              <div className="text-[28px] whitespace-nowrap sm:text-[34px] font-bold leading-[38px] text-white">
                {i18n?.swapBoxTitle || 'Swap-Send-Bridge'}
              </div>
              <div className="text-[15px] font-medium font-poppins rainbow-text">
                {i18n?.swapBoxSubTitle || 'Private, Compliant, No Sign Up'}
              </div>
            </div>
            <div className="flex gap-2">
              <SingleMultiSend
                multiSendText={i18n?.multiSendLeftText || 'Multi'}
                onChange={handleMultiSend}
                singleText={i18n?.multiSendRightText || 'Single'}
              />
              <Refresh animate={isPriceQuoting} onClick={APIcall} />
            </div>
          </div>

          {swaps.map((swap) => (
            <SwapForm
              key={`swap-${swap.id}`}
              swap={swap}
              handlePrivateSwap={handleAnonymous}
              handleVariableSwap={handleVariableSwap}
              loading={loading || loadingNetworks}
              tokens={tokensData?.tokens}
              networks={networksData?.networks}
              selectCoin={selectCoin}
              handleArrows={handleArrows}
              direction={direction}
              handleChange={handleChange}
              handleReceiveAddress={handleReceiveAddress}
              handleDelete={handleDelete}
              handleExpand={handleExpand}
              i18n={{
                privateLeftText: i18n?.privateLeftText,
                privateRightText: i18n?.privateRightText,
                variableLeftText: i18n?.variableLeftText,
                variableRightText: i18n?.variableRightText,
                sendInputLabel: i18n?.sendInputLabel,
                receiveInputLabel: i18n?.receiveInputLabel,
                sendCurrencyTitle: i18n?.sendCurrencyTitle,
                sendCurrencySubtitle: i18n?.sendCurrencySubtitle,
                receiveCurrencyTitle: i18n?.receiveCurrencyTitle,
                receiveCurrencySubtitle: i18n?.receiveCurrencySubtitle,
                receiverWalletLabel: i18n?.receiverWalletLabel,
                receiverWalletPlaceholder: i18n?.receiverWalletPlaceholder,
              }}
            />
          ))}

          {isMulti ? (
            <div className="flex justify-center md:justify-between w-full mt-2 flex-wrap items-center gap-2">
              <SecondaryButton
                text={i18n?.saveOrderText || 'Save order'}
                onClick={handleExport}
              />
              <SecondaryButton
                text={i18n?.addSwapText || 'Add swap'}
                onClick={handleAddNewSwap}
              />
            </div>
          ) : null}

          <div className="gradient-text my-[20px] font-medium text-xs font-poppins">
            {i18n?.bottomText ||
              'Only send To/From wallets. Transactions sent To/From smart contracts are not accepted'}
          </div>
          <HoudiniButton
            text={i18n?.proceedButtonText || 'Proceed'}
            onClick={() => {
              handleSwapProceed(isMulti)
            }}
            type={isMulti ? 'secondary' : 'primary'}
            disabled={disabledProceed}
          />
        </IndustrialCounterLockup>
      </GeneralModal>
    </div>
  )
}
