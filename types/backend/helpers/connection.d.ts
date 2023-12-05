import "reflect-metadata";
import { ContainerInstance } from "typedi";
import { LoggerInstance } from "moleculer";
import { MikroORM } from "@mikro-orm/core";
declare const dbName: string;
declare let clientUrl: string;
declare const getDbName: (prefix?: string) => string;
declare const initDatabaseConnection: (container: ContainerInstance, logger: LoggerInstance | Console) => Promise<void | MikroORM>;
declare const getConnection: () => MikroORM<import("@mikro-orm/core").IDatabaseDriver<import("@mikro-orm/core").Connection>>;
export { initDatabaseConnection, dbName, getDbName, clientUrl, getConnection };
