import { EntityManager } from "@mikro-orm/core";
import WalletFilters from "typegql/entities/inputs/wallet/WalletFilters.input";
import { DBWalletsFilters } from "typegql/interfaces/walletFilter.interface";
import SortInput from "../../../typegql/entities/inputs/generic/SortInput";
export declare const setWalletFilters: (filters: WalletFilters, _em: EntityManager) => Promise<DBWalletsFilters>;
export declare const getWalletsDbQuery: (dbFilters: DBWalletsFilters, searchFilter: any, page: number, pageSize: number, sort: SortInput) => ({
    $match: any;
    $sort?: undefined;
    $facet?: undefined;
} | {
    $sort: {
        [x: string]: number;
    };
    $match?: undefined;
    $facet?: undefined;
} | {
    $facet: {
        metadata: {
            $count: string;
        }[];
        results: ({
            $skip: number;
            $limit?: undefined;
        } | {
            $limit: number;
            $skip?: undefined;
        })[];
    };
    $match?: undefined;
    $sort?: undefined;
})[];
export declare const mapWalletResultsToGQLSchema: (data: any) => any;
