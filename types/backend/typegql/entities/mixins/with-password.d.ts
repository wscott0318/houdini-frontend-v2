import { Base } from "../abstract/base.entity";
type AnyConstructor<A = Record<string, unknown>> = new (...input: any[]) => A;
export declare const WithPassword: <TBase extends AnyConstructor<Base>>(EntityBaseClass: TBase) => {
    new (...input: any[]): {
        password: string;
        readonly _id?: import("bson").ObjectID;
    };
} & TBase;
export {};
