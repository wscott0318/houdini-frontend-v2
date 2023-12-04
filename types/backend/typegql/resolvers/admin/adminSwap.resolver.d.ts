import Swap from "../../entities/types/swap.entity";
import { TypeGraphContext } from "../../interfaces/context.interface";
declare const AdminSwapResolver_base: typeof import("../base.resolver").BaseResolver;
export default class AdminSwapResolver extends AdminSwapResolver_base {
    adminSetSwapEnabled(ctx: TypeGraphContext, shortName: string, enabled: boolean): Promise<Swap>;
    adminSwaps(ctx: TypeGraphContext): Promise<import("@mikro-orm/core").Loaded<Swap, never>[]>;
}
export {};
