import { ObjectId } from "mongodb";
import { Base } from "../abstract/base.entity";
declare const Partner_base: (abstract new (...input: any[]) => {
    id: string;
    readonly _id?: ObjectId;
}) & {
    new (...input: any[]): {
        created: Date;
        modified?: Date;
        readonly _id?: ObjectId;
    };
} & typeof Base;
export declare class Partner extends Partner_base {
    readonly _id: ObjectId;
    id: string;
    created: Date;
    modified?: Date;
    enabled: boolean;
    name: string;
    telegram: string;
    email: string;
    apiSecret: string;
    apiSecretVector: string;
}
export {};
