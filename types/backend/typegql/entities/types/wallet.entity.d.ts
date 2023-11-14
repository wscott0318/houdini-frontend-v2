import { ObjectId } from "mongodb";
import { Base } from "../abstract/base.entity";
declare const Wallet_base: (abstract new (...input: any[]) => {
    id: string;
    readonly _id?: ObjectId;
}) & {
    new (...input: any[]): {
        created: Date;
        modified?: Date;
        readonly _id?: ObjectId;
    };
} & typeof Base;
export default class Wallet extends Wallet_base {
    readonly _id: ObjectId;
    readonly id: string;
    address: string;
    created: Date;
    modified?: Date;
    roles: string[];
    nickname: string;
    staked: number;
    tierCommissionFee: number;
    tierCommissionFeeOverride: number;
    referralCode?: string;
    referralUrl?: string;
}
export {};
