import { SwapNetwork } from "swaps/networks";
export default class SwapNetworkEntity implements SwapNetwork {
    name: string;
    shortName: string;
    addressValidation: string;
    memoNeeded: boolean;
    hashUrl: string;
    explorerUrl: string;
    addressUrl: string;
}
