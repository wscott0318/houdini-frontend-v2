import Article from "../entities/types/article.entity";
import { TypeGraphContext } from "../interfaces/context.interface";
declare const ArticleResolver_base: typeof import("./base.resolver").BaseResolver;
export default class ArticleResolver extends ArticleResolver_base {
    articles(ctx: TypeGraphContext): Promise<import("@mikro-orm/core").Loaded<Article, never>[]>;
    article(ctx: TypeGraphContext, id: string): Promise<import("@mikro-orm/core").Loaded<Article, never>>;
}
export {};
