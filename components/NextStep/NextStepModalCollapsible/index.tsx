import { AnimatePresence, motion } from 'framer-motion'
import { CheckBox, Portal } from 'houdini-react-sdk'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BulletButtons } from '@/components/BulletButton'
import { ConfirmDeposit } from '@/components/ConfirmDepositModal'
import { Countdown } from '@/components/Countdown'
import { EraseOrder } from '@/components/EraseModal'
import { GeneralModal } from '@/components/GeneralModal'
import { Clipboardbox } from '@/components/GeneralModal/Clipboardbox'
import { IndustrialCounterLockup } from '@/components/GeneralModal/IndustrialCounterLockup'
import { MetalboarderedRoundbox } from '@/components/GeneralModal/MetalboarderedRoundbox'
import { MetalboarderedTransRoundbox } from '@/components/GeneralModal/MetalboarderedTransRoundbox'
import { OrderDetailRoundbox } from '@/components/GeneralModal/OrderDetailRoundbox'
import { WalletRoundbox } from '@/components/GeneralModal/WalletRoundbox'
import { OpenWallet } from '@/components/OpenWallet'
import OrderDeletedModal from '@/components/OrderDetailsComponents/OrderDeletedModal'
import OrderIdRoundBox from '@/components/OrderDetailsComponents/OrderIdRoundBox'
import { TransactionHash } from '@/components/OrderDetailsComponents/TransactionHash'
import { OrderProgress } from '@/components/OrderProgress'
import { QrCode } from '@/components/QRCode'
import { ChevronSvg, QRCodeSvg, SwapSvg } from '@/components/Svg'
import { useTokens } from '@/hooks'
import { OrderStatusResult } from '@/types/backend/typegql/entities/abstract/order.status'
import { ORDER_STATUS, ORDER_STATUS_FAKE } from '@/utils/constants'
import {
  animation,
  dateFormatter,
  getEllipsisTxt,
  timeFormatter,
} from '@/utils/helpers'
import useOrderStep from '@/utils/hooks/useOrderStep'

interface OrderDetailModalProps {
  order: OrderStatusResult
}

