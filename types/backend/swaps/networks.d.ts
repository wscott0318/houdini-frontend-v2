export interface SwapNetwork {
    name: string;
    shortName: string;
    addressValidation: string;
    memoNeeded: boolean;
    hashUrl?: string;
    explorerUrl: string;
    addressUrl: string;
}
export declare enum Network {
    ARBITRUM = "ARBITRUM",
    AVALANCHE_X = "AVALANCHE_X",
    BINANCESMARTCHAIN = "BINANCESMARTCHAIN",
    BELDEX = "BELDEX",
    BITCOIN = "BITCOIN",
    CARDANO = "CARDANO",
    CRONOS = "CRONOS",
    DOGE = "DOGE",
    ETHEREUM = "ETHEREUM",
    MONERO = "MONERO",
    POLYGON = "POLYGON",
    RIPPLE = "RIPPLE",
    SOLANA = "SOLANA",
    TRON = "TRON",
    AVALANCHE_C = "AVALANCHE_C",
    FANTOM = "FANTOM",
    LTC = "LTC",
    KAVA = "KAVA",
    BRISE = "BRISE",
    COSMOS = "COSMOS",
    SECRET = "SECRET",
    FIRO = "FIRO",
    DASH = "DASH",
    TON = "TON",
    ALGO = "ALGO",
    METIS = "METIS",
    OPTIMISM = "OPTIMISM",
    MINA = "MINA",
    BNB = "BNB",
    OSMOSIS = "OSMOSIS",
    PIVX = "PIVX",
    SUI = "SUI"
}
export declare const swapNetworks: {
    [key in Network]: SwapNetwork;
};
