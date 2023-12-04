import Order from "../../typegql/entities/types/order.entity";
import { Ticket } from "./ticket";
export declare class OrderStatusErrorTicket extends Ticket {
    constructor(order: Order);
}
