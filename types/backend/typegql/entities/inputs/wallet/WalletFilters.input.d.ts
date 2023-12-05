import { DateFilter } from "../generic/DateFilter";
export default class WalletFilters {
    nickname?: string;
    created?: DateFilter;
    addresses?: string[];
    roles?: string[];
}
