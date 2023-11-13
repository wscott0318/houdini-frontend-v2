import magic from '@/assets/magic.png'
import secure from '@/assets/secure.png'
import send from '@/assets/send.png'
import swap from '@/assets/swap.png'
import Image from 'next/image'

export const HowItWorks = () => {
  return (
    <>
      <div
        id="howItWorks"
        className="flex flex-col justify-center items-center gap-[19px] lg:gap-[10px]"
      >
        <div className="lg:text-[81px] text-center text-[35px] font-bold leading-normal capitalize tracking-[-0.85px]">
          What Happens Under The Hood
        </div>
        <div className="flex flex-col font-normal text-[18px] lg:text-[19px] leading-[30px] items-center justify-center text-[#B8CAFC] text-center">
          How Houdini Swap Severs Any Connection Between The Sending And
          Receiving Wallets
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        <div className="custom-shadow custom-gradient relative flex flex-col justify-center items-start p-6 gap-4 lg:w-[300px] rounded-[58px] w-full h-[200px] lg:h-[260px]">
          <div className="text-[31px] font-medium leading-[48px]">Swap</div>
          <div className="text-base text-center w-full leading-[30px] text-[#B8CAFC]">
            Anonymizes by swapping to Monero on the first exchange
          </div>
          <Image
            src={send}
            width={200}
            height={150}
            alt="swapImg"
            className="absolute -right-6 lg:-right-10 -top-8 lg:-top-12 lg:w-[200px] w-[150px]"
          />
        </div>
        <div className="custom-shadow custom-gradient relative flex flex-col justify-center items-start p-6 gap-4 lg:w-[300px] rounded-[58px] w-full h-[200px] lg:h-[260px]">
          <div className="text-[31px] font-medium leading-[48px]">Send</div>
          <div className="text-base text-center w-full leading-[30px] text-[#B8CAFC]">
            Sends the swapped Monero to the second exchange
          </div>
          <Image
            src={secure}
            width={200}
            height={150}
            alt="secureImg"
            className="absolute -right-6 lg:-right-10 -top-8 lg:-top-12 lg:w-[200px] w-[150px]"
          />
        </div>
        <div className="custom-shadow custom-gradient relative flex flex-col justify-center items-start p-6 gap-4 lg:w-[300px] rounded-[58px] w-full h-[200px] lg:h-[260px]">
          <div className="text-[31px] font-medium leading-[48px]">Secure</div>
          <div className="text-base text-center w-full leading-[30px] text-[#B8CAFC]">
            The second exchange swaps Monero to receiving currency
          </div>
          <Image
            src={swap}
            width={200}
            height={150}
            alt="swapImg"
            className="absolute -right-6 lg:-right-10 -top-8 lg:-top-12 lg:w-[200px] w-[150px]"
          />
        </div>
        <div className="custom-shadow custom-gradient relative flex flex-col justify-center items-start p-6 gap-4 lg:w-[300px] rounded-[58px] w-full h-[200px] lg:h-[260px]">
          <div className="text-[31px] font-medium leading-[48px]">Magic</div>
          <div className="text-base text-center w-full leading-[30px] text-[#B8CAFC]">
            The receiving currency is sent to the receiving wallet.
          </div>
          <Image
            src={magic}
            width={200}
            height={150}
            alt="magicImg"
            className="absolute -right-6 lg:-right-10 -top-8 lg:-top-12 lg:w-[200px] w-[150px]"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center lg:items-start w-full h-[700px] gap-10 lg:w-[653px] lg:h-[563px] border-[1px] custom-shadow custom-gradient px-6 lg:p-[60px] rounded-[20px] lg:rounded-[58px] border-black">
        <div className="text-[35px] lg:text-[73px] leading-[54px] text-center lg:text-left lg:leading-[93px] font-extrabold">
          Why We Exist
        </div>
        <div className="text-[22px] leading-[36px] font-bold text-center lg:text-left gradient-text">
          Privacy is Security.
        </div>
        <div className="flex flex-col justify-center font-normal text-center lg:text-left items-start gap-4 text-[#B8CAFC] text-[19px] leading-[30px]">
          <div>
            Everyone you transact with can potentially see your wallet’s assets
            and transaction history, which is intrusive and potentially
            dangerous.
          </div>
          <div>
            Houdini Swap solves this problem with private transactions that
            protect your financial data. Simple to use, compliant, with great
            customer service at the lowest cost.
          </div>
          <div>Welcome to crypto’s next evolution.</div>
        </div>
      </div>
    </>
  )
}
