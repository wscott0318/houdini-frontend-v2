import { Partner } from "../../entities/types/partner.entity";
import { TypeGraphContext } from "../../interfaces/context.interface";
import { PartnerInput } from "../../entities/inputs/partner/partner.input";
declare const AdminPartnerResolver_base: typeof import("../base.resolver").BaseResolver;
export default class AdminPartnerResolver extends AdminPartnerResolver_base {
    adminPartner(ctx: TypeGraphContext, id: string): Promise<Partner | undefined>;
    adminPartners(ctx: TypeGraphContext): Promise<any>;
    adminCreatePartner(ctx: TypeGraphContext, data: PartnerInput): Promise<Partner>;
    adminUpdatePartner(ctx: TypeGraphContext, id: string, data: PartnerInput): Promise<Partner>;
    adminPartnerNewApiSecret(ctx: TypeGraphContext, id: string): Promise<string>;
    adminPartnerGetApiSecret(ctx: TypeGraphContext, id: string): Promise<string>;
}
export {};
