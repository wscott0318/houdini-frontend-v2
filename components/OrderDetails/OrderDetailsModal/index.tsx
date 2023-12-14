import { GeneralModal } from "@/components/GeneralModal"
import { OrderDetailRoundbox } from "@/components/GeneralModal/OrderDetailRoundbox";
import { Clipboardbox } from "@/components/GeneralModal/Clipboardbox";
import { IndustrialCounterLockup } from "@/components/GeneralModal/IndustrialCounterLockup";
import { MetalboarderedTransRoundbox } from "@/components/GeneralModal/MetalboarderedTransRoundbox";
import { useTranslation } from "react-i18next";
import {
  Protocol4Svg
} from '@/components/Svg';
import ProgressProvider from "@/components/GeneralModal/ProgressProvider";

interface OrderDetailsModalProps {
    orderId: string,
    creationTime: Date,
    recipientWallet: string,
    receiveAmount: number,
    tokenType: string,
    swapTime: number,
}

export const OrderDetailsModal = (props: OrderDetailsModalProps) => {
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
    return (
        <GeneralModal>
          <div className="md:flex md:flex-row block md:justify-between lg:gap-0 gap-[5px] items-center justify-center w-full px-[10px] py-[5px]">
            <div className="md:w-35% sm:w-50%">
                <OrderDetailRoundbox border="custom-step-gradient1">
                    <div className="text-center lg:text-[15.25px] text-[12px] font-bold text-[#FFFFFF] text-opacity-60">
                        { t("orderDetailModalOrderID") }
                    </div>
                    <Clipboardbox concept={`${props.orderId}`} fontSize="lg:text-[15.25px] text-[12px]" textColor="text-[#FFFFFF99]"/>
                </OrderDetailRoundbox>
            </div>
            <div className="md:w-10% md:pt-0 pt-[5px] sm:w-50%">
                <OrderDetailRoundbox border="custom-step-gradient1">
                    <div className="text-center lg:text-[14.88px] text-[12px] text-[#FFFFFF] leading-[24px] text-opacity-60 font-bold">
                        { t("orderDetailModalCreationTime") }
                    </div>
                    <div className="text-center lg:text-[15.25px] text-[12px] text-[#FFFFFF] leading-[24px] text-opacity-50 font-normal">
                      {`${DateFormatter()}, ${TimeFormatter()}`}
                    </div>
                </OrderDetailRoundbox>
            </div>
          </div>
          <IndustrialCounterLockup>
            <div className="flex flex-col items-center justify-center gap-[20px] px-[20px]">
              <div className="items-center w-full">
                <MetalboarderedTransRoundbox>
                  <div className="relative flex flex-row gap-[32px] px-[50px] py-[30px]">
                    <ProgressProvider valueStart={0} valueEnd={100}></ProgressProvider>
                    <ProgressProvider valueStart={0} valueEnd={100}></ProgressProvider>
                    <ProgressProvider valueStart={10} valueEnd={40}></ProgressProvider>
                    <ProgressProvider valueStart={90} valueEnd={50}></ProgressProvider>
                    <ProgressProvider valueStart={0} valueEnd={0}></ProgressProvider>
                  </div>
                </MetalboarderedTransRoundbox>
              </div>
              <MetalboarderedTransRoundbox>
                <div className="flex flex-row gap-[32px] px-[60px] py-[10px] w-full h-full">
                  <div className="text-center text-[19px] leading-[23.94px] font-medium rainbow-text whitespace-nowrap">
                    { t("orderDetailsModalTodaysAverageSwapTime") }
                  </div>
                  <div className="text-center text-[19px] leading-[23.94px] font-bold whitespace-nowrap">
                    {`${props.swapTime} ${t("orderDetailsSwapTimeMinute")}`}
                  </div>
                </div>
              </MetalboarderedTransRoundbox>
            </div>
          </IndustrialCounterLockup>
          
          <div className="pt-[15px] lg:px-[10px] pb-[5px] w-full">
            <div className="p-[2.5px] w-full rounded-[20px] custom-houdini-id-gradient1">
                <div className="lg:flex flex-wrap lg:justify-between justify-center items-center rounded-[20px] w-full custom-houdini-id-gradient custom-houdini-id-shadow lg:px-[30px] px-[5px] py-[10px]">
                    <div className='sm:flex block lg:w-[60%] w-full lg:justify-between justify-center px-[4px] gap-4'>
                        <div className="text-center lg:text-[15.25px] lg:leading-[24px] text-[14px] font-bold text-opacity-60 text-[#FFFFFF99]">
                            { t("orderDetailModalRecipientWallet") }
                        </div>
                        <div className="text-center lg:text-[14.88px] lg:leading-[24px] text-[13px] font-normal text-opacity-50 text-[#FFFFFF99]">
                            {`${props.recipientWallet}`}
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
  