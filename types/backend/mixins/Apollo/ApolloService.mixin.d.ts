import { MikroORM } from "@mikro-orm/core";
import { TypeGraphContext } from "typegql/interfaces/context.interface";
declare const ApolloService: {
    name: string;
    settings: {
        routeOptions: {
            logging: boolean;
            path: string;
        };
        serverOptions: {};
    };
    mixins: {
        name: string;
        methods: {
            setupORM(container?: import("typedi").ContainerInstance): Promise<void | MikroORM<import("@mikro-orm/core").IDatabaseDriver<import("@mikro-orm/core").Connection>>>;
            getConnection(): Promise<any>;
            getEm(): Promise<any>;
        };
    }[];
    methods: {
        context(context: any): Promise<Partial<TypeGraphContext>>;
        generateGraphQLSchema(): Promise<false | import("graphql").GraphQLSchema>;
        prepareServer(): Promise<void>;
    };
    created(): Promise<void>;
    started(): Promise<void>;
};
export default ApolloService;
