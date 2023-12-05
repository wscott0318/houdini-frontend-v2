import { Account } from "../../entities/types/account.entity";
import { TypeGraphContext, TypeGraphContext as Context } from "../../interfaces/context.interface";
import { AccountCreateInput } from "../../entities/inputs/account/account-create.input";
import { AccountUpdateInput } from "../../entities/inputs/account/account-update.input";
import { MyAccountInput } from "../../entities/inputs/account/my-account.input";
declare const AdminAccountResolver_base: typeof import("../base.resolver").BaseResolver;
export default class AdminAccountResolver extends AdminAccountResolver_base {
    updateMyAccount(ctx: Context, data: MyAccountInput): Promise<Partial<Account>>;
    forgotPassword(ctx: Context, email?: string, username?: string): Promise<Partial<Account>>;
    resetPassword(ctx: Context, resetToken: string, password: string): Promise<Partial<Account>>;
    login(ctx: TypeGraphContext, password: string, email?: string, username?: string, totp?: string): Promise<string | void>;
    me(ctx: Context): Promise<Partial<Account>>;
    enable2fa(ctx: Context, totp?: string): Promise<string>;
    disable2fa(ctx: Context, totp?: string): Promise<boolean>;
    updateMyPassword(ctx: TypeGraphContext, id: string, oldPassword: string, password: string): Promise<boolean>;
    adminAccount(ctx: TypeGraphContext, id: string): Promise<Account | undefined>;
    accountByUsername(ctx: TypeGraphContext, username: string): Promise<Account | undefined>;
    adminAccounts(ctx: TypeGraphContext): Promise<any>;
    adminCreateAccount(ctx: TypeGraphContext, data: AccountCreateInput): Promise<Account>;
    adminUpdateAccount(ctx: TypeGraphContext, data: AccountUpdateInput): Promise<Account>;
    adminUpdatePassword(ctx: TypeGraphContext, id: string, password: string): Promise<boolean>;
    adminDeleteAccount(id: string, ctx: Context): Promise<boolean>;
    adminRoles(): Promise<string[]>;
    getToken(account: Account, secret: string, expiresIn?: string | number): string | void;
    filterPublicData(account: Account): Partial<Account>;
    verify2FA(secret: string, token: string): Promise<boolean>;
}
export {};
