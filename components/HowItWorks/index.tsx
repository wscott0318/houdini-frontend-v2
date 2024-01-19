import { CardComponent } from 'houdini-react-sdk'
import Image from 'next/image'

import magic from '@/assets/magic.png'
import secure from '@/assets/secure.png'
import send from '@/assets/send.png'
import swap from '@/assets/swap.png'
import { useWindowSize } from '@/hooks'

const cardData = [
  {
    title: 'Swap',
    description: 'Anonymizes by swapping to Monero on the first exchange',
    imgSrc: send,
    imgAlt: 'swapImg',
  },
  {
    title: 'Send',
    description: 'Sends the swapped Monero to the second exchange',
    imgSrc: secure,
    imgAlt: 'secureImg',
  },
  {
    title: 'Secure',
    description: 'The second exchange swaps Monero to receiving currency',
    imgSrc: swap,
    imgAlt: 'swapImg',
  },
  {
    title: 'Magic',
    description: 'The receiving currency is sent to the receiving wallet.',
    imgSrc: magic,
    imgAlt: 'magicImg',
  },
]

export const HowItWorks = () => {
  const [width] = useWindowSize()

  return (
    <>
      <div
        id="howItWorks"
        className="flex flex-col justify-center items-center gap-[19px] lg:gap-[10px]"
      >
        <div className="lg:text-[81px] text-center text-[35px] font-bold leading-normal capitalize tracking-[-0px]">
          What Happens Under The Hood
        </div>
        <div className="flex flex-col font-normal text-[18px] lg:text-[19px] leading-[30px] items-center justify-center text-[#B8CAFC] text-center">
          How Houdini Swap Severs Any Connection Between The Sending And
          Receiving Wallets
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-3">
        {cardData.map((card, index) => (
          <div className="relative" key={index}>
            <CardComponent heightClass="260px" widthClass="300px">
              <div
                className={`${
                  index % 2 === 0 && width < 1024
                    ? 'ml-auto mr-0'
                    : 'mr-auto ml-0'
                } text-[31px] font-medium leading-[48px] lg:mr-auto lg:ml-0`}
              >
                {card.title}
              </div>
              <div className="text-base text-center w-full leading-[30px] text-[#B8CAFC]">
                {card.description}
              </div>
              <Image
                src={card.imgSrc}
                width={200}
                height={150}
                alt={card.imgAlt}
                className={`${
                  index % 2 === 0 && width < 1024 ? '-left-6' : '-right-6'
                } absolute block lg:-right-12 last:-top-14 -top-8 lg:-top-20 lg:w-[200px] w-[150px] last:lg:-top-24 lg:left-auto`}
              />
            </CardComponent>
          </div>
        ))}
      </div>
      <CardComponent>
        <div className="flex flex-col justify-center items-center lg:items-start w-full h-full gap-10 lg:w-[653px] lg:h-[563px] px-6 lg:p-[60px] rounded-[20px] lg:rounded-[58px]">
          <div className="text-[35px] lg:text-[73px] leading-[54px] text-center lg:text-left lg:leading-[93px] font-extrabold">
            Why We Exist
          </div>
          <div className="text-[22px] leading-[36px] font-bold text-center lg:text-left gradient-text">
            Privacy is Security.
          </div>
          <div className="flex flex-col justify-center font-normal text-center lg:text-left items-start gap-4 text-[#B8CAFC] text-[19px] leading-[30px]">
            <div>
              Everyone you transact with can potentially see your wallet’s
              assets and transaction history, which is intrusive and potentially
              dangerous.
            </div>
            <div>
              Houdini Swap solves this problem with private transactions that
              protect your financial data. Simple to use, compliant, with great
              customer service at the lowest cost.
            </div>
            <div className="w-full text-center">
              Welcome to crypto’s next evolution.
            </div>
          </div>
        </div>
      </CardComponent>
    </>
  )
}
