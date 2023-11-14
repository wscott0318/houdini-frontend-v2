import Config from "../../entities/types/config.entity";
import { TypeGraphContext } from "../../interfaces/context.interface";
declare const AdminConfigResolver_base: typeof import("../base.resolver").BaseResolver;
export default class AdminConfigResolver extends AdminConfigResolver_base {
    adminSetConfig(ctx: TypeGraphContext, key: string, value: string, setPublic?: boolean): Promise<Config>;
    adminConfigs(ctx: TypeGraphContext): Promise<import("@mikro-orm/core").Loaded<Config, never>[]>;
    adminConfig(ctx: TypeGraphContext, key: string): Promise<import("@mikro-orm/core").Loaded<Config, never>>;
}
export {};
