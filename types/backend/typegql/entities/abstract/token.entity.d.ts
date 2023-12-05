import { Token, TokenId } from "../../../swaps/tokens";
import { SwapNetwork } from "../../../swaps/networks";
export declare class TokenEntity implements Token {
    id: TokenId;
    name: string;
    symbol: string;
    network: SwapNetwork;
    keyword: string;
    displayName: string;
    color: string;
    icon?: string;
    hasFixed?: boolean;
    hasFixedReverse?: boolean;
}
