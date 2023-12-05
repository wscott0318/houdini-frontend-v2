import { DateFilter } from "../generic/DateFilter";
import { AmountFilter } from "../generic/AmountFilter";
import { OrderStatus } from "../../../../interfaces/swap";
import { ExchangeType } from "../../types/order.entity";
export default class OrderFilters {
    status?: OrderStatus;
    anonymous?: boolean;
    created?: DateFilter;
    expires?: DateFilter;
    feeProcessed?: boolean;
    inAmount?: AmountFilter;
    in?: ExchangeType[];
    inSymbol?: string[];
    out?: ExchangeType[];
    outAmount?: AmountFilter;
    outSymbol?: string[];
    outAmountUsd?: AmountFilter;
    wallets?: string[];
    partners?: string[];
}
