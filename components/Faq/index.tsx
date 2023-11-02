import Link from 'next/link'

import { Accordion } from '../Accordion'

export const Faq = () => {
  const faqs = [
    {
      title: 'How does Houdini Swap work?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          <div>
            To privately swap, send or bridge choose between any pair of
            cryptocurrencies
          </div>
          <div className="text-2xl font-bold">Swap - Send - Bridge</div>
          <div className="font-bold">Enter the amount being transferred</div>
          <div>
            If the amount received is to be defined use Fixed instead of
            Variable Houdini Swap will compare rates and optimize for the lowest
            cost
          </div>
          <div className="font-bold">Enter the receiving wallet address</div>
          <div>
            Ensure the receiving wallet address is on the same blockchain as the
            receiving currency
          </div>
          <div className="text-2xl font-bold">Send Funds to Start Order</div>
          <div className="font-bold">
            Send the entered amount of cryptocurrency to the Houdini Swap
            address
          </div>
          <div>
            Open your wallet and send the amount of cryptocurrency entered in
            Houdiniswap to the address on this page. For enhanced security, you
            are not required to connect your wallet
          </div>
          <div className="text-2xl font-bold">Working Our Magic</div>
          <div>
            On average it takes 20- 40 minutes for a transaction to complete.
          </div>
          <div>Please follow your progress here.</div>
          <div className="font-bold">Still need help? Contact support</div>
          <div>
            If you have an Order ID please provide it so we can follow this up
            quickly for you.
          </div>
        </div>
      ),
    },
    {
      title: 'What are private transactions, why would I use them?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          <div>
            Private transactions are cryptocurrency transactions where one of
            both parties involved are unable to see or trace the other’s wallet
            address.
          </div>
          <div>
            When sending and receiving crypto your wallet address is revealed to
            the other party. It means everyone you transact with can search this
            address and easily see the contents of your wallet plus its entire
            financial history in perpetuity. Such exposure creates the same
            issues and risks that would arise if you were to reveal your
            traditional bank accounts details to everyone you transacted with.
          </div>
        </div>
      ),
    },
    {
      title: 'Why can I trust Houdini Swap?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          <div>
            Houdini Swap is powered by{' '}
            <Link
              href="https://xblock.tech"
              target="_blank"
              className="font-bold"
            >
              xBlock
            </Link>{' '}
            , the leading, enterprise grade transactional privacy platform for
            Web3 enterprises and which is a compliant solution to private
            transactions. No party neve has access to your wallet address, never
            has access to your funds, never receive a deposit from you, never
            transfer your assets or apply a fee.
          </div>
          <div>
            All transactional log data is automatically deleted after 48 hours.
            No data is ever sold or provided to third parties. During the 48
            hour window individual specific data is only provided if a partner
            exchange has flagged a security threat tied to the wallet exchanging
            the funds and expressly requests it or upon the request of law
            enforcement agencies. With more than $150 million in volume and
            50,000 transactions to date no user funds have ever been lost.
          </div>
          <div>
            In the event of an issue our in-house dedicated{' '}
            <Link
              href="https://t.me/HoudiniSwapSupport_bot"
              target="_blank"
              className="font-bold"
            >
              Support Team
            </Link>{' '}
            is available 24/7 to support you and ensure your funds are safe.
          </div>
        </div>
      ),
    },
    {
      title: 'How does Houdini Swap work?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          <div>
            At its core Houdini Swap is a liquidity aggregator that encompasses
            a suite of options allowing for private transactions. As the leading
            provider of private transactions for people in crypto, Houdini Swap
            technology includes leading non-custodial exchanges and best of
            class anonymous blockchains.
          </div>
          <div>
            When you swap, send or bridge with Houdini Swap your order is
            dynamically price optimized for the cheapest route. Exchange
            partners are regularly vetted to ensure they maintain effective
            real-time risk based KYC and AML processes. During your transaction
            Houdini Swap never has access to your funds, never receives a
            deposit from you, never transfers your assets or applies a fee.
          </div>
        </div>
      ),
    },
    {
      title: 'Is Houdini Swap truly anonymous?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          Houdini Swaps routes through multiple exchanges that also swap your
          tokens on leading anonymizing blockchains before swapping back again
          to your destination currency. Being sent from one exchange to another
          unrelated exchange in this way creates a privacy layer that severs any
          on-chain connection between origination and destination wallet. Tokens
          that arrive at the destination wallet cannot be linked back to the
          originating sender making the transaction untraceable and truly
          private.
        </div>
      ),
    },
    {
      title: 'How long will my transaction take to complete?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          <div>
            Usually private transactions take between 20 and 40 minutes to
            complete with semi-private transactions being much shorter and
            averaging between x and xx minutes. The time can vary due to a
            number of factors, such as the selected token pair and potential
            congestion on the respective blockchains. Blockchains with a large
            number of verifications and so a longer transaction confirmation
            time will also take longer.
          </div>
          <div>
            If your order has not been processed after one-hour, feel free to
            contact our{' '}
            <Link
              href="https://t.me/HoudiniSwapSupport_bot"
              target="_blank"
              className="font-bold"
            >
              Support Team
            </Link>{' '}
            with your Order ID so we can follow this up quickly and resolve it
            for you.
          </div>
        </div>
      ),
    },
    {
      title: 'Is Houdini Swap compliant?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          Yes, Houdini Swap’s systems and processes comply with the requirements
          of regulatory authorities in all key jurisdictions. As a compliant
          solution for private transactions Houdini Swap is built ground up to
          cater to the needs of Web3 users needing to use compliant private
          transactions to keep their financial data safe from others with whom
          they transact.
        </div>
      ),
    },
    {
      title: 'Is Houdini Swap a crypto mixer?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          No, Houdini Swap is not a crypto mixer. Crypto mixers pool user funds
          and act as a functional intermediary in their mixing process. Houdini
          Swap’s platform never takes custody of user assets, never receives a
          deposit from users, never transfers user assets and does not charge
          users a fee. All exchange partners have confirmed real-time risk-based
          KYC and AML systems to monitor and potentially block transactions
          identified as high risk of being sanctioned or involved in illegal
          activity. Additionally Houdini Swap does not accept transactions over
          $60,000 or transactions initiated from the Tor Network, both criteria
          preferred by parties involved in sanctioned or illegal behavior.
        </div>
      ),
    },
    {
      title: 'What transaction data does Houdini Swap and its exchanges store?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          All data is stored for 48 hours in order to allow enough time for you
          to reach out to Support should they need to. A user may elect to
          delete their order from records earlier if the transaction has already
          completed. The two exchanges involved in the transaction only store
          ‘their side’ of the transaction. Exchange 1 does not have a record of
          the transaction after sending it and Exchange 2 does not have a record
          of the transaction prior to receiving it. IP, User Agent and
          AcceptLanguages are not forwarded to the exchange unless a security
          threat has been flagged tied to the wallet exchanging the funds and
          the exchange expressly requests it.
        </div>
      ),
    },
    {
      title: 'How long will my transaction take to complete?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          <div>
            Usually private transactions take between 20 and 40 minutes to
            complete with semi-private transactions taking less than 3 minutes
            to complete. The time can vary due to a number of factors, such as
            the selected token pair and potential congestion on the respective
            blockchains. Blockchains with a large number of verifications and so
            a longer transaction confirmation time will also take longer.
          </div>
          <div>
            If your order has not been processed after one-hour, feel free to
            contact our{' '}
            <Link
              href="https://t.me/HoudiniSwapSupport_bot"
              target="_blank"
              className="font-bold"
            >
              Support Team
            </Link>{' '}
            with your Order ID so we can follow this up quickly and resolve it
            for you.
          </div>
        </div>
      ),
    },
    {
      title: 'How is Average Transaction Time calculated?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          The calculation is the average duration a transaction will take based
          on the historical performance of the exchanges through which the
          transaction is routed as well as current network congestion time.
        </div>
      ),
    },
    {
      title: 'What fees does Houdini Swap charge me?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          The quoted fee is fully inclusive and includes network gas fees,
          exchange fees and exchange spreads which are incurred when swapping in
          and out of the anonymizing currency. While you pay no more for using
          Houdini Swap than you would by going directly to the selected
          exchanges, given Houdini Swap’s negotiating power with its exchange
          partners in almost all circumstances you will pay less using Houdini
          Swap. Houdini Swap does not charge any fees. In return for routing
          your transaction Houdini Swap receives a small commission paid from
          the exchange’s fee and as such does not impact your rate.
        </div>
      ),
    },
    {
      title: 'What are Variable and Fixed rates?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          <div>
            <span className="font-bold">Variable rates</span> shown are an
            estimate as the final transaction rate may vary slightly. Variable
            rates can change while the transaction is occurring given shifts in
            conversion rates and exchange slippage. Variable rates suit
            transactions where the amount to be swapped, sent or bridged is
            defined instead of the amount to be received. Given variation can
            occur, and is factored into this type of transaction, variable rates
            are better than fixed rates and as such are recommended for most
            transactions.
          </div>
          <div>
            <span className="font-bold">Fixed rates</span> suit the payment of
            invoices. If you know the token amount needed to be received you can
            lock in the amount of the token required to be sent. Fixed rates
            factor in recent volatility in both the conversion rates of the
            token pair and potential exchange slippage while the transaction is
            being completed. Given this fixed rates are higher than variable
            rates.
          </div>
        </div>
      ),
    },
    {
      title: 'Do I need to connect my wallet?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          No. You do not need to connect your wallet to process transactions.
          Simply choose a token pair, set a receiving wallet address, and send
          your funds to the wallet address provided. It’s that simple.
        </div>
      ),
    },
    {
      title: 'What KYC and AML requirements are there?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          Transactions are non-KYC, however each Houdini Swap exchange partner
          operates live, risk based KYC and AML systems to automatically filter
          out wallets which have been sanctioned or associated with criminal
          activity. In the event a transaction is flagged as sanctioned or
          exhibiting high risk association with criminal activity, the exchange
          may require additional information as per their individual KYC and AML
          policies. Such events are rare and we will either connect you with the
          exchange partner or defer to their preferred solution for remediation.
        </div>
      ),
    },
    {
      title:
        'I sent my funds, it now says ‘Order Expired’, are my funds at risk?',
      content: (
        <div>
          No, your funds are safe. Please contact our{' '}
          <Link
            href="https://t.me/HoudiniSwapSupport_bot"
            target="_blank"
            className="font-bold"
          >
            Support Team
          </Link>{' '}
          with your Order ID so we can follow this up quickly and resolve it for
          you.
        </div>
      ),
    },
    {
      title: 'What if I accidentally sent the wrong currency?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          <div>
            If you have sent the wrong currency your funds are still safe.
            However it will require our{' '}
            <Link
              href="https://t.me/HoudiniSwapSupport_bot"
              target="_blank"
              className="font-bold"
            >
              Support Team
            </Link>{' '}
            to resolve the matter which can potentially take up to 24hrs.
          </div>
          <div>
            Please contact our{' '}
            <Link
              href="https://t.me/HoudiniSwapSupport_bot"
              target="_blank"
              className="font-bold"
            >
              Support Team
            </Link>{' '}
            with your Order ID so we can follow this up quickly and resolve it
            for you.
          </div>
        </div>
      ),
    },
    {
      title:
        'What if my order status shows it completed yet funds are not received?',
      content: (
        <div className="flex flex-col justify-start items-start gap-4">
          <div>
            Usually the transaction is pending, which means that during the
            transaction confirmation time network gas fees have spiked causing
            it to delay your transaction completion. To confirm this, we
            recommend searching your receiving wallet address history on a
            blockchain scanner such as etherscan or bscscan, and checking the
            transaction history. If you see a ‘pending’ deposit transaction,
            this is almost certainly a gas fee issue and will resolve itself in
            time.
          </div>
          <div>
            If you do not see a ‘pending’ deposit transaction however, please
            contact our{' '}
            <Link
              href="https://t.me/HoudiniSwapSupport_bot"
              target="_blank"
              className="font-bold"
            >
              Support Team
            </Link>{' '}
            with your Order ID so we can follow this up quickly and resolve it
            for you.
          </div>
        </div>
      ),
    },
    {
      title: 'What is Multi Send?',
      content: (
        <div className="flex flex-row justify-start items-start">
          If you need to privately send, swap or bridge to multiple wallets at
          the same time then Multi Send allows you to do so, saving you time and
          effort.
        </div>
      ),
    },
    {
      title: 'How can I find my order details again?',
      content: (
        <div className="flex flex-row justify-start items-start">
          Use the search bar [Search a Tx] to track your transaction.
        </div>
      ),
    },
    {
      title: 'How can I reach you about a business proposal?',
      content: (
        <div>
          Please contact our{' '}
          <Link
            href="https://t.me/HoudiniSwapSupport_bot"
            target="_blank"
            className="font-bold"
          >
            Support Team
          </Link>{' '}
        </div>
      ),
    },
  ]
  return (
    <>
      <div
        id="faq"
        className="lg:text-[81px] text-center text-[35px] font-bold leading-normal capitalize tracking-[-0.85px]"
      >
        FAQ
      </div>

      <div>
        {faqs.map((elem, index) => (
          <Accordion key={index} title={elem.title} content={elem.content} />
        ))}
      </div>
    </>
  )
}
