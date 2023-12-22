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
            anonymousText={swap.anonymous ? 'Private' : 'Semi-Private'}
            handleDelete={(id) => handleDelete(id)}
            handleExpand={(id) => handleExpand(id)}
          />
        </div>
      ) : (
        <div className="flex flex-col lg:py-[10px] lg:gap-[20px] gap-[10px] w-full mt-4">
          <div className="flex flex-col my-[20px] sm:my-0 sm:flex-row gap-4 justify-between items-start sm:items-center w-full">
            <CheckBox
              defaultValue={true}
              leftText="Private"
              name="privateToggler"
              onChange={() => handlePrivateSwap(swap.id)}
              rightText="Semi Private"
            />
            <CheckBox
              defaultValue={true}
              leftText="Variable"
              name="variableToggler"
              onChange={() => handleVariableSwap(swap.id)}
              rightText="Exact"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-start -space-y-6 sm:space-y-0 items-center gap-[14px] sm:-space-x-7 w-full">
            <TextField
              id="send"
              label="Send:"
              placeholder="0.0"
              onChange={(e) => handleChange(e, swap.id)}
              value={swap.send.value}
            >
              {!loading ? (
                <Dropdown
                  title="Sending Currency"
                  subtitle="Popular Protocols"
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
              } w-[45px] h-[45px] hover:cursor-pointer rotate-180 sm:rotate-90 hover:-translate-y-1 transition-all duration-100 relative z-0`}
            />
            <TextField
              id="receive"
              label="Receive:"
              placeholder="0.0"
              onChange={(e) => handleChange(e, swap.id, true)}
              disabled={!swap.fixed}
              value={swap.receive.value}
            >
              {!loading ? (
                <Dropdown
                  title="Receiving Currency"
                  subtitle="Popular Protocols"
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

          <div className="w-full my-[20px] sm:my-0">
            <TextField
              id="receivingWallet"
              label="Receiving Wallet (BTC) Address:"
              placeholder="Receiving Wallet (BTC) Address"
              onChange={(e) => handleReceiveAddress(e.target.value, swap.id)}
            />
          </div>
        </div>
      )}
    </>
  )
}
