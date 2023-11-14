import { EntityManager } from "@mikro-orm/core";
import { Service } from "moleculer";
import Wallet from "../entities/types/wallet.entity";
import { TypeGraphContext } from "../interfaces/context.interface";
declare const WalletResolver_base: typeof import("./base.resolver").BaseResolver;
export default class WalletResolver extends WalletResolver_base {
    wallet(ctx: TypeGraphContext): Promise<Wallet | undefined>;
    Account(ctx: TypeGraphContext, address: string): Promise<{
        id: any;
        referralCode: any;
        referralUrl: any;
    }>;
    accountExists(ctx: TypeGraphContext, inputAccount: string): Promise<boolean>;
    validateAccountId(ctx: TypeGraphContext, address: string, inputAccount: string, inputAccountUrl: string): Promise<boolean>;
    linkAccount(ctx: TypeGraphContext, address: string, inputAccount: string, inputAccountUrl: string, sig: string): Promise<boolean>;
    createWallet(address: string, em: EntityManager, service: Service, _meta: any): Promise<Wallet>;
}
export {};
