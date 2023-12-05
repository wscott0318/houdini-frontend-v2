import { ObjectId } from "mongodb";
import { Base } from "../abstract/base.entity";
declare const Account_base: (abstract new (...input: any[]) => {
    id: string;
    readonly _id?: ObjectId;
}) & {
    new (...input: any[]): {
        created: Date;
        modified?: Date;
        readonly _id?: ObjectId;
    };
} & {
    new (...input: any[]): {
        password: string;
        readonly _id?: ObjectId;
    };
} & typeof Base;
export declare class Account extends Account_base {
    readonly _id: ObjectId;
    id: string;
    created: Date;
    modified?: Date;
    roles: string[];
    enabled: boolean;
    password: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string;
    token: any;
}
export {};
