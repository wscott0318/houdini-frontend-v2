import Wallet from "../types/wallet.entity";
export default class PaginatedWallets {
    totalPages: number;
    items: Wallet[];
    constructor(items: Wallet[], totalPages: number);
}
