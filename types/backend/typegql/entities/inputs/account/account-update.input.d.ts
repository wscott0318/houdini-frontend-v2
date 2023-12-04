import { Account } from "../../types/account.entity";
import { AccountInput } from "./account.input";
declare const AccountUpdateInput_base: (abstract new (...input: any[]) => {
    id: string;
    readonly _id?: import("bson").ObjectID;
}) & typeof AccountInput;
export declare class AccountUpdateInput extends AccountUpdateInput_base implements Partial<Account> {
    id: string;
}
export {};
