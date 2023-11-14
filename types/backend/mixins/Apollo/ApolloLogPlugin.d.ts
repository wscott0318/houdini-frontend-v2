import { ApolloServerPlugin, GraphQLRequestContext } from "apollo-server-plugin-base";
export type LogMutateData = Record<string, string> & {
    context: GraphQLRequestContext;
};
export interface LogOptions {
    events: {
        [name: string]: boolean;
    };
    mutate: (data: LogMutateData) => LogMutateData;
    prefix: string;
    timestamp: boolean;
}
export declare const ApolloLogPlugin: (opts?: Partial<LogOptions>) => ApolloServerPlugin;
