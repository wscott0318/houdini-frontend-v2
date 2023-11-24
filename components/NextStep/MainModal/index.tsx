import {
    Protocol7Svg,
    Protocol4Svg,
    QuestionSvg,
} from '@/components/Svg'
import { ModalStep } from '@/components/ModalStep'
import { OrderDetailRoundbox } from '@/components/ModalStep/OrderDetailRoundbox'
import { WalletRoundbox } from '@/components/ModalStep/WalletRoundbox'
import { CopyBtnDemo } from '@/components/ModalStep/CopyBtnDemo'
import { Steps } from '@/components/ModalStep/Steps'
import { IndustrialCounterLockup } from '@/components/ModalStep/IndustrialCounterLockup'

export const MainModal = () => {
    return(
        <ModalStep>
          <div className="md:flex md:flex-row block md:justify-between lg:gap-0 gap-[5px] items-center justify-center w-full px-[10px] py-[5px]">
            <div className="md:w-35% sm:w-50%">
                <OrderDetailRoundbox>
                    <div className="text-center lg:text-[15.25px] text-[12px] font-bold text-[#FFFFFF] text-opacity-60">
                        Order ID:
                    </div>
                    <CopyBtnDemo concept="pR7h3raq71otwFuCqvSpqf" fontSize="lg:text-[15.25px] text-[12px]" textColor="text-[#FFFFFF99]"/>
                </OrderDetailRoundbox>
            </div>
            <div className="md:w-10% md:pt-0 pt-[5px] sm:w-50%">
                <OrderDetailRoundbox>
                    <div className="text-center lg:text-[14.88px] text-[12px] text-[#FFFFFF] leading-[24px] text-opacity-60 font-bold">
                        Creation Time:
                    </div>
                    <div className="text-center lg:text-[15.25px] text-[12px] text-[#FFFFFF] leading-[24px] text-opacity-50 font-normal">
                        21/09/2023, 19:14:37
                    </div>
                </OrderDetailRoundbox>
            </div>
          </div>
  
          <IndustrialCounterLockup>
            <div className="text-center w-full lg:text-[46px] text-[20px] lg:leading-[75.43px] font-bold ">
                Send Funds to Start Order
            </div>
            <div className="flex flex-col lg:px-[30px] lg:py-[10px] lg:gap-[20px] gap-[10px] w-full">
                <div className="text-center w-full lg:text-[17px] text-[15px] leading-[21.42px] font-medium rainbow-text">
                    Follow these steps
                </div>
                <Steps>
                    <div className="text-center w-full leading-[24px] lg:text-[18px] text-[14px] font-bold">
                        Send:
                    </div>
                    <div className="flex flex-row w-full justify-center items-center gap-[10px]">
                      <Protocol7Svg width={64} height={64}/>
                      <div className="flex flex-row gap-[20px] justify-center items-center">
                          <div className="text-center leading-[24px] lg:text-[20px] text-[14px] font-semibold ">ETH(ERC-20)</div>
                          <CopyBtnDemo concept="1.0235" textColor="text-[#FBBF24]" fontSize="lg:text-[20px] text-[14px]" fontWeight="text-semibold" lineHeight="leading-[24px]"/>
                      </div>
                    </div>
                </Steps>
  
                <Steps>
                    <div className="text-center leading-[24px] lg:text-[18px] text-[14px] font-bold">
                        To This Address:
                    </div>
                    <div className="flex flex-row gap-[20px] lg:py-[10px] py-[5px] justify-center items-center">
                        <CopyBtnDemo concept="0xeed9978234bdffswfd8dhfe372b0154" textColor="text-[#FBBF24]" fontSize="lg:text-[20px] text-[14px]" fontWeight="text-semibold" lineHeight="leading-[24px]"/>
                    </div>
                </Steps>
            </div>
            <div className="lg:flex lg:flex-row flex justify-between w-full items-center px-[30px] lg:pt-5 pt-[10px] left-0">
                <WalletRoundbox>
                    <div className="relative flex flex-row justify-center items-center custom-wallet-shadow custom-wallet-gradient rounded-[15px] w-[110px] h-[88px] bg-red-900 p-2.5 bg-gradient-to-r from">
                        <div className="flex flex-row justify-center items-center lg:py-[10px] py-[5px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path d="M28.5 17.25H30V21H28.5V17.25ZM31.5 17.25H33V21H31.5V17.25ZM28.5 22.5H30V24H28.5V22.5ZM31.5 22.5H33V24H31.5V22.5ZM23.25 25.5H24.75V27H23.25V25.5ZM19.5 40.5H21V42H19.5V40.5ZM31.5 25.5H33V27H31.5V25.5ZM28.5 28.5H30V30H28.5V28.5ZM31.5 28.5H33V30H31.5V28.5ZM1.5 1.5H3.75V0H0.75C0.551088 0 0.360322 0.0790176 0.21967 0.21967C0.0790176 0.360322 0 0.551088 0 0.75L0 3.75H1.5V1.5ZM47.25 0H44.25V1.5H46.5V3.75H48V0.75C48 0.551088 47.921 0.360322 47.7803 0.21967C47.6397 0.0790176 47.4489 0 47.25 0ZM1.5 44.25H0V47.25C0 47.4489 0.0790176 47.6397 0.21967 47.7803C0.360322 47.921 0.551088 48 0.75 48H3.75V46.5H1.5V44.25ZM46.5 46.5H44.25V48H47.25C47.4489 48 47.6397 47.921 47.7803 47.7803C47.921 47.6397 48 47.4489 48 47.25V44.25H46.5V46.5ZM3 3.75V12.75C3 12.9489 3.07902 13.1397 3.21967 13.2803C3.36032 13.421 3.55109 13.5 3.75 13.5H12.75C12.9489 13.5 13.1397 13.421 13.2803 13.2803C13.421 13.1397 13.5 12.9489 13.5 12.75V3.75C13.5 3.55109 13.421 3.36032 13.2803 3.21967C13.1397 3.07902 12.9489 3 12.75 3H3.75C3.55109 3 3.36032 3.07902 3.21967 3.21967C3.07902 3.36032 3 3.55109 3 3.75ZM4.5 4.5H12V12H4.5V4.5Z" fill="white"/>
                                <path d="M9.75 6H6.75C6.55109 6 6.36032 6.07902 6.21967 6.21967C6.07902 6.36032 6 6.55109 6 6.75V9.75C6 9.94891 6.07902 10.1397 6.21967 10.2803C6.36032 10.421 6.55109 10.5 6.75 10.5H9.75C9.94891 10.5 10.1397 10.421 10.2803 10.2803C10.421 10.1397 10.5 9.94891 10.5 9.75V6.75C10.5 6.55109 10.421 6.36032 10.2803 6.21967C10.1397 6.07902 9.94891 6 9.75 6ZM9 9H7.5V7.5H9V9ZM35.25 13.5H44.25C44.4489 13.5 44.6397 13.421 44.7803 13.2803C44.921 13.1397 45 12.9489 45 12.75V3.75C45 3.55109 44.921 3.36032 44.7803 3.21967C44.6397 3.07902 44.4489 3 44.25 3H35.25C35.0511 3 34.8603 3.07902 34.7197 3.21967C34.579 3.36032 34.5 3.55109 34.5 3.75V12.75C34.5 12.9489 34.579 13.1397 34.7197 13.2803C34.8603 13.421 35.0511 13.5 35.25 13.5ZM36 4.5H43.5V12H36V4.5Z" fill="white"/>
                                <path d="M41.25 6H38.25C38.0511 6 37.8603 6.07902 37.7197 6.21967C37.579 6.36032 37.5 6.55109 37.5 6.75V9.75C37.5 9.94891 37.579 10.1397 37.7197 10.2803C37.8603 10.421 38.0511 10.5 38.25 10.5H41.25C41.4489 10.5 41.6397 10.421 41.7803 10.2803C41.921 10.1397 42 9.94891 42 9.75V6.75C42 6.55109 41.921 6.36032 41.7803 6.21967C41.6397 6.07902 41.4489 6 41.25 6ZM40.5 9H39V7.5H40.5V9ZM12.75 34.5H3.75C3.55109 34.5 3.36032 34.579 3.21967 34.7197C3.07902 34.8603 3 35.0511 3 35.25V44.25C3 44.4489 3.07902 44.6397 3.21967 44.7803C3.36032 44.921 3.55109 45 3.75 45H12.75C12.9489 45 13.1397 44.921 13.2803 44.7803C13.421 44.6397 13.5 44.4489 13.5 44.25V35.25C13.5 35.0511 13.421 34.8603 13.2803 34.7197C13.1397 34.579 12.9489 34.5 12.75 34.5ZM12 43.5H4.5V36H12V43.5Z" fill="white"/>
                                <path d="M6.75 42H9.75C9.94891 42 10.1397 41.921 10.2803 41.7803C10.421 41.6397 10.5 41.4489 10.5 41.25V38.25C10.5 38.0511 10.421 37.8603 10.2803 37.7197C10.1397 37.579 9.94891 37.5 9.75 37.5H6.75C6.55109 37.5 6.36032 37.579 6.21967 37.7197C6.07902 37.8603 6 38.0511 6 38.25V41.25C6 41.4489 6.07902 41.6397 6.21967 41.7803C6.36032 41.921 6.55109 42 6.75 42ZM7.5 39H9V40.5H7.5V39ZM33 14.25H27.75V5.25H26.25V15C26.25 15.1989 26.329 15.3897 26.4697 15.5303C26.6103 15.671 26.8011 15.75 27 15.75H33V14.25ZM16.5 9H21.75V10.5H16.5V9ZM19.5 6H24.75V7.5H19.5V6ZM3 14.25H4.5V21H3V14.25ZM13.5 18.75H6V20.25H12.75V23.25H14.25V19.5C14.25 19.3011 14.171 19.1103 14.0303 18.9697C13.8897 18.829 13.6989 18.75 13.5 18.75ZM6.75 15H8.25V16.5H6.75V15ZM15.75 13.5H17.25V19.5H15.75V13.5ZM15.75 21H22.5V22.5H15.75V21ZM45.75 21.75H44.25V29.25H42V30.75H45C45.1989 30.75 45.3897 30.671 45.5303 30.5303C45.671 30.3897 45.75 30.1989 45.75 30V21.75ZM19.5 13.5H21V15H19.5V13.5ZM3 24.75H4.5V30.75H3V24.75ZM3 31.5H9.75V33H3V31.5ZM37.5 21H39V18C39 17.8011 38.921 17.6103 38.7803 17.4697C38.6397 17.329 38.4489 17.25 38.25 17.25H34.5V18.75H37.5V21ZM6.75 24.75H8.25V26.25H6.75V24.75ZM15 24H16.5V30H15V24ZM15 31.5H21.75V33H15V31.5ZM6 28.5H12.75V30H6V28.5ZM15.75 39H17.25V42H15.75V39ZM15 36H21.75V37.5H15V36ZM27 33V29.25C27 29.0511 26.921 28.8603 26.7803 28.7197C26.6397 28.579 26.4489 28.5 26.25 28.5H18.75V30H25.5V33H27ZM19.5 24H21V25.5H19.5V24ZM11.25 25.5H12.75V27H11.25V25.5ZM44.25 39.75H45.75V45H44.25V39.75ZM40.5 43.5H42.75V45H40.5V43.5ZM40.5 39H42V42H40.5V39ZM45.75 33C45.75 32.8011 45.671 32.6103 45.5303 32.4697C45.3897 32.329 45.1989 32.25 45 32.25H36.75V33.75H44.25V38.25H45.75V33ZM36 42V38.25C36 38.0511 35.921 37.8603 35.7803 37.7197C35.6397 37.579 35.4489 37.5 35.25 37.5H27V39H34.5V42H36Z" fill="white"/>
                                <path d="M37.5 35.25H42.75V36.75H37.5V35.25ZM15 43.5H20.25V45H15V43.5ZM22.5 38.25H24V45H22.5V38.25ZM24 34.5H27V36H24V34.5ZM35.25 27H39V25.5H36V21H34.5V26.25C34.5 26.4489 34.579 26.6397 34.7197 26.7803C34.8603 26.921 35.0511 27 35.25 27Z" fill="white"/>
                                <path d="M37.5 22.5H41.25V24H37.5V22.5ZM40.5 15H42.75V16.5H40.5V15ZM44.25 15H45.75V18.75H44.25V15ZM40.5 18.75H42V20.25H40.5V18.75ZM29.25 12.75H32.25C32.4489 12.75 32.6397 12.671 32.7803 12.5303C32.921 12.3897 33 12.1989 33 12V2.25H31.5V11.25H29.25V12.75ZM18 3.75H29.25V2.25H17.25C17.0511 2.25 16.8603 2.32902 16.7197 2.46967C16.579 2.61032 16.5 2.80109 16.5 3V6.75H18V3.75ZM18.75 18H24C24.1989 18 24.3897 17.921 24.5303 17.7803C24.671 17.6397 24.75 17.4489 24.75 17.25V11.25H23.25V16.5H18.75V18ZM25.5 17.25H27V20.25H25.5V17.25ZM27 40.5H32.25V42H27V40.5ZM27 43.5H33.75V45H27V43.5ZM37.5 43.5H36V45H38.25C38.4489 45 38.6397 44.921 38.7803 44.7803C38.921 44.6397 39 44.4489 39 44.25V38.25H37.5V43.5ZM12 31.5H13.5V33H12V31.5ZM29.25 31.5H32.25V33H29.25V31.5ZM34.5 28.5H36V30.75H34.5V28.5ZM33.75 32.25H35.25V33.75H33.75V32.25ZM29.25 34.5H31.5V36H29.25V34.5ZM37.5 28.5H39V30H37.5V28.5ZM40.5 25.5H42.75V27H40.5V25.5ZM26.25 25.5H30V27H26.25V25.5ZM25.5 21.75H27V24H25.5V21.75Z" fill="white"/>
                            </svg>
                        </div>
                        <div className="absolute flex flex-row top-5 right-2.5">
                            <QuestionSvg />
                        </div>
                    </div>
                </WalletRoundbox>
  
                <div className="hidden sm:flex sm:flex-wrap justify-center gap-[10px]">
                    <div className="text-center lg:text-[20px] lg:leading-[24px] lg:font-semibold">
                        Send your funds by:
                    </div>
                    <div className="text-center lg:text-[20px] lg:leading-[24px] text-[#FBBF24] lg:font-semibold">
                        26 : 34
                    </div>
                </div>

                <WalletRoundbox>
                    <div className="relative flex flex-row justify-center items-center custom-wallet-shadow custom-wallet-gradient rounded-[15px] w-[118px] h-[88px] bg-red-900 px-[10px] py-[20px] bg-gradient-to-r from">
                        <div className="text-center lg:text-[15.5px] lg:font-bold font-medium">
                            Open In Wallet
                        </div>
                        <div className="absolute flex flex-row top-5 right-2.5">
                            <QuestionSvg />
                        </div>
                    </div>
                </WalletRoundbox>
            </div>
            <div className="visible sm:hidden flex flex-wrap justify-center gap-[10px]">
                    <div className="text-center lg:text-[20px] lg:leading-[24px] lg:font-semibold">
                        Send your funds by:
                    </div>
                    <div className="text-center lg:text-[20px] lg:leading-[24px] text-[#FBBF24] lg:font-semibold">
                        26 : 34
                    </div>
                </div>
          </IndustrialCounterLockup>
          
          <div className="pt-[15px] lg:px-[10px] pb-[5px] w-full">
            <div className="p-[2.5px] w-full rounded-[20px] custom-houdini-id-gradient1">
                <div className="lg:flex flex-wrap lg:justify-between justify-center items-center rounded-[20px] w-full custom-houdini-id-gradient custom-houdini-id-shadow lg:px-[5px] px-[5px] py-[10px]">
                    <div className='sm:flex block lg:w-[60%] w-full lg:justify-between justify-center px-[4px] gap-4'>
                        <div className="text-center lg:text-[15.25px] lg:leading-[24px] text-[14px] font-bold text-opacity-60">
                            Recipient Wallet:
                        </div>
                        <div className="text-center lg:text-[14.88px] lg:leading-[24px] text-[13px] font-normal text-opacity-50">
                            0xferv3552mnjud953234sddn2323434bdffswfd8
                        </div>
                    </div>
                    <div className="flex lg:w-[40%] lg:justify-between justify-center flex-row items-center gap-2.5 px-[4px]">
                        <div className=" text-cente lg:text-[15.25px] lg:leading-[24px] text-[14px] font-normal text-opacity-50 lg:pl-[60px]">
                            will receive 
                        </div>
                        <div className='flex gap-2.5 items-center'>
                            <div className="text-center lg:text-[15.25px] text-[14px] font-normal">
                                175.7936
                            </div>
                            <Protocol4Svg />
                            <div className="text-base text-center lg:text-[15.25px] text-[14px] font-normal">
                                AVAX
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </ModalStep>
    )
  }
