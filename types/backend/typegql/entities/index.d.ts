import Wallet from "./types/wallet.entity";
import Order from "./types/order.entity";
import Swap from "./types/swap.entity";
import { Account } from "./types/account.entity";
import Config from "./types/config.entity";
import Article from "./types/article.entity";
import { Partner } from "./types/partner.entity";
export declare const Entities: ((<TBase extends new (...input: any[]) => import("./abstract/base.entity").Base>(EntityBaseClass: TBase) => (abstract new (...input: any[]) => {
    id: string;
    readonly _id?: import("bson").ObjectID;
}) & TBase) | (<TBase_1 extends new (...input: any[]) => import("./abstract/base.entity").Base>(EntityBaseClass: TBase_1) => {
    new (...input: any[]): {
        password: string;
        readonly _id?: import("bson").ObjectID;
    };
} & TBase_1) | (<TBase_2 extends new (...input: any[]) => import("./abstract/base.entity").Base>(EntityBaseClass: TBase_2) => {
    new (...input: any[]): {
        created: Date;
        modified?: Date;
        readonly _id?: import("bson").ObjectID;
    };
} & TBase_2) | typeof Account | typeof Wallet | typeof Partner | typeof Order | typeof Swap | typeof Config | typeof Article)[];
