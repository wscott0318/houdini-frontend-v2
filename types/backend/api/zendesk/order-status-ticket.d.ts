import Order from "../../typegql/entities/types/order.entity";
import { Ticket } from "./ticket";
export declare class OrderStatusTicket extends Ticket {
    constructor({ id, houdiniId }: Order);
}
