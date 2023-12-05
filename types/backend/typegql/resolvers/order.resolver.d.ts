import { QuoteDirection } from "../../interfaces/swap";
import { TypeGraphContext } from "../interfaces/context.interface";
import { TokenEnum } from "../../swaps/tokens";
import { OrderStatusResult } from "../../typegql/entities/abstract/order.status";
declare const OrderResolver_base: typeof import("./base.resolver").BaseResolver;
export default class OrderResolver extends OrderResolver_base {
    exchange(ctx: TypeGraphContext, amount: number, from: TokenEnum, to: TokenEnum, anonymous: boolean, addressTo: string, destinationTag?: string, walletId?: string, walletUrlId?: string, fixed?: boolean, direction?: QuoteDirection): Promise<any>;
    eraseOrder(ctx: TypeGraphContext, id: string): Promise<boolean>;
    tokens(ctx: TypeGraphContext): Promise<any>;
    quote(ctx: TypeGraphContext, amount: number, from: TokenEnum, to: TokenEnum, anonymous: boolean, fixed?: boolean,  notified?:boolean, direction?: QuoteDirection,): Promise<any>;
    status(ctx: TypeGraphContext, id: string): Promise<OrderStatusResult>;
    confirmDeposit(ctx: TypeGraphContext, id: string, hash: string): Promise<any>;
}
export {};
