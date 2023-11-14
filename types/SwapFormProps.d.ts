import { Token } from '@be/types/swaps/tokens';

export interface SwapFormProps {
	swap: Swap;
	handleAnonymous: (id: string) => void;
	handleFixed: (id: string) => void;
	handleAnonymousToken: (value: string, id: string) => void;
	handleChange: (
		event: ChangeEvent<HTMLInputElement>,
		type: string,
		reverse?: boolean,
	) => void;
	handleArrows: (id: string) => void;
	handleReceiveAddress: (value: string, id: string) => void;
	selectCoin: (el: Token, field: string, swapId: string) => void;
	handleEditSwap: (swapId: string) => void;
	tokens: Token[];
	theme?: string;
	isWidgetMode?: boolean;
	isPriceQuoting: boolean;
	canDelete: boolean;
	multiSend: boolean;
	handleReceiverTag: (value: string, id: string) => void;
	handleDelete: (swapId: string) => void;
	handleCollapseSwap: (id: string) => void;
	tokenLockOut?: boolean;
	handleAddNewSwap: () => void;
}
