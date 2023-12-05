import { ObjectId } from "mongodb";
import { Base } from "../abstract/base.entity";
declare const Config_base: (abstract new (...input: any[]) => {
    id: string;
    readonly _id?: ObjectId;
}) & {
    new (...input: any[]): {
        created: Date;
        modified?: Date;
        readonly _id?: ObjectId;
    };
} & typeof Base;
export default class Config extends Config_base {
    readonly _id: ObjectId;
    readonly id: string;
    key: string;
    value: string;
    public: boolean;
    created: Date;
    modified?: Date;
}
export {};
