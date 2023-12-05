import { ValidationOptions } from "class-validator";
export declare const ARRAY_CONTAINS = "arrayContains";
export declare const arrayContains: (value: any, possibleValues: any[]) => boolean;
export declare const ArrayContains: (values: any, validationOptions?: ValidationOptions) => PropertyDecorator;
