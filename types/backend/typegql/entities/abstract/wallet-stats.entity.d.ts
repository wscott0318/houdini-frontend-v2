import { Raffle } from "./raffle.entity";
export default class WalletStats {
    count: number;
    value: number;
    fees: number;
    customTier: number;
    raffle: Raffle | null;
}
