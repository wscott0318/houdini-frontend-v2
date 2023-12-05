import { ConnectButton } from '@rainbow-me/rainbowkit'

export const ConnectButtonHoudini = () => {
  return <ConnectButton.Custom>
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
              <button
                onClick={openConnectModal}
                type="button"
                className="text-[#FBD20F] flex justify-center items-center rounded-full border border-[#FBD20F] w-[178px] h-[48px] bg-black font-bold text-[19px] leading-[31px]"
              >
                Connect Wallet
              </button>
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
              <button
                onClick={openChainModal}
                style={{ display: 'flex', alignItems: 'center' }}
                type="button"
              >
                {chain.hasIcon && (
                  <div
                    style={{
                      background: chain.iconBackground,
                      width: 12,
                      height: 12,
                      borderRadius: 999,
                      overflow: 'hidden',
                      marginRight: 4,
                    }}
                  >
                    {chain.iconUrl && (
                      <img
                        alt={chain.name ?? 'Chain icon'}
                        src={chain.iconUrl}
                        style={{ width: 12, height: 12 }}
                      />
                    )}
                  </div>
                )}
                {chain.name}
              </button>

              <button onClick={openAccountModal} type="button">
                {account.displayName}
                {account.displayBalance
                  ? ` (${account.displayBalance})`
                  : ''}
              </button>
            </div>
          )
        })()}
      </div>
    )
  }}
</ConnectButton.Custom>
}