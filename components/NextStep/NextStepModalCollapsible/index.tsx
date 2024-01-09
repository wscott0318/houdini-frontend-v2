import { useMutation, useQuery } from '@apollo/client'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckBox, Portal } from 'houdini-react-sdk'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { Countdown } from '@/components/Countdown'
import { GeneralModal } from '@/components/GeneralModal'
import { Clipboardbox } from '@/components/GeneralModal/Clipboardbox'
import { IndustrialCounterLockup } from '@/components/GeneralModal/IndustrialCounterLockup'
import { MetalboarderedRoundbox } from '@/components/GeneralModal/MetalboarderedRoundbox'
import { MetalboarderedTransRoundbox } from '@/components/GeneralModal/MetalboarderedTransRoundbox'
import { OrderDetailRoundbox } from '@/components/GeneralModal/OrderDetailRoundbox'
import { WalletRoundbox } from '@/components/GeneralModal/WalletRoundbox'
import { OpenWallet } from '@/components/OpenWallet'
import { OrderProgress } from '@/components/OrderProgress'
import { QrCode } from '@/components/QRCode'
import { ChevronSvg, QRCodeSvg, SwapSvg } from '@/components/Svg'
import { CONFIRM_DEPOSIT, TOKENS_QUERY } from '@/lib/apollo/query'
import { ORDER_STATUS } from '@/utils/constants'
import {
  getEllipsisTxt,
  getOrderStatusKey,
  getTokenDetails,
  showErrorMessage,
} from '@/utils/helpers'

interface OrderDetailModalProps {
  orderID: string
  creationTime: Date
  sendAmount: number
  receiveAddress: string
  deliveryTime: string
  recipientAddress: string
  receiveAmount: number
  tokenType: string
  status: number
  swapTime: number
  order: any
}

