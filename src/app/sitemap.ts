// app/sitemap.ts
import { MetadataRoute } from "next";

type Article = {
    slug: string;
    updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://www.financessignal.com";
    let articles: Article[] = [];

    try {
        const res = await fetch(`${baseUrl}/api/articles`, {
            cache: "no-store",
        });

        if (res.ok) {
            articles = await res.json();
        }
    } catch {
        // No hacemos nada para evitar romper el sitemap
    }

    const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${baseUrl}/article/${article.slug}`,
        lastModified: article.updatedAt
            ? new Date(article.updatedAt)
            : new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/category/finanzas`,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/category/economia`,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/category/tecnologia`,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/category/criptomonedas`,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        ...articleUrls,
    ];
}
