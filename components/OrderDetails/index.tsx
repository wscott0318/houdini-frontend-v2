import { NeedHelp } from "@/components/NeedHelp"
import { OrderDetailsModal } from "./OrderDetailsModal"

export const OrderDetails = () => {
  return (
    <>
      <div
        id="orderdetails"
        className="flex flex-col justify-center items-center gap-[30px] lg:gap-[10px]"
      >
        <div className="lg:text-[81px] text-center font-bold leading-[102.06px] capitalize tracking-[-0.85px]">
          Working Our Magic
        </div>
        <div className="flex flex-col font-normal lg:text-[19px] leading-[30px] items-center justify-center text-[#B8CAFC] text-center">
          Your transaction is being processed
        </div>
      </div>

      <div className="flex flex-col pb-[165px]">
        <div className="flex flex-col items-center gap-[10px]">
          <OrderDetailsModal
            receiveAmount={175.7936}
            recipientWallet="0xferv3552mnjud953234sddn2323434bdffswfd8"
            creationTime={new Date("1/10/2023, 20:54:43")}
            orderId="pR7h3raq71otwFuCqvSpqf"
          />
          <div className="flex px-[100px] py-[50px] items-center">
            <div className="flex px-[100px] py-[20px] items-center">
              <NeedHelp/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
