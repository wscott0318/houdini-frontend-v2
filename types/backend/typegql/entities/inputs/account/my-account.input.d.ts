import { ObjectId } from "mongodb";
import { Account } from "../../types/account.entity";
export declare class MyAccountInput implements Partial<Account> {
    readonly _id: ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string;
}
