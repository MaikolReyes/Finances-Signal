// app/sitemap.ts
import { MetadataRoute } from "next";

type Article = {
    slug: string;
    updatedAt: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://www.financessignal.com";

    const res = await fetch(`${baseUrl}/api/articles`, {
        cache: "no-store",
    });

    const articles: Article[] = await res.json();

    const articleUrls: MetadataRoute.Sitemap = articles.map(
        (article) => ({
            url: `${baseUrl}/article/${article.slug}`,
            lastModified: new Date(article.updatedAt),
            changeFrequency: "weekly",
            priority: 0.9,
        })
    );

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/category/finanzas`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/category/tecnologia`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/category/criptomonedas`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        },
        ...articleUrls,
    ];
}