export const OrderDetailModalCollapsible = (props: OrderDetailModalProps) => {
  const { t } = useTranslation()

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [qrCodeModal, setQrCodeModal] = useState(false)
  const [isLoading, setIsLoading] = useState()

  const [txHash, setTxHash] = useState('')
  const [confirmDepositModal, setConfirmDepositModal] = useState(false)

  const toggleOpen = () => setIsCollapsed(!isCollapsed)

  const { data: tokensData, loading } = useQuery(TOKENS_QUERY)

  const [confirmDeposit] = useMutation(CONFIRM_DEPOSIT, {
    variables: {
      hash: props?.order?.senderAddress,
      id: props?.order?.houdiniId,
    },
    onError: (err) => {
      showErrorMessage(err, t)
    },
    onCompleted: (data) => {
      const { confirmDeposit } = data
      if (confirmDeposit) {
        toast.success('Your request has been sent')
      } else {
        toast.error('Something went wrong. Please contact support!')
      }
    },
  })

  const handleConfirmDeposit = async () => {
    await confirmDeposit()

    setTxHash('')
    setConfirmDepositModal(false)
  }

  const handleCloseConfirmDepositModal = () => {
    setConfirmDepositModal(false)
  }

  const DateFormatter = () => {
    const date = props.creationTime
    const formatter = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    const formattedDate = formatter.format(date)
    return formattedDate
  }
  const TimeFormatter = () => {
    const date = props.creationTime
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    })
    const formattedTime = formatter.format(date)
    return formattedTime
  }

  const animation = {
    hidden: {
      y: '100%',
      transition: { duration: 0.3 },
    },
    visible: {
      y: '0',
      transition: { duration: 0.3 },
    },
  }

  const findTokenBySymbol = useCallback(
    (symbol: string) => {
      if (!loading) {
        const tokens = tokensData?.tokens
        const token = tokens?.find((token: any) => token.symbol === symbol)
        return token
          ? { displayName: token.displayName, icon: token.icon }
          : null
      }
      return { displayName: '', icon: '' }
    },
    [loading],
  )

  return (
    <div className="w-full flex flex-row justify-center items-center">
      <GeneralModal>
        <div className="flex md:flex-row flex-wrap lg:justify-between lg:gap-0 gap-[5px] items-center justify-center w-full px-[10px] py-[5px]">
          <div className="md:w-35% sm:w-50%">
            <OrderDetailRoundbox border="custom-houdini-id-gradient1">
              <div className="text-center lg:text-[15px] text-[12px] font-bold text-[#FFFFFF] text-opacity-60">
                {t('orderDetailModalOrderID')}:
              </div>
              <Clipboardbox
                concept={`${props.orderID}`}
                fontSize="lg:text-[15px] text-[12px]"
                textColor="text-[#FFFFFF99]"
              />
            </OrderDetailRoundbox>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <div className="md:w-10% md:pt-0 lg:pt-[5px] sm:w-50%">
              <OrderDetailRoundbox border="custom-houdini-id-gradient1">
                <div className="text-center lg:text-[14px] text-[12px] text-[#FFFFFF] leading-[24px] text-opacity-60 font-bold">
                  {t('orderDetailModalCreationTime')}:
                </div>
                <div className="text-center lg:text-[15px] text-[12px] text-[#FFFFFF] leading-[24px] text-opacity-50 font-normal">
                  {`${DateFormatter()}, ${TimeFormatter()}`}
                </div>
              </OrderDetailRoundbox>
            </div>
            <div
              onClick={toggleOpen}
              className="hover:cursor-pointer rounded-full w-[40px] h-[40px]"
            >
              <OrderDetailRoundbox
                border="custom-houdini-id-gradient1"
                additionalClassNames="rounded-full"
              >
                <ChevronSvg
                  className={`${
                    isCollapsed ? 'rotate-180' : 'rotate-0'
                  } fill-white min-w-[20px] min-h-[20px]`}
                />
              </OrderDetailRoundbox>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isCollapsed ? 1 : 0,
            height: isCollapsed ? 'auto' : 0,
          }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          {props.status === 0 || props.status === -1 ? (
            <IndustrialCounterLockup>
              <div className="text-center w-full lg:text-[46px] text-[20px] lg:leading-[75px] font-bold ">
                {t('orderDetailModalSendFund')}
              </div>
              <div className="flex relative justify-center items-center flex-col lg:px-[30px] lg:py-[10px] lg:gap-[20px] gap-[10px] w-full">
                <div className="text-center w-full lg:text-[17px] text-[15px] leading-[21px] font-medium rainbow-text">
                  {t('orderDetailModalFollowSteps')}
                </div>
                <MetalboarderedRoundbox>
                  <div className="flex flex-row flex-wrap sm:flex-nowrap w-full justify-center sm:justify-start items-center ml-4 gap-4 mr-auto">
                    <div className="text-sm">{t('orderDetailModalSend')}</div>
                    <div className="flex flex-row w-full lg:w-auto justify-center items-center">
                      <div className="flex flex-row justify-center items-center gap-2">
                        <div className="text-sm whitespace-nowrap">
                          {props.order.inAmount}
                        </div>
                        <img
                          alt="inSymbol"
                          src={findTokenBySymbol(props?.order?.inSymbol)?.icon}
                          className="w-[20px] h-[20px]"
                        />
                        <div className="text-sm whitespace-nowrap">
                          {
                            findTokenBySymbol(props?.order?.inSymbol)
                              ?.displayName
                          }
                        </div>
                        <div>to:</div>
                      </div>
                    </div>
                    <div className="flex flex-row flex-wrap justify-center items-center mr-4">
                      <Clipboardbox
                        concept={`${props.receiveAddress}`}
                        textColor="text-[#FBBF24]"
                        fontSize="text-[14px]"
                        fontWeight="text-semibold"
                        lineHeight="leading-[24px]"
                      />
                    </div>
                  </div>
                </MetalboarderedRoundbox>
              </div>
              <div className="flex gap-4 lg:flex-row flex-wrap justify-center lg:justify-between w-full items-center px-[30px] lg:pt-5 pt-[10px] left-0">
                <WalletRoundbox>
                  <div
                    onClick={() => {
                      setQrCodeModal(!qrCodeModal)
                    }}
                    className="flex w-[50px] h-[50px] hover:cursor-pointer flex-row justify-center items-center lg:py-[10px] py-[5px]"
                  >
                    <QRCodeSvg className="w-full h-full" />
                  </div>
                </WalletRoundbox>

                <WalletRoundbox>
                  <div className="relative hover:cursor-pointer flex flex-row justify-center items-center custom-wallet-shadow gap-2 custom-wallet-gradient rounded-[15px] w-[125px] h-[44px] p-[10px] bg-gradient-to-r">
                    <div
                      onClick={() => {
                        confirmDeposit()
                      }}
                      className="text-center lg:text-[15px] lg:font-bold font-medium whitespace-nowrap"
                    >
                      {t('alertSupport')}
                    </div>
                  </div>
                </WalletRoundbox>

                <div className="hidden sm:block">
                  <Countdown order={props?.order} />
                </div>

                <WalletRoundbox>
                  <div className="relative flex hover:cursor-pointer flex-row justify-center items-center custom-wallet-shadow gap-2 custom-wallet-gradient rounded-[15px] w-[125px] h-[44px] p-[10px] bg-gradient-to-r">
                    <OpenWallet
                      amount={props?.order?.inAmount}
                      to={props?.order?.senderAddress}
                      token={{
                        token: getTokenDetails(
                          tokensData?.tokens,
                          props?.order?.inSymbol,
                        ),
                      }}
                      setIsLoading={setIsLoading}
                    />
                    {/* <QuestionSvg className="absolute top-1 right-1 w-[10px] h-[10px]"/> */}
                  </div>
                </WalletRoundbox>
              </div>
              <div className="sm:hidden flex flex-wrap justify-center gap-[10px]">
                <Countdown order={props?.order} />
              </div>
            </IndustrialCounterLockup>
          ) : (
            <IndustrialCounterLockup>
              <div className="flex flex-col w-full items-center justify-center">
                <div className="items-center w-full justify-center">
                  <MetalboarderedTransRoundbox>
                    <div className="relative flex flex-col lg:flex-row py-[30px] gap-4">
                      {props?.order?.status === ORDER_STATUS.EXPIRED ? (
                        <div className="text-center md:text-[19px] md:leading-[24px] font-medium rainbow-text md:whitespace-nowrap">
                          Order expired
                        </div>
                      ) : (
                        <OrderProgress order={props?.order} />
                      )}
                    </div>
                  </MetalboarderedTransRoundbox>
                </div>
                <MetalboarderedTransRoundbox>
                  <div className="flex flex-row justify-center items-center gap-[32px] px-[60px] py-[10px] h-full">
                    <div className="text-center md:text-[19px] md:leading-[24px] font-medium rainbow-text md:whitespace-nowrap">
                      {t('orderDetailsModalTodaysAverageSwapTime')}:
                    </div>
                    <div className="text-center md:text-[19px] md:leading-[24px] font-bold md:whitespace-nowrap">
                      {`${props.swapTime} ${t('orderDetailsSwapTimeMinute')}`}
                    </div>
                  </div>
                </MetalboarderedTransRoundbox>
              </div>
            </IndustrialCounterLockup>
          )}
        </motion.div>

        {props.status === 0 || props.status === -1 ? (
          <div className="pt-[15px] lg:px-[10px] pb-[5px] w-full">
            <div className="p-[2px] w-full rounded-[20px] custom-houdini-id-gradient1">
              <div className="flex flex-wrap lg:justify-between justify-center items-center rounded-[20px] w-full custom-houdini-id-gradient custom-houdini-id-shadow lg:px-[30px] px-[5px] py-[10px]">
                <div className="sm:flex block lg:w-auto w-full lg:justify-start justify-center px-[4px] gap-2">
                  <div className="text-center lg:text-[15px] whitespace-nowrap lg:leading-[24px] text-[14px] font-bold text-opacity-60 text-[#FFFFFF99]">
                    {t('orderDetailModalRecipientWallet')}:
                  </div>
                  <div className="text-center overflow-hidden text-xs lg:text-[15px] lg:leading-[24px] text-[13px] font-normal text-opacity-50 text-[#FFFFFF99]">
                    {getEllipsisTxt(props.recipientAddress)}
                  </div>
                </div>
                <div className="flex lg:w-[40%] lg:justify-start justify-center flex-row items-center gap-2.5 px-[4px]">
                  <div className="text-center whitespace-nowrap lg:text-[15px] lg:leading-[24px] text-[14px] font-normal text-opacity-50 text-[#FFFFFF99]">
                    {t('orderDetailModalWillReceive')}
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <div className="text-center lg:text-[15px] text-[14px] font-normal">
                      {props.order.outAmount}
                    </div>
                    <img
                      alt="outSymbol"
                      src={findTokenBySymbol(props?.order?.outSymbol)?.icon}
                      className="w-[20px] h-[20px]"
                    />
                    <div className="text-base whitespace-nowrap text-center lg:text-[15px] text-[14px] font-normal">
                      {findTokenBySymbol(props?.order?.outSymbol)?.displayName}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center gap-2">
                  <CheckBox
                    defaultValue={props?.order?.anonymous}
                    leftText=""
                    name="privateToggler"
                    // onChange={() => handlePrivateSwap(swap.id)}
                    rightText=""
                    disabled={true}
                  />
                  <div className="text-xs whitespace-nowrap">SEMI-PRIVATE</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-[15px] lg:px-[10px] pb-[5px] w-full">
            <div className="p-[2px] w-full rounded-[20px] custom-houdini-id-gradient1">
              <div className="flex flex-wrap lg:justify-between justify-center items-center rounded-[20px] w-full custom-houdini-id-gradient custom-houdini-id-shadow lg:px-[30px] px-[5px] py-[10px]">
                <div className="sm:flex block lg:w-auto w-full lg:justify-start justify-center px-[4px] gap-2">
                  <div className="text-center lg:text-[15px] whitespace-nowrap lg:leading-[24px] text-[14px] font-bold text-opacity-60 text-[#FFFFFF99]">
                    {t('recieverAddress')}:
                  </div>
                  <div className="text-center overflow-hidden text-xs lg:text-[15px] lg:leading-[24px] text-[13px] font-normal text-opacity-50 text-[#FFFFFF99]">
                    {getEllipsisTxt(props.recipientAddress)}
                  </div>
                </div>
                <div className="flex lg:w-[40%] lg:justify-start justify-center flex-row items-center gap-2.5 px-[4px]">
                  <div className="flex gap-2.5 items-center">
                    <div className="text-center lg:text-[15px] text-[14px] font-normal">
                      {props.order.inAmount}
                    </div>
                    <img
                      alt="inSymbol"
                      src={findTokenBySymbol(props?.order?.inSymbol)?.icon}
                      className="w-[20px] h-[20px]"
                    />
                    <div className="text-base text-center whitespace-nowrap lg:text-[15px] text-[14px] font-normal">
                      {props?.order?.inSymbol}
                    </div>
                  </div>
                  <SwapSvg className="min-w-[15px] min-h-[15px]" />
                  <div className="flex gap-2.5 items-center">
                    <div className="text-center lg:text-[15px] text-[14px] font-normal">
                      {props.order.outAmount}
                    </div>
                    <img
                      alt="outSymbol"
                      src={findTokenBySymbol(props?.order?.outSymbol)?.icon}
                      className="w-[20px] h-[20px]"
                    />
                    <div className="text-base text-center whitespace-nowrap lg:text-[15px] text-[14px] font-normal">
                      {props?.order?.outSymbol}
                    </div>
                  </div>
                </div>
                <div className="px-[4px] flex flex-row justify-start whitespace-nowrap items-center gap-2">
                  <div>Status:</div>
                  <div>{getOrderStatusKey(props.order.status)}</div>
                </div>
                <div className="flex flex-row justify-start items-center gap-2">
                  <CheckBox
                    defaultValue={props?.order?.anonymous}
                    leftText=""
                    name="privateToggler"
                    // onChange={() => handlePrivateSwap(swap.id)}
                    rightText=""
                    disabled={true}
                  />
                  <div className="text-xs whitespace-nowrap">SEMI-PRIVATE</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </GeneralModal>

      <AnimatePresence>
        {qrCodeModal ? (
          <Portal>
            <motion.div
              className="z-10 fixed left-0 top-0 w-screen h-screen"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
              initial="hidden"
              exit="hidden"
              animate="visible"
              variants={animation}
            >
              <div
                onClick={(e) => {
                  e.preventDefault()
                  const target = e.target as HTMLElement
                  if (target.id === 'dropdownClickable') {
                    setQrCodeModal(false)
                  }
                }}
                className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 drop-shadow-2xl backdrop-blur-[5px]"
              >
                <div
                  id="dropdownClickable"
                  className="flex relative min-h-full items-end justify-center sm:items-center p-6 md:p-0"
                >
                  <QrCode
                    qrCodeModal={qrCodeModal}
                    setQrCodeModal={setQrCodeModal}
                    senderAddress={props.receiveAddress}
                  />
                </div>
              </div>
            </motion.div>
          </Portal>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
