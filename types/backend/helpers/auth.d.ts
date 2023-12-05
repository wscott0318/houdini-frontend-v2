import { Account } from "../typegql/entities/types/account.entity";
export declare const JWT_SECRET: string;
export declare const generateJWT: (payload: {
    id: string;
}, secret: string, expiresIn?: string | number) => string | void;
export declare const verifyJWT: (token: string) => {
    id: string;
} | void;
export declare const getToken: (account: Account, secret: string, expiresIn?: string | number) => string | void;
