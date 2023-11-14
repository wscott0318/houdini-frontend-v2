import { ObjectId } from "mongodb";
import { Status, OrderStatus, QuoteDirection } from "../../../interfaces/swap";
import { TokenId } from "../../../swaps/tokens";
import { Base } from "../abstract/base.entity";
import Wallet from "./wallet.entity";
import { Partner } from "./partner.entity";
export declare enum ExchangeType {
    cn = "cn",
    ff = "ff",
    ss = "ss",
    se = "se",
    el = "el",
    sz = "sz",
    le = "le",
    ch = "ch"
}
declare const Order_base: (abstract new (...input: any[]) => {
    id: string;
    readonly _id?: ObjectId;
}) & {
    new (...input: any[]): {
        created: Date;
        modified?: Date;
        readonly _id?: ObjectId;
    };
} & typeof Base;
export default class Order extends Order_base {
    readonly _id: ObjectId;
    id: string;
    created: Date;
    modified?: Date;
    wallet: Wallet;
    partner: Partner;
    houdiniId: string;
    senderAddress: string;
    receiverAddress: string;
    status: OrderStatus;
    anonymous: boolean;
    expires: Date;
    fee: number;
    feePercent: number;
    feeProcessed: boolean;
    feeProcessedTx: string;
    in: ExchangeType;
    inAmount: number;
    inSymbol: TokenId;
    inAddressFrom: string;
    inAddressTo: string;
    inStatus: Status;
    inCreated: Date;
    inOrderId: string;
    inTransactionInHash: string;
    inTransactionOutHash: string;
    out: ExchangeType;
    outAmount: number;
    outAmountUsd: number;
    outSymbol: TokenId;
    outAddressFrom: string;
    outAddressTo: string;
    outStatus: Status;
    outCreated: Date;
    outOrderId: string;
    outTransactionInHash: string;
    outTransactionOutHash: string;
    senderTag: string;
    receiverTag: string;
    fixed: boolean;
    direction: QuoteDirection;
    ffSetEmergency: boolean;
    isDeleted: boolean;
    notified: boolean;
    notifiedAt?: Date;
    lastError: string;
    firstErrorAt?: Date;
    lastErrorAt?: Date;
    ip: string;
    userAgent: string;
    timezone: string;
}
export {};
