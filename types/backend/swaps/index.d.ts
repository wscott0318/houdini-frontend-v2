import {
	PriceResult,
	Status,
	OrderStatus,
	Swap,
	QuoteDirection,
} from 'interfaces/swap';
import FixedFloatSwap from './fixedFloatSwap';
import SimpleSwap from './simpleSwap';
import StealthExSwap from './stealthExSwap';
import ChangeNowSwap from './changeNowSwap';
import ExolixSwap from './exolixSwap';
import SwapuzSwap from './swapuzSwap';
import LetsExchangeSwap from './LetsExchangeSwap';
import ChangeHeroSwap from './ChangeHeroSwap';
import { TokenId } from './tokens';
import GodexSwap from './GodexSwap';
export declare const SWAP_STATUS: Record<string, Status>;
export declare const ORDER_STATUS: Record<string, OrderStatus>;
export declare const swaps: {
	ff: typeof FixedFloatSwap;
	ss: typeof SimpleSwap;
	se: typeof StealthExSwap;
	cn: typeof ChangeNowSwap;
	el: typeof ExolixSwap;
	sz: typeof SwapuzSwap;
	le: typeof LetsExchangeSwap;
	ch: typeof ChangeHeroSwap;
	gdx: typeof GodexSwap;
};
export declare const swapToSwap: (
	amount: number,
	to: TokenId,
	inPriceResult: PriceResult,
	outSwap: Swap,
	fixed: boolean,
	direction: QuoteDirection,
) => Promise<PriceResult>;
