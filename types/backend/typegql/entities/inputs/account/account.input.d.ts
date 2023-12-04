import { ObjectId } from "mongodb";
import { Account } from "../../types/account.entity";
export declare class AccountInput implements Partial<Account> {
    readonly _id: ObjectId;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    enabled: boolean;
    roles: [];
}
