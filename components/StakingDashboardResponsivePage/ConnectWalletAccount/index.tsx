import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useDisconnect, useSwitchNetwork } from 'wagmi'

import CTAButton from '@/components/StakingDashboard/CTAButton'
import { BlockieAvatar } from '@/components/StakingDashboard/RainbowKitCustomConnectButton/BlockieAvatar'
import { getBlockExplorerAddressLink } from '@/staking/utils/scaffold-eth'
import { useTargetNetwork } from '@/staking/hooks/scaffold-eth/useTargetNetwork'
import { WrongNetworkDropdown } from '@/components/StakingDashboard/RainbowKitCustomConnectButton/WrongNetworkDropdown'

export const ConnectWalletAccount = () => {
  const { disconnect } = useDisconnect()
  const { targetNetwork } = useTargetNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const blockExplorerAddressLink = account
          ? getBlockExplorerAddressLink(targetNetwork, account.address)
          : undefined;

        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  // <button
                  //   onClick={openConnectModal}
                  //   type="button"
                  //   className="text-[#FBD20F] flex justify-center items-center rounded-full border border-[#FBD20F] w-[178px] h-[48px] bg-black font-bold text-[19px] leading-[31px]"
                  // >
                  //   Connect Wallet
                  // </button>

                  <CTAButton onClick={openConnectModal}>
                    <span className="px-[30px] relative z-[50] py-[12px] justify-center items-center">
                      Connect Wallet
                    </span>
                  </CTAButton>
                )
              }

              if (chain?.unsupported || chain?.id !== targetNetwork.id) {
                return (
                  <button onClick={() => switchNetwork?.(targetNetwork.id)} type="button">
                    Wrong network
                  </button>
                )
              }

              return (
                <div className="flex flex-col lg:flex-row relative gap-[12px] z-[50]">
                  <CTAButton
                    width="191px"
                    height="44px"
                    onClick={() => disconnect()}
                  >
                    <span className="px-[30px] py-[12px] justify-center items-center">
                      Disconnect Wallet
                    </span>
                  </CTAButton>
                  <div className="inline-flex items-center justify-center p-[2px] rounded-[120px] bg-gradient-to-b from-white to-black">
                    <div className="inline-flex justify-center rounded-[120px] w-full h-full items-center bg-gradient-to-br from-black to-[#252932] px-[30px] py-[8px]">
                      <div className="flex flex-row gap-[10px]">
                        <span className="text-[16px] font-semibold leading-normal">
                          <a
                            target="_blank"
                            href={blockExplorerAddressLink}
                            rel="noopener noreferrer"
                            className="whitespace-nowrap"
                          >
                            {account.displayName}</a>
                        </span>
                        <BlockieAvatar size={24} address={account.address} ensImage={account.ensAvatar} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
