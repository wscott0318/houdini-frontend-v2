import Article from "typegql/entities/types/article.entity";
export declare class ArticleInput implements Partial<Article> {
    title: string;
    url: string;
    subtitle: string;
    imageLink: string;
    published: boolean;
}
