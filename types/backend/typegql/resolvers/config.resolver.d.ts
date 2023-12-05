import Config from "../entities/types/config.entity";
import { TypeGraphContext } from "../interfaces/context.interface";
declare const ConfigResolver_base: typeof import("./base.resolver").BaseResolver;
export default class ConfigResolver extends ConfigResolver_base {
    configs(ctx: TypeGraphContext): Promise<import("@mikro-orm/core").Loaded<Config, never>[]>;
    config(ctx: TypeGraphContext, key: string): Promise<import("@mikro-orm/core").Loaded<Config, never>>;
}
export {};
