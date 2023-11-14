import { ContainerInstance } from "typedi";
import { MikroORM } from "@mikro-orm/core";
import { ActionParams } from "moleculer";
import "reflect-metadata";
export declare const inputBridge: (cls: any) => ActionParams;
declare const Db: {
    name: string;
    methods: {
        setupORM(container?: ContainerInstance): Promise<void | MikroORM<import("@mikro-orm/core").IDatabaseDriver<import("@mikro-orm/core").Connection>>>;
        getConnection(): Promise<any>;
        getEm(): Promise<any>;
    };
};
export default Db;
