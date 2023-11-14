import { FileUpload } from "graphql-upload";
export default class UploadResolver {
    sendBug(email: string, telegram: string, discord: string, twitter: string, description: string, files: FileUpload[]): Promise<boolean>;
}
