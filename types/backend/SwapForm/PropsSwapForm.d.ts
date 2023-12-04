export interface Swap {
	maxAmount: number;
	flipArrow: any;
	destinationTag: string | number | readonly string[] | undefined;
	minAmount: number;
	id: string;
	send: SendReceiveInput;
	receive: SendReceiveInput;
	anonymous?: boolean;
	fixed?: boolean;
	receiveAddress: string;
	collapsed?: boolean;
	direction: string;
	anonymousToken: string;
	partnerId: string | null;
}

interface SwapProps {
	sendValue: string;
	sendIcon: string;
	sendColor: string;
	sendName: string;
	receiveValue: string;
	receiveIcon: string;
	receiveColor: string;
	receiveName: string;
	receiveAddress?: string;
	senderAddress?: string;
	anonymous: boolean;
	id?: string;
	full?: boolean;
	handleEditSwap?: (id: string) => void;
	canDelete: boolean;
	handleDelete?: (id: string) => void;
}

export interface SendReceiveInput {
	memoNeeded?: any;
	name: string;
	color: string;
	value: string;
	icon?: string;
	displayName: string;
}
