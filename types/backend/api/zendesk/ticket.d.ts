export declare class Ticket {
    protected config: any;
    protected data: any;
    protected subject: string;
    protected body: string;
    constructor();
    send(): Promise<import("axios").AxiosResponse<any, any>>;
}
