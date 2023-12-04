import { EntityManager, ObjectId } from "@mikro-orm/mongodb";
import { TypeGraphContext } from "../../interfaces/context.interface";
import { ExchangeType } from "../../entities/types/order.entity";
import OrderFilters from "../../entities/inputs/order/orderFilters.input";
import PaginatedOrders from "../../entities/abstract/paginatedOrders";
import SortInput from "../../entities/inputs/generic/SortInput";
export interface DbOrderFilters {
    status?: number;
    anonymous?: boolean;
    feeProcessed?: boolean;
    inAmount?: {
        $gte?: number;
        $lte?: number;
    };
    outAmount?: {
        $gte?: number;
        $lte?: number;
    };
    outAmountUsd?: {
        $gte?: number;
        $lte?: number;
    };
    created?: {
        $gte?: Date;
        $lte?: Date;
    };
    expires?: {
        $gte?: Date;
        $lte?: Date;
    };
    wallet?: {
        $in: ObjectId[];
    };
    partner?: {
        $in: ObjectId[];
    };
    in?: {
        $in: ExchangeType[];
    };
    out?: {
        $in: ExchangeType[];
    };
    inSymbol?: {
        $in: string[];
    };
    outSymbol?: {
        $in: string[];
    };
}
export declare const mapOrderResultsToGQLSchema: (data: any) => any;
export declare const getOrdersDbQuery: (dbFilters: DbOrderFilters, searchFilter: any, page: number, pageSize: number, sort: SortInput) => ({
    $match: any;
} | {
    $lookup: {
        from: string;
        localField: string;
        foreignField: string;
        as: string;
    };
} | {
    $sort: {
        [x: string]: number;
    };
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
})[] | {
    $facet: {
        metadata: {
            $count: string;
        }[];
        results: ({
            $match: any;
        } | {
            $lookup: {
                from: string;
                localField: string;
                foreignField: string;
                as: string;
            };
        } | {
            $sort: {
                [x: string]: number;
            };
        } | {
            $skip: number;
            $limit?: undefined;
        } | {
            $limit: number;
            $skip?: undefined;
        })[];
    };
}[];
export declare const setOrderFilters: (filters: OrderFilters, em: EntityManager) => Promise<DbOrderFilters>;
declare const OrderResolver_base: typeof import("../base.resolver").BaseResolver;
export default class OrderResolver extends OrderResolver_base {
    adminOrder(ctx: TypeGraphContext, id: string): Promise<any>;
    adminOrders(ctx: TypeGraphContext, filters: OrderFilters, page: number, sort: SortInput, search: string, pageSize: number): Promise<PaginatedOrders>;
    tokens(ctx: TypeGraphContext): Promise<any>;
}
export {};
