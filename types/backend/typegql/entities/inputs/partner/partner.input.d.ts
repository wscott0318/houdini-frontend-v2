import { Partner } from "../../types/partner.entity";
export declare class PartnerInput implements Partial<Partner> {
    enabled: boolean;
    name: string;
    telegram: string;
    email: string;
}
