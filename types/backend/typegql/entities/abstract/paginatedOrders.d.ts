import Order from "../types/order.entity";
export default class PaginatedOrders {
    totalPages: number;
    items: Order[];
    constructor(items: Order[], totalPages: number);
}
