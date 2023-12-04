import { LoggerInstance, ServiceBroker } from "moleculer";
import { PriceResult, QuoteDirection, Swap, SwapResult, SwapShortName, SwapStatus } from "../interfaces/swap";
import { TokenId } from "./tokens";
export interface QuoteResult {
    min_amount: number;
    max_amount: number;
    amount: number;
    fee: number;
    rate: number;
    profit: number;
    rate_id: number;
    rate_id_expired_at: number;
}
export default class LetsExchangeSwap implements Swap {
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
    mapNetwork(token: TokenId, networkCode: string): string;
    getQuote(amount: number, from: TokenId, to: TokenId, fixed: boolean, direction?: QuoteDirection): Promise<any>;
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
