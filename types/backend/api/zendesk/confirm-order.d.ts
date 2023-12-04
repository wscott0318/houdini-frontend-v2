import { Swap } from "interfaces/swap";
import Order from "../../typegql/entities/types/order.entity";
import { Ticket } from "./ticket";
export declare class ConfirmOrderTicket extends Ticket {
    constructor({ houdiniId, inOrderId }: Order, hash: string, swapIn: Swap);
}
