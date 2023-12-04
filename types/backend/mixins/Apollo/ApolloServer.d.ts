import { ApolloServerBase } from "apollo-server-core";
import { UploadOptions } from "graphql-upload";
export declare class ApolloServer extends ApolloServerBase {
    uploadsConfig: UploadOptions;
    createGraphQLServerOptions(req: any, res: any): Promise<import("apollo-server-core").GraphQLOptions<Record<string, any>, any>>;
    createHandler({ path, disableHealthCheck, onHealthCheck, }?: any): (req: any, res: any) => Promise<void>;
    supportsUploads(): boolean;
    supportsSubscriptions(): boolean;
    handleHealthCheck({ req, res, onHealthCheck }: any): Promise<void>;
}
