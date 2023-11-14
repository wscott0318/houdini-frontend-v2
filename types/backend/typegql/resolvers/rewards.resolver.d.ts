import { ServiceBroker } from "moleculer";
import { TypeGraphContext } from "../interfaces/context.interface";
import { TokenId } from "../../swaps/tokens";
declare const RewardsResolver_base: typeof import("./base.resolver").BaseResolver;
export default class RewardsResolver extends RewardsResolver_base {
    walletStats(address: string, ctx: TypeGraphContext): Promise<any>;
    getUserPoolInfo(pool: number, accountAddress: string): Promise<any>;
    getDecimals(): Promise<any>;
    checkStaked(accountAddress: string): Promise<number>;
    getAccountTier(accountAddress: string): Promise<{
        amount: number;
        commission: number;
    }>;
    getUSDPrice(): Promise<number>;
    getUSDPriceToken(): Promise<number>;
    getSymbolUSDPrice(symbol: TokenId): Promise<any>;
    getBroker(): ServiceBroker;
}
export {};
