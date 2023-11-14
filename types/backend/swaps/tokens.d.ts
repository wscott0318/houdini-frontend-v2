import { SwapNetwork } from "./networks";
export declare enum TokenEnum {
    ADA = "ADA",
    APE = "APE",
    ATOM = "ATOM",
    ARB = "ARB",
    AVAXC = "AVAXC",
    BDX = "BDX",
    BNB = "BNB",
    BONE = "BONE",
    BRISE = "BRISE",
    BTC = "BTC",
    BUSD = "BUSD",
    BUSDETH = "BUSDETH",
    CRO = "CRO",
    DAI = "DAI",
    DAIBSC = "DAIBSC",
    DOGE = "DOGE",
    ETH = "ETH",
    ETHARB = "ETHARB",
    ETHBSC = "ETHBSC",
    FLOKI = "FLOKI",
    FTM = "FTM",
    KAVA = "KAVA",
    LEASH = "LEASH",
    LINK = "LINK",
    LINKBSC = "LINKBSC",
    LTC = "LTC",
    MATIC = "MATIC",
    POOF = "POOF",
    SHIB = "SHIB",
    SOL = "SOL",
    USDC = "USDC",
    USDT = "USDT",
    USDTARB = "USDTARB",
    USDTBSC = "USDTBSC",
    USDTTRON = "USDTTRON",
    XMR = "XMR",
    XRP = "XRP",
    APESWAP = "APESWAP",
    SCRT = "SCRT",
    FIRO = "FIRO",
    FIROBSC = "FIROBSC",
    KNC = "KNC",
    KNCBSC = "KNCBSC",
    ARC = "ARC",
    WBTC = "WBTC",
    DASH = "DASH",
    MTRG = "MTRG",
    MTRGETH = "MTRGETH",
    TON = "TON",
    ALGO = "ALGO",
    METIS = "METIS",
    MANA = "MANA",
    OP = "OP",
    MINA = "MINA",
    INJ = "INJ",
    WOOETH = "WOOETH",
    WOOBSC = "WOOBSC",
    THORCHAIN = "THORCHAIN",
    OSMOSIS = "OSMOSIS",
    MULTI = "MULTI",
    PIVX = "PIVX",
    X7R = "X7R",
    SUI = "SUI",
    PEPE = "PEPE",
    TRX = "TRX"
}
export type TokenId = keyof typeof TokenEnum;
export interface Token {
    id: TokenId;
    name: string;
    symbol: string;
    network: SwapNetwork;
    color: string;
    keyword: string;
    displayName: string;
    icon?: string;
    hasFixed?: boolean;
    hasFixedReverse?: boolean;
}
export declare const tokens: Token[];
