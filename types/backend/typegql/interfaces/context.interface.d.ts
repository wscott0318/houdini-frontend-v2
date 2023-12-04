import { Service, Span } from "moleculer";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { EntityManager } from "@mikro-orm/core";
import { Account as AccountEntity } from "typegql/entities/types/account.entity";
type Account = Pick<AccountEntity, "id" | "username" | "roles" | "enabled">;
export interface TypeGraphContext extends ExpressContext {
    meta: Record<string, any>;
    config: Record<string, any>;
    span: Span;
    account?: Account;
    service: Service | any;
    em?: EntityManager | any;
}
export interface AccountContext {
    account: Account;
}
export {};
