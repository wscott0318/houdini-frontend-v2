import { ObjectId } from "@mikro-orm/mongodb";
import { Base } from "../abstract/base.entity";
declare const Article_base: (abstract new (...input: any[]) => {
    id: string;
    readonly _id?: ObjectId;
}) & {
    new (...input: any[]): {
        created: Date;
        modified?: Date;
        readonly _id?: ObjectId;
    };
} & typeof Base;
export default class Article extends Article_base {
    readonly _id: ObjectId;
    readonly id: string;
    title: string;
    url: string;
    subtitle: string;
    imageLink: string;
    published: boolean;
    created: Date;
    modified?: Date;
}
export {};
