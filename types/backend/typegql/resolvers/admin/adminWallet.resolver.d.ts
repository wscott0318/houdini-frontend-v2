import Wallet from "../../entities/types/wallet.entity";
import { TypeGraphContext } from "../../interfaces/context.interface";
import PaginatedWallets from "../../entities/abstract/paginatedWallets";
import WalletFilters from "../../entities/inputs/wallet/WalletFilters.input";
import SortInput from "../../entities/inputs/generic/SortInput";
declare const AdminWalletResolver_base: typeof import("../base.resolver").BaseResolver;
export default class AdminWalletResolver extends AdminWalletResolver_base {
    adminSetNickname(ctx: TypeGraphContext, id: string, nickname: string): Promise<Wallet>;
    adminWallet(ctx: TypeGraphContext, id: string): Promise<any>;
    adminWallets(ctx: TypeGraphContext, filters: WalletFilters, sort: SortInput, search: string, page: number, pageSize: number): Promise<PaginatedWallets>;
}
export {};
