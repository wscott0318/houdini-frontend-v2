import { useQuery } from '@apollo/client'
import {
  CheckBox,
  Dropdown,
  HoudiniButton,
  SingleMultiSend,
  TextField,
} from 'houdini-react-sdk'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import upDown from '@/assets/up-down.png'
import { GeneralModal } from '@/components/GeneralModal'
import { IndustrialCounterLockup } from '@/components/GeneralModal/IndustrialCounterLockup'
import { GET_NETWORKS, TOKENS_QUERY } from '@/lib/apollo/query'

export const SwapBox = () => {
  const router = useRouter()

  const locationParams = new URLSearchParams()
  const tokenIn = locationParams.get('tokenIn') ?? 'ETH'
  const tokenOut = locationParams.get('tokenOut') ?? 'BTC'
  const anonymous = locationParams.get('anonymous')
  const amount = locationParams.get('amount')
    ? parseFloat(locationParams.get('amount') as string)
    : ''

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
    id: uuidv4(),
    destinationTag: '',
    fixed: false,
    direction: 'from',
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
      id: uuidv4(),
      destinationTag: '',
      fixed: false,
      direction: 'from',
    },
  ])

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

      console.log(updatedSwaps)

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

  const handlePrivateSwap = () => {
    setPrivate(!privateSwap)
  }

  const handleVariableSwap = () => {
    setVariable(!variableSwap)
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

  const handleSwapProceed = () => {
    console.log('clicked!!')
    router.push('/order-details')
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
          <div className="flex flex-col lg:py-[10px] lg:gap-[20px] gap-[10px] w-full">
            <div className="flex flex-col my-[20px] sm:my-0 sm:flex-row gap-4 justify-between items-start sm:items-center w-full">
              <CheckBox
                defaultValue
                leftText="Private"
                name="privateToggler"
                onChange={handlePrivateSwap}
                rightText="Semi Private"
              />
              <CheckBox
                defaultValue
                leftText="Variable"
                name="variableToggler"
                onChange={handleVariableSwap}
                rightText="Exact"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-start -space-y-6 sm:space-y-0 items-center gap-[14px] sm:-space-x-7 w-full">
              <TextField id="send" label="Send:" placeholder="0.0">
                {!loading && !loadingNetworks ? (
                  <Dropdown
                    title="Sending Currency"
                    subtitle="Popular Protocols"
                    target="#portal"
                    networks={networksData?.networks || []}
                    tokens={tokensData?.tokens || []}
                    selectedTokenId={swaps[0].send.name}
                    onSelectionChange={(token) =>
                      selectCoin(token, 'send', swaps[0].id)
                    }
                  />
                ) : null}
              </TextField>
              <Image
                src={upDown}
                width={100}
                height={100}
                alt="upDown"
                onClick={() => {
                  handleArrows(swaps[0].id)
                }}
                className={`${
                  direction ? 'scale-y-[-1]' : ''
                } w-[45px] h-[45px] hover:cursor-pointer rotate-180 sm:rotate-90 hover:-translate-y-1 transition-all duration-100 relative z-0`}
              />
              <TextField id="receive" label="Receive:" placeholder="0.0">
                {!loading && !loadingNetworks ? (
                  <Dropdown
                    title="Receiving Currency"
                    subtitle="Popular Protocols"
                    target="#portal"
                    networks={networksData?.networks || []}
                    tokens={tokensData?.tokens || []}
                    selectedTokenId={swaps[0].receive.name}
                    onSelectionChange={(token) =>
                      selectCoin(token, 'receive', swaps[0].id)
                    }
                  />
                ) : null}
              </TextField>
            </div>

            <div className="w-full my-[20px] sm:my-0">
              <TextField
                id="receivingWallet"
                label="Receiving Wallet (BTC) Address:"
                placeholder="Receiving Wallet (BTC) Address"
              />
            </div>
          </div>
          <div className="gradient-text my-[20px] font-medium text-xs font-poppins">
            Only send To/From wallets. Transactions sent To/From smart contracts
            are not accepted
          </div>
          <HoudiniButton text={'Proceed'} onClick={handleSwapProceed} />
        </IndustrialCounterLockup>
      </GeneralModal>
    </div>
  )
}
