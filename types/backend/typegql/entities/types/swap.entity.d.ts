import { ObjectId } from "mongodb";
import { Base } from "../abstract/base.entity";
declare const Swap_base: (abstract new (...input: any[]) => {
    id: string;
    readonly _id?: ObjectId;
}) & {
    new (...input: any[]): {
        created: Date;
        modified?: Date;
        readonly _id?: ObjectId;
    };
} & typeof Base;
export default class Swap extends Swap_base {
    readonly _id: ObjectId;
    readonly id: string;
    name: string;
    shortName: string;
    enabled: boolean;
    created: Date;
    modified?: Date;
    telegramId: string;
}
export {};
