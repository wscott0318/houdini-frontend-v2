import { Base } from "../abstract/base.entity";
type AnyConstructor<A = Record<string, unknown>> = new (...input: any[]) => A;
export declare const WithId: <TBase extends AnyConstructor<Base>>(EntityBaseClass: TBase) => (abstract new (...input: any[]) => {
    id: string;
    readonly _id?: import("bson").ObjectID;
}) & TBase;
export {};
