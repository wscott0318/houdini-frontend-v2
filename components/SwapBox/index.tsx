import { useLazyQuery, useQuery } from '@apollo/client'
import {
  CheckBox,
  Dropdown,
  HoudiniButton,
  SecondaryButton,
  SingleMultiSend,
  TextField,
} from 'houdini-react-sdk'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import uniqid from 'uniqid'

import upDown from '@/assets/up-down.png'
import { GeneralModal } from '@/components/GeneralModal'
import { IndustrialCounterLockup } from '@/components/GeneralModal/IndustrialCounterLockup'
import {
  GET_NETWORKS,
  TOKENS_QUERY,
  createMultiplePriceQuery,
} from '@/lib/apollo/query'
import { fixedFloat, validateWalletAddress } from '@/utils/helpers'

import { SwapForm } from './SwapForm'

const uuid = uniqid()

export const SwapBox = () => {
  const router = useRouter()

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

  const [privateSwap, setPrivate] = useState(false)
  const [variableSwap, setVariable] = useState(false)
  const [direction, setDirection] = useState(false)
  const [isMulti, setIsMulti] = useState(false)

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

  const [handlePriceQuote, { loading: isPriceQuoting }] = useLazyQuery(
    quoteQuery,
    {
      onError: (err) => {
        console.error('price quote error', err)
      },
      onCompleted: (data) => {
        Object.keys(data).map((key) => {
          const swapId = key.replace('quote_', '')
          const quote = data[key]?.quote
          swaps.forEach((swap) => {
            if (swap.id === swapId) {
              if (!quote) {
                // @Matomo
                if (
                  (data[key]?.error &&
                    swap.receive.value &&
                    swap.direction === 'to') ||
                  (swap.send.value && swap.direction === 'from')
                ) {
                  console.error(data[key].error)

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
                  console.error('missing quote fixes')
                }
              } else {
                if (swap.fixed && dataAmmountOut === -1) {
                  console.error('missing quote fixes')
                }

                swap.receive.value = fixedFloat(amountOut).toString()
              }
            }
          })
        })
      },
    },
  )

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
          console.log(JSON.parse(JSON.stringify(debouncedSwaps)))
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
    if (tokens && tokens.length) {
      const defaultInToken = tokens.find((v: Token) => v.id === tokenIn)
      if (!defaultInToken) {
        const msg = `Send token not found in the tokens list`
        console.error(msg)
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
        const msg = `Receive token not found in the tokens list`
        console.error(msg)
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

    console.log(updatedSwaps)

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
        console.error('send value is 0')

        return
      }

      if (currentSwap.receiveAddress === '') {
        console.error('receiver address is empty')

        inputElem?.focus()

        return
      }

      const token = tokens?.find(
        (item: Token) => item.id === currentSwap.receive.name,
      )

      const validRes = validateWalletAddress(currentSwap.receiveAddress, token)

      if (!validRes) {
        console.error('invalid address')

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
      console.error('Please select a different pair')
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
    // filteredSwaps[filteredSwaps.length - 1].collapsed = false;

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

  const handleSwapProceed = () => {
    // console.log('clicked!!')
    // router.push('/order-details')
  }

  return (
    <div className="z-[1] flex flex-col justify-center items-center gap-2">
      <GeneralModal>
        <IndustrialCounterLockup>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center w-full gap-[16px]">
            <div className="flex flex-col justify-center items-center sm:items-start gap-[16px]">
              <div className="text-[28px] whitespace-nowrap sm:text-[34px] font-bold leading-[38px] text-white">
                Swap-Send-Bridge
              </div>
              <div className="text-[15px] font-medium font-poppins rainbow-text">
                Private, Compliant, No Sign Up
              </div>
            </div>
            <SingleMultiSend
              multiSendText="Multi"
              onChange={handleMultiSend}
              singleText="Single"
            />
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
            />
          ))}

          {isMulti ? (
            <div className="flex justify-between w-full mt-2">
              <SecondaryButton text="Save order" />
              <SecondaryButton text="Add swap" onClick={handleAddNewSwap} />
            </div>
          ) : null}

          <div className="gradient-text my-[20px] font-medium text-xs font-poppins">
            Only send To/From wallets. Transactions sent To/From smart contracts
            are not accepted
          </div>
          <HoudiniButton
            text={'Proceed'}
            onClick={handleSwapProceed}
            type={isMulti ? 'secondary' : 'primary'}
          />
        </IndustrialCounterLockup>
      </GeneralModal>
    </div>
  )
}
