export declare const encrypt: (text: string) => {
    iv: string;
    encryptedData: string;
};
export declare const decrypt: (text: {
    iv: string;
    encryptedData: string;
}) => string;
export declare const parseBasicAuth: (auth: string) => {
    scheme: string;
    id: string;
    secret: string;
};
