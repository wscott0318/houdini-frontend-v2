import { CheckBox, CollapsedSwap, Dropdown, TextField } from 'houdini-react-sdk'
import Image from 'next/image'
import { ChangeEvent } from 'react'

import upDown from '@/assets/up-down.png'

interface SwapFormProps {
  swap: Swap
  handlePrivateSwap: (value: string) => void
  handleVariableSwap: (value: string) => void
  loading: boolean
  tokens: Token[]
  networks: any
  selectCoin: (token: Token, target: string, id: string) => void
  handleArrows: (id: string) => void
  direction: boolean
  handleChange: (
    e: ChangeEvent<HTMLInputElement>,
    swapId: string,
    reverse?: boolean,
  ) => void
  handleReceiveAddress: (value: string, id: string) => void
  handleDelete: (value: string) => void
  handleExpand: (value: string) => void
  i18n?: SwapFormi18n
}

export const SwapForm: React.FC<SwapFormProps> = ({
  swap,
  handlePrivateSwap,
  handleVariableSwap,
  loading,
  tokens,
  networks,
  selectCoin,
  handleArrows,
  direction,
  handleChange,
  handleReceiveAddress,
  handleDelete,
  handleExpand,
  i18n,
}) => {
  return (
    <>
      {swap.collapsed ? (
        <div className="mt-8 w-full">
          <CollapsedSwap
            id={swap.id}
            sendValue={parseFloat(swap.send.value)}
            sendName={swap.send.name}
            sendIcon={swap.send.icon as string}
            receiveValue={parseFloat(swap.receive.value)}
            receiveName={swap.receive.name}
            receiveIcon={swap.receive.icon as string}
            receiveAddress={swap.receiveAddress}
            anonymous={!!swap.anonymous}
            anonymousText={
              swap.anonymous
                ? i18n?.privateLeftText || 'Private'
                : i18n?.privateRightText || 'Semi Private'
            }
            handleDelete={(id) => handleDelete(id)}
            handleExpand={(id) => handleExpand(id)}
          />
        </div>
      ) : (
        <div className="flex flex-col lg:py-[10px] lg:gap-[20px] gap-[10px] w-full mt-4">
          <div className="flex flex-col my-[20px] sm:my-0 sm:flex-row gap-4 justify-between items-start sm:items-center w-full">
            <CheckBox
              defaultValue={true}
              leftText={i18n?.privateLeftText || 'Private'}
              name="privateToggler"
              onChange={() => handlePrivateSwap(swap.id)}
              rightText={i18n?.privateRightText || 'Semi Private'}
            />
            <CheckBox
              defaultValue={true}
              leftText={i18n?.variableLeftText || 'Variable'}
              name="variableToggler"
              onChange={() => handleVariableSwap(swap.id)}
              rightText={i18n?.variableRightText || 'Exact'}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center -space-y-6 md:space-y-0 items-center gap-[14px] md:-space-x-7 w-full">
            <div className="w-full max-w-full md:max-w-[345px] lg:max-w-[1000px]">
              <TextField
                id="send"
                label={i18n?.sendInputLabel || 'Send:'}
                placeholder="0.0"
                onChange={(e) => handleChange(e, swap.id)}
                value={swap.send.value}
              >
                {!loading ? (
                  <Dropdown
                    title={i18n?.sendCurrencyTitle || 'Sending Currency'}
                    subtitle={i18n?.sendCurrencySubtitle || 'Popular Protocols'}
                    target="#portal"
                    networks={networks || []}
                    tokens={tokens || []}
                    selectedTokenId={swap.send.name}
                    onSelectionChange={(token) =>
                      selectCoin(token, 'send', swap.id)
                    }
                  />
                ) : null}
              </TextField>
            </div>
            <Image
              src={upDown}
              width={100}
              height={100}
              alt="upDown"
              onClick={() => {
                handleArrows(swap.id)
              }}
              className={`${
                direction ? 'scale-y-[-1]' : ''
              } w-[45px] h-[45px] hover:cursor-pointer rotate-180 md:rotate-90 hover:-translate-y-1 transition-all duration-100 relative z-0`}
            />
            <div className="w-full max-w-full md:max-w-[345px] lg:max-w-[1000px]">
              <TextField
                id="receive"
                label={i18n?.receiveInputLabel || 'Receive:'}
                placeholder="0.0"
                onChange={(e) => handleChange(e, swap.id, true)}
                disabled={!swap.fixed}
                value={swap.receive.value}
              >
                {!loading ? (
                  <Dropdown
                    title={i18n?.receiveCurrencyTitle || 'Receiving Currency'}
                    subtitle={
                      i18n?.receiveCurrencySubtitle || 'Popular Protocols'
                    }
                    target="#portal"
                    networks={networks || []}
                    tokens={tokens || []}
                    selectedTokenId={swap.receive.name}
                    onSelectionChange={(token) =>
                      selectCoin(token, 'receive', swap.id)
                    }
                  />
                ) : null}
              </TextField>
            </div>
          </div>

          <div className="w-full my-[20px] sm:my-0">
            <TextField
              id="receivingWallet"
              label={
                i18n?.receiveInputLabel || 'Receiving Wallet (BTC) Address:'
              }
              placeholder={
                i18n?.receiverWalletPlaceholder ||
                'Receiving Wallet (BTC) Address'
              }
              onChange={(e) => handleReceiveAddress(e.target.value, swap.id)}
              value={swap.receiveAddress}
            />
          </div>
        </div>
      )}
    </>
  )
}
