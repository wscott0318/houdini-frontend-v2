import { ClassType } from "type-graphql";
export declare abstract class BaseResolver {
}
export declare const createBaseResolver: <T extends ClassType<any>>(_objectTypeCls: T, _prefix?: string) => typeof BaseResolver;