export const OrderDetailModalCollapsible = ({
  order,
}: OrderDetailModalProps) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [qrCodeModal, setQrCodeModal] = useState(false)
  const [isLoading, setIsLoading] = useState()
  const [minutes, setMinutes] = useState(0)

  const [confirmDepositModal, setConfirmDepositModal] = useState(false)
  const [eraseModal, setEraseModal] = useState(false)
  const { currentStep, setCurrentStep } = useOrderStep(order)

  const { t } = useTranslation()

  const status = order?.status
  const orderID = order?.houdiniId
  const receiveAddress = order?.receiverAddress
  const recipientAddress = order?.senderAddress
  const swapTime = order?.eta
  const isDeleted = status === ORDER_STATUS.DELETED
  const isExpired = status === ORDER_STATUS.EXPIRED

  const toggleOpen = () => setIsExpanded(!isExpanded)

  const { findTokenById, getAddressUrl, getTokenDetails } = useTokens()

  if (isDeleted) {
    return <OrderDeletedModal orderId={orderID} />
  } else {
    return (
      <div className="w-full flex flex-row justify-center items-center">
        <GeneralModal>
          <div className="flex md:flex-row flex-wrap lg:justify-between lg:gap-0 gap-[5px] items-center justify-center w-full px-[10px] py-[5px]">
            <OrderIdRoundBox orderId={orderID} />
            <div className="flex flex-row justify-start items-center gap-2">
              <div className="md:w-10% md:pt-0 lg:pt-[5px] sm:w-50%">
                <OrderDetailRoundbox border="custom-houdini-id-gradient1">
                  <div className="text-center lg:text-[14px] text-[12px] text-[#FFFFFF] leading-[24px] text-opacity-60 font-bold">
                    {t('orderDetailModalCreationTime')}:
                  </div>
                  <div className="text-center lg:text-[15px] text-[12px] text-[#FFFFFF] leading-[24px] text-opacity-50 font-normal">
                    {`${dateFormatter(order?.created)}, ${timeFormatter(
                      order?.created,
                    )}`}
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
                      isExpanded ? 'rotate-180' : 'rotate-0'
                    } fill-white min-w-[20px] min-h-[20px]`}
                  />
                </OrderDetailRoundbox>
              </div>
            </div>
          </div>
          <motion.div
            initial={{
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? 'auto' : 0,
            }}
            animate={{
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? 'auto' : 0,
              // transitionEnd: {
              //   display: 'none',
              // },
            }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {currentStep === 'NEXT_STEP' ? (
              <IndustrialCounterLockup>
                <div className="text-center w-full lg:text-[46px] text-[20px] lg:leading-[75px] font-bold ">
                  {t(
                    order.inCreated
                      ? 'orderDetailModalSendFund'
                      : 'creatingOrderPathway',
                  )}
                </div>
                {order.inCreated ? (
                  <>
                    <div className="flex relative justify-center items-center flex-col lg:px-[30px] lg:py-[10px] lg:gap-[20px] gap-[10px] w-full">
                      <div className="text-center w-full lg:text-[17px] text-[15px] leading-[21px] font-medium rainbow-text">
                        {t('orderDetailModalFollowSteps')}
                      </div>
                      <MetalboarderedRoundbox>
                        <div className="flex flex-row flex-wrap sm:flex-nowrap w-full justify-center sm:justify-start items-center ml-4 gap-4 mr-auto">
                          <div className="text-sm">
                            {t('orderDetailModalSend')}
                          </div>
                          <div className="flex flex-row w-full lg:w-auto justify-center items-center">
                            <div className="flex flex-row justify-center items-center gap-2">
                              <div className="text-sm whitespace-nowrap">
                                {order.inAmount}
                              </div>
                              <img
                                alt="inSymbol"
                                src={findTokenById(order?.inSymbol)?.icon}
                                className="w-[20px] h-[20px]"
                              />
                              <div className="text-sm whitespace-nowrap">
                                {findTokenById(order?.inSymbol)?.displayName}
                              </div>
                              <div>to:</div>
                            </div>
                          </div>
                          <div className="flex flex-row flex-wrap justify-center items-center mr-4">
                            <Clipboardbox
                              concept={`${recipientAddress}`}
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

                      <div className="hidden sm:block">
                        <Countdown order={order} setMinutes={setMinutes} />
                      </div>

                      {getTokenDetails(order?.inSymbol)?.chain ? (
                        <WalletRoundbox>
                          <div className="relative flex hover:cursor-pointer flex-row justify-center items-center custom-wallet-shadow gap-2 custom-wallet-gradient rounded-[15px] w-[125px] h-[44px] p-[10px] bg-gradient-to-r">
                            <OpenWallet
                              amount={order?.inAmount}
                              to={order?.senderAddress}
                              token={{
                                token: getTokenDetails(order?.inSymbol),
                              }}
                              setIsLoading={setIsLoading}
                              orderStatus={order?.status}
                              orderId={order?.houdiniId}
                            />
                          </div>
                        </WalletRoundbox>
                      ) : null}
                    </div>
                    <div className="sm:hidden flex flex-wrap justify-center gap-[10px]">
                      <Countdown order={order} setMinutes={setMinutes} />
                    </div>
                    <BulletButtons
                      className="mt-4"
                      order={order}
                      currentStep={currentStep}
                      setCurrentStep={setCurrentStep}
                    />
                  </>
                ) : null}
              </IndustrialCounterLockup>
            ) : (
              <IndustrialCounterLockup>
                <div className="flex flex-col w-full items-center justify-center">
                  <div className="items-center w-full justify-center">
                    <MetalboarderedTransRoundbox>
                      <div className="relative flex flex-col lg:flex-row py-[30px] gap-4">
                        <OrderProgress order={order} />
                      </div>
                    </MetalboarderedTransRoundbox>
                  </div>
                  {isExpired ? (
                    <MetalboarderedTransRoundbox>
                      <h2 className="text-xl mx-[50px] md:mx-[100px] my-[20px] text-center">
                        {t('orderExpired')}
                      </h2>
                      <div className="relative hover:cursor-pointer flex flex-row justify-center items-center custom-wallet-shadow gap-2 custom-wallet-gradient rounded-[15px] w-[125px] h-[44px] p-[10px] bg-gradient-to-r mb-[20px]">
                        <div
                          onClick={() => {
                            setConfirmDepositModal(true)
                          }}
                          className="text-center lg:text-[15px] lg:font-bold font-medium whitespace-nowrap"
                        >
                          {t('alertSupport')}
                        </div>
                      </div>
                    </MetalboarderedTransRoundbox>
                  ) : null}

                  <MetalboarderedTransRoundbox>
                    {status === 4 ? (
                      <div className="flex flex-row justify-center items-center gap-[32px] px-[60px] py-[10px] h-full">
                        <div
                          onClick={() => {
                            setEraseModal(true)
                          }}
                          className="text-center hover:cursor-pointer md:text-[19px] md:leading-[24px] font-medium rainbow-text md:whitespace-nowrap"
                        >
                          Delete Order
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-row justify-center items-center gap-[32px] px-[60px] py-[10px] h-full">
                        <div className="text-center md:text-[19px] md:leading-[24px] font-medium rainbow-text md:whitespace-nowrap">
                          {t('orderDetailsModalTodaysAverageSwapTime')}:
                        </div>
                        <div className="text-center md:text-[19px] md:leading-[24px] font-bold md:whitespace-nowrap">
                          {`${swapTime} ${t('orderDetailsSwapTimeMinute')}`}
                        </div>
                      </div>
                    )}
                  </MetalboarderedTransRoundbox>
                  <BulletButtons
                    className="mt-6"
                    order={order}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                  />
                  <TransactionHash order={order} />
                </div>
              </IndustrialCounterLockup>
            )}
          </motion.div>

          {order.inCreated ? (
            <>
              {status === 0 || status === -1 ? (
                <div className="pt-[15px] lg:px-[10px] pb-[5px] w-full">
                  <div className="p-[2px] w-full rounded-[20px] custom-houdini-id-gradient1">
                    <div className="flex flex-wrap lg:justify-between justify-center items-center rounded-[20px] w-full custom-houdini-id-gradient custom-houdini-id-shadow lg:px-[30px] px-[5px] py-[10px]">
                      <div className="sm:flex block lg:w-auto w-full lg:justify-start justify-center px-[4px] gap-2">
                        <div className="text-center lg:text-[15px] whitespace-nowrap lg:leading-[24px] text-[14px] font-bold text-opacity-60 text-[#FFFFFF99]">
                          {t('orderDetailModalRecipientWallet')}:
                        </div>
                        <div className="text-center overflow-hidden text-xs lg:text-[15px] lg:leading-[24px] text-[13px] font-normal text-opacity-50 text-[#FFFFFF99]">
                          <Link
                            href={`${getAddressUrl(
                              order.outSymbol,
                            )}${receiveAddress}`}
                            target="_blank"
                          >
                            {getEllipsisTxt(receiveAddress)}
                          </Link>
                        </div>
                      </div>
                      <div className="flex lg:w-[40%] lg:justify-start justify-center flex-row items-center gap-2.5 px-[4px]">
                        <div className="text-center whitespace-nowrap lg:text-[15px] lg:leading-[24px] text-[14px] font-normal text-opacity-50 text-[#FFFFFF99]">
                          {t('orderDetailModalWillReceive')}
                        </div>
                        <div className="flex gap-2.5 items-center">
                          <div className="text-center lg:text-[15px] text-[14px] font-normal">
                            {order.outAmount}
                          </div>
                          <img
                            alt="outSymbol"
                            src={findTokenById(order?.outSymbol)?.icon}
                            className="w-[20px] h-[20px]"
                          />
                          <div className="text-base whitespace-nowrap text-center lg:text-[15px] text-[14px] font-normal">
                            {findTokenById(order?.outSymbol)?.displayName}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <CheckBox
                          defaultValue={order?.anonymous}
                          leftText=""
                          name="privateToggler"
                          rightText=""
                          disabled={true}
                        />
                        <div className="text-xs whitespace-nowrap">
                          SEMI-PRIVATE
                        </div>
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
                          {getEllipsisTxt(recipientAddress)}
                        </div>
                      </div>
                      <div className="flex lg:w-[40%] lg:justify-start justify-center flex-row items-center gap-2.5 px-[4px]">
                        <div className="flex gap-2.5 items-center">
                          <div className="text-center lg:text-[15px] text-[14px] font-normal">
                            {order.inAmount}
                          </div>
                          <img
                            alt="inSymbol"
                            src={findTokenById(order?.inSymbol)?.icon}
                            className="w-[20px] h-[20px]"
                          />
                          <div className="text-base text-center whitespace-nowrap lg:text-[15px] text-[14px] font-normal">
                            {order?.inSymbol}
                          </div>
                        </div>
                        <SwapSvg className="min-w-[15px] min-h-[15px]" />
                        <div className="flex gap-2.5 items-center">
                          <div className="text-center lg:text-[15px] text-[14px] font-normal">
                            {order.outAmount}
                          </div>
                          <img
                            alt="outSymbol"
                            src={findTokenById(order?.outSymbol)?.icon}
                            className="w-[20px] h-[20px]"
                          />
                          <div className="text-base text-center whitespace-nowrap lg:text-[15px] text-[14px] font-normal">
                            {order?.outSymbol}
                          </div>
                        </div>
                      </div>
                      <div className="px-[4px] flex flex-row justify-start whitespace-nowrap items-center gap-2">
                        <div>Status:</div>
                        <div>{ORDER_STATUS_FAKE[order?.status]}</div>
                      </div>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <CheckBox
                          defaultValue={order?.anonymous}
                          leftText=""
                          name="privateToggler"
                          rightText=""
                          disabled={true}
                        />
                        <div className="text-xs whitespace-nowrap">
                          SEMI-PRIVATE
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : null}
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
                      senderAddress={receiveAddress}
                    />
                  </div>
                </div>
              </motion.div>
            </Portal>
          ) : null}
        </AnimatePresence>

        <ConfirmDeposit
          confirmDepositModal={confirmDepositModal}
          setConfirmDepositModal={setConfirmDepositModal}
          houdiniId={order?.houdiniId}
        />
        <EraseOrder
          eraseModal={eraseModal}
          setEraseModal={setEraseModal}
          houdiniId={order?.houdiniId}
        />
      </div>
    )
  }
}
