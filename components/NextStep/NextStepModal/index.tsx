import {
    Protocol7Svg,
    Protocol4Svg,
    QuestionSvg,
    QRCodeSvg,
} from '@/components/Svg'
import { GeneralModal } from '@/components/GeneralModal'
import { OrderDetailRoundbox } from '@/components/GeneralModal/OrderDetailRoundbox'
import { WalletRoundbox } from '@/components/GeneralModal/WalletRoundbox'
import { Clipboardbox } from '@/components/GeneralModal/Clipboardbox'
import { MetalboarderedRoundbox } from '@/components/GeneralModal/MetalboarderedRoundbox'
import { IndustrialCounterLockup } from '@/components/GeneralModal/IndustrialCounterLockup'
import { useTranslation } from 'react-i18next'

interface OrderDetailModalProps {
    orderID: string,
    creationTime: Date,
    sendAmount: number,
    receiveAddress: string,
    deliveryTime: string,
    recipientAddress: string,
    receiveAmount: number,
    tokenType: string,
}

export const OrderDetailModal = (props: OrderDetailModalProps) => {
    const { t } = useTranslation();
    const DateFormatter = () => {
        const date = props.creationTime;
        const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const formattedDate = formatter.format(date);
        return formattedDate;
    }
    const TimeFormatter = () => {
        const date = props.creationTime;
        const formatter = new Intl.DateTimeFormat('en-US', { 
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hourCycle: "h23",
         });
        const formattedTime = formatter.format(date);
        return formattedTime;
    }
    return(
        <GeneralModal>
          <div className="md:flex md:flex-row block md:justify-between lg:gap-0 gap-[5px] items-center justify-center w-full px-[10px] py-[5px]">
            <div className="md:w-35% sm:w-50%">
                <OrderDetailRoundbox border='custom-houdini-id-gradient1'>
                    <div className="text-center lg:text-[15.25px] text-[12px] font-bold text-[#FFFFFF] text-opacity-60">
                        { t("orderDetailModalOrderID") }
                    </div>
                    <Clipboardbox concept={`${props.orderID}`} fontSize="lg:text-[15.25px] text-[12px]" textColor="text-[#FFFFFF99]"/>
                </OrderDetailRoundbox>
            </div>
            <div className="md:w-10% md:pt-0 pt-[5px] sm:w-50%">
                <OrderDetailRoundbox border='custom-houdini-id-gradient1'>
                    <div className="text-center lg:text-[14.88px] text-[12px] text-[#FFFFFF] leading-[24px] text-opacity-60 font-bold">
                        { t("orderDetailModalCreationTime") }:
                    </div>
                    <div className="text-center lg:text-[15.25px] text-[12px] text-[#FFFFFF] leading-[24px] text-opacity-50 font-normal">
                        {`${DateFormatter()}, ${TimeFormatter()}`}
                    </div>
                </OrderDetailRoundbox>
            </div>
          </div>
  
          <IndustrialCounterLockup>
            <div className="text-center w-full lg:text-[46px] text-[20px] lg:leading-[75.43px] font-bold ">
                { t("orderDetailModalSendFund") }
            </div>
            <div className="flex flex-col lg:px-[30px] lg:py-[10px] lg:gap-[20px] gap-[10px] w-full">
                <div className="text-center w-full lg:text-[17px] text-[15px] leading-[21.42px] font-medium rainbow-text">
                    { t("orderDetailModalFollowSteps") }
                </div>
                <MetalboarderedRoundbox>
                    <div className="text-center w-full leading-[24px] lg:text-[18px] text-[14px] font-bold">
                        { t("orderDetailModalSend") }
                    </div>
                    <div className="flex flex-row w-full justify-center items-center gap-[10px]">
                      <Protocol7Svg width={64} height={64}/>
                      <div className="flex flex-row gap-[20px] justify-center items-center">
                          <div className="text-center leading-[24px] lg:text-[20px] text-[14px] font-semibold ">ETH(ERC-20)</div>
                          <Clipboardbox concept={`${props.sendAmount}`} textColor="text-[#FBBF24]" fontSize="lg:text-[20px] text-[14px]" fontWeight="text-semibold" lineHeight="leading-[24px]"/>
                      </div>
                    </div>
                </MetalboarderedRoundbox>
  
                <MetalboarderedRoundbox>
                    <div className="text-center leading-[24px] lg:text-[18px] text-[14px] font-bold">
                        { t("orderDetailModalTargetAddress") }
                    </div>
                    <div className="flex flex-row gap-[20px] lg:py-[10px] py-[5px] justify-center items-center">
                        <Clipboardbox concept={`${props.receiveAddress}`} textColor="text-[#FBBF24]" fontSize="lg:text-[20px] text-[14px]" fontWeight="text-semibold" lineHeight="leading-[24px]"/>
                    </div>
                </MetalboarderedRoundbox>
            </div>
            <div className="lg:flex lg:flex-row flex justify-between w-full items-center px-[30px] lg:pt-5 pt-[10px] left-0">
                <WalletRoundbox>
                    <div className="relative flex flex-row justify-center items-center custom-wallet-shadow custom-wallet-gradient rounded-[15px] w-[110px] h-[88px] bg-red-900 p-2.5 bg-gradient-to-r from">
                        <div className="flex flex-row justify-center items-center lg:py-[10px] py-[5px]">
                            <QRCodeSvg width={48} height={48}/>
                        </div>
                        <div className="absolute flex flex-row top-5 right-2.5">
                            <QuestionSvg />
                        </div>
                    </div>
                </WalletRoundbox>
  
                <div className="hidden sm:flex sm:flex-wrap justify-center gap-[10px]">
                    <div className="text-center lg:text-[20px] lg:leading-[24px] lg:font-semibold">
                        { t("orderDetailModalSendFundsBy") }
                    </div>
                    <div className="text-center lg:text-[20px] lg:leading-[24px] text-[#FBBF24] lg:font-semibold">
                        {`${props.deliveryTime}`}
                    </div>
                </div>

                <WalletRoundbox>
                    <div className="relative flex flex-row justify-center items-center custom-wallet-shadow custom-wallet-gradient rounded-[15px] w-[118px] h-[88px] bg-red-900 px-[10px] py-[20px] bg-gradient-to-r from">
                        <div className="text-center lg:text-[15.5px] lg:font-bold font-medium">
                           { t("orderDetailModalOpenWallet") }
                        </div>
                        <div className="absolute flex flex-row top-5 right-2.5">
                            <QuestionSvg />
                        </div>
                    </div>
                </WalletRoundbox>
            </div>
            <div className="visible sm:hidden flex flex-wrap justify-center gap-[10px]">
                    <div className="text-center lg:text-[20px] lg:leading-[24px] lg:font-semibold">
                        { t("orderDetailModalSendFundsBy") }
                    </div>
                    <div className="text-center lg:text-[20px] lg:leading-[24px] text-[#FBBF24] lg:font-semibold">
                        {`${props.deliveryTime}`}
                    </div>
                </div>
          </IndustrialCounterLockup>
          
          <div className="pt-[15px] lg:px-[10px] pb-[5px] w-full">
            <div className="p-[2.5px] w-full rounded-[20px] custom-houdini-id-gradient1">
                <div className="lg:flex flex-wrap lg:justify-between justify-center items-center rounded-[20px] w-full custom-houdini-id-gradient custom-houdini-id-shadow lg:px-[30px] px-[5px] py-[10px]">
                    <div className='sm:flex block lg:w-[60%] w-full lg:justify-between justify-center px-[4px] gap-4'>
                        <div className="text-center lg:text-[15.25px] lg:leading-[24px] text-[14px] font-bold text-opacity-60 text-[#FFFFFF99]">
                            { t("orderDetailModalRecipientWallet") }
                        </div>
                        <div className="text-center overflow-hidden text-xs lg:text-[15px] lg:leading-[24px] text-[13px] font-normal text-opacity-50 text-[#FFFFFF99]">
                            {`${props.recipientAddress}`}
                        </div>
                    </div>
                    <div className="flex lg:w-[40%] lg:justify-between justify-center flex-row items-center gap-2.5 px-[4px]">
                        <div className=" text-cente lg:text-[15.25px] lg:leading-[24px] text-[14px] font-normal text-opacity-50 lg:pl-[60px] text-[#FFFFFF99]">
                            { t("orderDetailModalWillReceive") }
                        </div>
                        <div className='flex gap-2.5 items-center'>
                            <div className="text-center lg:text-[15.25px] text-[14px] font-normal">
                                {`${props.receiveAmount}`}
                            </div>
                            <Protocol4Svg />
                            <div className="text-base text-center lg:text-[15.25px] text-[14px] font-normal">
                                {`${props.tokenType}`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </GeneralModal>
    )
  }
