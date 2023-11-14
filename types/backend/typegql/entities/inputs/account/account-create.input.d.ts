import { Account } from "../../types/account.entity";
import { AccountInput } from "./account.input";
declare const AccountCreateInput_base: {
    new (...input: any[]): {
        password: string;
        readonly _id?: import("bson").ObjectID;
    };
} & typeof AccountInput;
export declare class AccountCreateInput extends AccountCreateInput_base implements Partial<Account> {
}
export {};
