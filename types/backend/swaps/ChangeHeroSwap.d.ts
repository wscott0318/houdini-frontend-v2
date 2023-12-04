import { LoggerInstance, ServiceBroker } from "moleculer";
import { PriceResult, QuoteDirection, Swap, SwapResult, SwapShortName, SwapStatus } from "../interfaces/swap";
import { TokenId } from "./tokens";
export interface QuoteResult {
    id: string;
    result: number;
    from: string;
    to: string;
    expiresIn: number;
    networkFee: number;
}
export default class ChangeHeroSwap implements Swap {
    name: string;
    shortName: SwapShortName;
    txUrl: string;
    hasFixed: boolean;
    hasFixedReverse: boolean;
    private apiUrl;
    private apiKey;
    private logger;
    private axios;
    private headers;
    symbols: {
        [key in TokenId]: string;
    };
    private statusMap;
    statusError: string;
    constructor(logger: LoggerInstance | Console);
    getBroker(): ServiceBroker;
    formatSymbol(symbol: TokenId): string;
    getQuote(amount: number, from: TokenId, to: TokenId, fixed: boolean, direction?: QuoteDirection): Promise<QuoteResult>;
    getMinMax(from: string, to: string): Promise<{
        min: number;
        max: number;
    }>;
    getPrice(amount: number, from: TokenId, to: TokenId, fixed: boolean, direction: QuoteDirection): Promise<PriceResult>;
    swap(amount: number, from: TokenId, to: TokenId, addressTo: string, destinationTag: string, fixed?: boolean, direction?: QuoteDirection): Promise<SwapResult>;
    status(transactionId: string): Promise<SwapStatus>;
    formatStatus(data: any): SwapStatus;
    formatSwapResult(data: any): SwapResult;
    getCurrencies(): Promise<any>;
}
