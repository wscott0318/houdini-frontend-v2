import { TokenId } from "swaps/tokens";
import { OrderStatus, QuoteDirection } from "../../../interfaces/swap";
import Order from "../types/order.entity";
export declare class OrderStatusResult implements Partial<Order> {
    houdiniId: string;
    created: Date;
    modified?: Date;
    senderAddress: string;
    receiverAddress: string;
    status: OrderStatus;
    anonymous: boolean;
    fixed: boolean;
    direction: QuoteDirection;
    expires: Date;
    hashUrl: string;
    transactionHash: string;
    senderTag: string;
    receiverTag: string;
    inAmount: number;
    inSymbol: TokenId;
    inCreated: Date;
    outAmount: number;
    outSymbol: TokenId;
    outCreated: Date;
    notified?: boolean;
    eta?: number;
}
