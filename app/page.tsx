'use client'

export default function Home() {
  return (
    <div className="row-start-2 row-end-3 flex flex-col gap-[80px] justify-center items-center my-[80px]">
      <div>
        <div className="lg:text-[81px] text-center text-[35px] font-bold leading-normal capitalize tracking-[-0.85px]">
          Keep your transactions private
        </div>
        <div className="flex flex-col font-normal text-[19px] leading-[30px] items-center justify-center text-[#B8CAFC] text-center">
          <div>Privately swap, send or bridge with magical ease</div>
          <div>
            With no traceable connection between the sending and receiving
            wallets
          </div>
          <div>It&rsquo;s safe, compliant and always lowest cost</div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <div className="bg-gray-500 w-full lg:w-[1000px] h-[600px] flex flex-row justify-center items-center">
          Modal here
        </div>
        <div className="rainbow-text flex flex-col justify-center items-center text-center">
          <div>
            For your enhanced security, Houdini order details disappear after 48
            hours.
          </div>
          <div>If you ever need our support, we’re here for you 24/7</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
        <div className="w-[260px] h-[140px] bg-gray-500 sm:block hidden"></div>
        <div className="w-[350px] h-[190px] bg-gray-500"></div>
        <div className="w-[260px] h-[140px] bg-gray-500 sm:block hidden"></div>
      </div>

      <div className="flex flex-col items-centers justify-center gap-2 bg-gray-500 w-full md:w-[650px] lg:w-[850px] h-[230px]"></div>

      <div className="flex flex-col items-centers justify-center gap-2 bg-gray-500 w-full md:w-[600px] h-[350px]"></div>
    </div>
  )
}
