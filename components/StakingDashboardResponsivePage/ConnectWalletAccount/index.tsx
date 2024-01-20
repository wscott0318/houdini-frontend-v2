import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import { useDisconnect } from 'wagmi'

import avatar from '@/assets/avatar.png'
import CTAButton from '@/components/StakingDashboard/CTAButton'

export const ConnectWalletAccount = () => {
  const { disconnect } = useDisconnect()
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
                    <span className="px-[30px] py-[12px] justify-center items-center">
                      Connect Wallet
                    </span>
                  </CTAButton>
                )
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                )
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
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
                          {account.displayName}
                          {/* {account.address} */}
                          {/* 0xeed9978.....e372b0154 */}
                        </span>
                        <Image
                          src={avatar}
                          className="lg:w-[24px] lg:h-[24px]"
                          alt="avatar"
                        />
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
