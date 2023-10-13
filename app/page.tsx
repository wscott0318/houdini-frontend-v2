'use client'

export default function Home() {
  return (
    <div className="row-start-2 row-end-3 grid grid-cols-1 grid-rows-6 place-items-center place-content-center">
      <div className="text-[81px] font-bold leading-normal capitalize tracking-[-0.85px]">
        Keep your transactions private
      </div>
      <div className="flex flex-col font-normal text-[19px] leading-[30px] items-center justify-center text-[#B8CAFC]">
        <div>Privately swap, send or bridge with magical ease</div>
        <div>
          With no traceable connection between the sending and receiving wallets
        </div>
        <div>It&rsquo;s safe, compliant and always lowest cost</div>
      </div>
      <div>Modal here</div>
      <div className="rainbow-text">
        For your enhanced security, Houdini order details disappear after 48
        hours. If you ever need our support, we’re here for you 24/7
      </div>
    </div>
  )
}
