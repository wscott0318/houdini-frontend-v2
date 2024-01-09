import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useMatomo } from 'matomo-react'
import React from 'react'
// import { getEllipsisTxt } from '@/utils/helper';
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { parseEther, parseUnits } from 'viem'
import {
  useAccount,
  useContractWrite,
  useDisconnect,
  useNetwork,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
  useSwitchNetwork,
  useToken,
} from 'wagmi'

// import { ChainPresets } from '@/utils/ChainPresets';

export const OpenWallet = ({ amount, token, to, setIsLoading }: any) => {
  const { openConnectModal } = useConnectModal()
  const { chain } = useNetwork()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const { switchNetworkAsync, error } = useSwitchNetwork()
  const { pushInstruction, trackEvent } = useMatomo()

  const tokenAddress = token?.token?.address
  // const tokenAddress = '0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814';
  // setDefaultChain(token.token.chain);

  // @Matomo
  pushInstruction('setUserId', address)

  // const getChainIcon = (chainId: number | string) => {
  // 	const imageId = ChainPresets[chainId];
  // 	const { projectId, chainImages } = ConfigCtrl.state;

  // 	return (
  // 		chainImages?.[chainId] ??
  // 		(projectId && imageId ? ExplorerCtrl.getAssetImageUrl(imageId) : '')
  // 	);
  // };

  const { data } = useToken({
    address: tokenAddress,
  })

  const { config: writeConfig, error: contractPrepareError } =
    usePrepareContractWrite({
      chainId: token?.token?.chain,
      address: tokenAddress,
      functionName: 'transfer',
      args: [to, parseUnits(amount?.toFixed(6) ?? '0', data?.decimals as number ?? 18)],
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: '_to',
              type: 'address',
            },
            {
              name: '_value',
              type: 'uint256',
            },
          ],
          name: 'transfer',
          outputs: [
            {
              name: '',
              type: 'bool',
            },
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
    })

  const {
    write,
    isSuccess: isSuccessContract,
    isLoading: isLoadingContract,
    isError: isErrorContract,
    reset: resetContract,
    error: errorContract,
    status: statusContract,
  } = useContractWrite(writeConfig as any)

  let value = 0n

  try {
    value = parseEther(amount.toFixed(18).toString())
  } catch (e) {}

  const { config, error: prepareError } = usePrepareSendTransaction({
    chainId: token?.token?.chain,
    to,
    value,
  })

  const { t } = useTranslation()

  const { sendTransaction, isSuccess, isLoading, isError, reset } =
    useSendTransaction(config)

  if (isSuccess || isSuccessContract) {
    setIsLoading(false)
    if (isSuccess) {
      // @Matomo
      trackEvent({
        category: 'wallet-connect',
        action: 'wallet-pay',
        name: 'success',
      })
      reset()
    } else {
      // @Matomo
      trackEvent({
        category: 'wallet-connect',
        action: 'wallet-pay',
        name: 'success-token',
      })
      resetContract()
    }
    toast.success(t('transferBlockchain'))
  } else if (isLoading || isLoadingContract) {
    setIsLoading(true)
  } else if (isError || isErrorContract) {
    setIsLoading(false)
    if (isError) {
      trackEvent({ category: 'wallet-connect', action: 'wallet-pay-error' })
      reset()
    } else {
      trackEvent({
        category: 'wallet-connect',
        action: 'wallet-pay-token-error',
      })
      resetContract()
    }
    toast.error(t('transferNotBlockchain'))
  }

  const handleOpenWallet = async () => {
    if (!isConnected) {
      openConnectModal?.()
      // @Matomo
      trackEvent({
        category: 'wallet-connect',
        action: 'click-event',
        name: 'wallet-open',
      })
    }

    if (chain?.id !== token?.token?.chain) {
      if (switchNetworkAsync) {
        await switchNetworkAsync(token?.token?.chain).catch((e) => {
          toast.error(t('correctNetwork'))
        })
      }
      if (error) {
        // disconnect();
      }
      return
    }

    if (token?.token?.chain && !token.token.address) {
      if (prepareError) {
        toast.error(t('couldNotPrepare'))
      } else if (sendTransaction) {
        sendTransaction()
      }
    } else if (token?.token?.chain && token.token.address) {
      if (contractPrepareError || isErrorContract) {
        console.log(contractPrepareError, isErrorContract)
        toast.error('couldNotPrepare')
      } else if (write) {
        write()
      }
    }
  }

  // useEffect(() => {
  // 	if (isConnected) {
  // 		if (chain?.id !== token?.token?.chain) {
  // 			switchNetwork?.(token.token.chain);
  // 			if (error) {
  // 				disconnect();
  // 			}
  // 			return;
  // 		}
  // 	}
  // }, [isConnected, chain, token, error]);

  if (!token?.token?.chain) {
    return null
  }

  return (
    <>
      <button
        className="block rounded-md border-[1px] border-black bg-white px-6 py-2 font-bold text-black"
        onClick={() => handleOpenWallet()}
      >
        <span className="mb-1">{t('openInWallet')}</span>
        {/* <div className="flex flex-row items-center justify-center"> */}
        {/* <img
						src={getChainIcon(chain?.id ?? 1)}
						height={12}
						width={12}
						alt={chain?.name ?? ''}
						className="greyscale rounded-xl transition-all duration-100 hover:scale-110"
					/> */}
        {/* <span className="text-sm"> {getEllipsisTxt(address ?? '')}</span> */}
        {/* </div> */}
      </button>
    </>
  )
}
