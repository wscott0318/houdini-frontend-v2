import Article from "../../entities/types/article.entity";
import { TypeGraphContext } from "../../interfaces/context.interface";
import { ArticleInput } from "../../entities/inputs/article/article.input";
declare const AdminArticleResolver_base: typeof import("../base.resolver").BaseResolver;
export default class AdminArticleResolver extends AdminArticleResolver_base {
    adminCreateArticle(ctx: TypeGraphContext, data: ArticleInput): Promise<Article>;
    adminUpdateArticle(ctx: TypeGraphContext, id: string, data: ArticleInput): Promise<Article>;
    adminDeleteArticle(ctx: TypeGraphContext, id: string): Promise<void>;
    adminArticles(ctx: TypeGraphContext): Promise<import("@mikro-orm/core").Loaded<Article, never>[]>;
    adminArticle(ctx: TypeGraphContext, id: string): Promise<import("@mikro-orm/core").Loaded<Article, never>[]>;
}
export {};
