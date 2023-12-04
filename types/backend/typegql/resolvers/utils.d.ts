/// <reference types="node" />
import { Readable } from "stream";
import { LoggerInstance } from "moleculer";
import { MongoEntityManager } from "@mikro-orm/mongodb";
export declare const populateSwapCollection: (em: MongoEntityManager, logger: LoggerInstance) => Promise<boolean>;
interface FileObject {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Readable;
}
export declare const fileToBase64: (file: FileObject) => Promise<string>;
export {};
