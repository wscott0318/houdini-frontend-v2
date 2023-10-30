'use client'

import magic from '@/assets/magic.png'
import secure from '@/assets/secure.png'
import send from '@/assets/send.png'
import swap from '@/assets/swap.png'
import { Accordion } from '@/components/Accordion'
import { ResponsivePage } from '@/components/ResponsivePage'
import Image from 'next/image'

const faqs = [
  {
    title: 'How does Houdini Swap work?',
    content: <>A</>,
  },
  {
    title: 'What are private transactions, why would I use them?',
    content: <>B</>,
  },
  {
    title: 'Why can I trust Houdini Swap?',
    content: <>C</>,
  },
  {
    title: 'How does Houdini Swap work?',
    content: <>C</>,
  },
  {
    title: 'Is Houdini Swap truly anonymous?',
    content: <>C</>,
  },
  {
    title: 'How long will my transaction take to complete?',
    content: <>C</>,
  },
  {
    title: 'Is Houdini Swap compliant?',
    content: <>C</>,
  },
  {
    title: 'Is Houdini Swap a crypto mixer?',
    content: <>C</>,
  },
  {
    title: 'What transaction data does Houdini Swap and its exchanges store?',
    content: <>C</>,
  },
  {
    title: 'How long will my transaction take to complete?',
    content: <>C</>,
  },
  {
    title: 'How is Average Transaction Time calculated?',
    content: <>C</>,
  },
  {
    title: 'What fees does Houdini Swap charge me?',
    content: <>C</>,
  },
  {
    title: 'What are Variable and Fixed rates?',
    content: <>C</>,
  },
  {
    title: 'Do I need to connect my wallet?',
    content: <>C</>,
  },
  {
    title: 'What KYC and AML requirements are there?',
    content: <>C</>,
  },
  {
    title:
      'I sent my funds, it now says ‘Order Expired’, are my funds at risk?',
    content: <>C</>,
  },
  {
    title: 'What if I accidentally sent the wrong currency?',
    content: <>C</>,
  },
  {
    title:
      'What if my order status shows it completed yet funds are not received?',
    content: <>C</>,
  },
  {
    title: 'What is Multi Send?',
    content: <>C</>,
  },
  {
    title: 'How can I find my order details again?',
    content: <>C</>,
  },
  {
    title: 'How can I reach you about a business proposal?',
    content: <>C</>,
  },
]

export default function HowItWorks() {
  return (
    <ResponsivePage>
      <div className="flex flex-col justify-center items-center">
        <div className="lg:text-[81px] text-center text-[35px] font-bold leading-normal capitalize tracking-[-0.85px]">
          What Happens Under The Hood
        </div>
        <div className="flex flex-col font-normal text-[19px] leading-[30px] items-center justify-center text-[#B8CAFC] text-center">
          How Houdini Swap Severs Any Connection Between The Sending And
          Receiving Wallets
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-10">
        <div className="custom-shadow custom-gradient relative flex flex-col justify-center items-start p-6 gap-4 w-[300px] rounded-[58px] h-[260px]">
          <div className="text-[31px] font-medium leading-[48px]">Swap</div>
          <div className="text-base text-center w-full leading-[30px] text-[#B8CAFC]">
            Anonymizes by swapping to Monero on the first exchange
          </div>
          <Image
            src={send}
            width={200}
            height={150}
            alt="swapImg"
            className="absolute -right-10 -top-12"
          />
        </div>
        <div className="custom-shadow custom-gradient relative flex flex-col justify-center items-start p-6 gap-4 w-[300px] rounded-[58px] h-[260px]">
          <div className="text-[31px] font-medium leading-[48px]">Send</div>
          <div className="text-base text-center w-full leading-[30px] text-[#B8CAFC]">
            Sends the swapped Monero to the second exchange
          </div>
          <Image
            src={secure}
            width={190}
            height={130}
            alt="secureImg"
            className="absolute -right-10 -top-12"
          />
        </div>
        <div className="custom-shadow custom-gradient relative flex flex-col justify-center items-start p-6 gap-4 w-[300px] rounded-[58px] h-[260px]">
          <div className="text-[31px] font-medium leading-[48px]">Secure</div>
          <div className="text-base text-center w-full leading-[30px] text-[#B8CAFC]">
            The second exchange swaps Monero to receiving currency
          </div>
          <Image
            src={swap}
            width={230}
            height={170}
            alt="swapImg"
            className="absolute -right-10 -top-12"
          />
        </div>
        <div className="custom-shadow custom-gradient relative flex flex-col justify-center items-start p-6 gap-4 w-[300px] rounded-[58px] h-[260px]">
          <div className="text-[31px] font-medium leading-[48px]">Magic</div>
          <div className="text-base text-center w-full leading-[30px] text-[#B8CAFC]">
            The receiving currency is sent to the receiving wallet.
          </div>
          <Image
            src={magic}
            width={170}
            height={190}
            alt="magicImg"
            className="absolute -right-6 -top-20"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-start gap-10 w-[653px] h-[563px] border-[3px] custom-shadow custom-gradient p-[60px] rounded-[58px] border-black">
        <div className="text-[73px] leading-[93px] font-extrabold">
          Why We Exist
        </div>
        <div className="text-[22px] leading-[36px] font-bold gradient-text">
          Privacy is Security.
        </div>
        <div className="flex flex-col justify-center font-normal items-start gap-4 text-[#B8CAFC] text-[19px] leading-[30px]">
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
      <div className="lg:text-[81px] text-center text-[35px] font-bold leading-normal capitalize tracking-[-0.85px]">
        FAQ
      </div>

      <div>
        {faqs.map((elem, index) => (
          <Accordion key={index} title={elem.title} content={elem.content} />
        ))}
      </div>
    </ResponsivePage>
  )
}
