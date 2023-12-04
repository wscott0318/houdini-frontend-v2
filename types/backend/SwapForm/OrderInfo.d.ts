import { OrderStatusResult } from './typegql/entities/abstract/order.status';
import { Token } from '../swaps/tokens';

export interface OrderInfoProps {
	index: number;
	tokens: Token[];
	order: OrderStatusResult;
	refetch: () => void;
}
