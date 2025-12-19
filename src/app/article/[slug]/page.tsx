// app/article/[slug]/page.tsx
import { Metadata } from "next";
import ArticleClient from "./ArticleClient";

export async function generateMetadata(
    { params }: { params: { slug: string } }
): Promise<Metadata> {

    const slug = params.slug;

    const API_URL = process.env.NEXT_PUBLIC_STRAPI_HOST;

    if (!slug) {
        return {};
    }

    const res = await fetch(
        `${API_URL}/articles/${slug}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        return {};
    }

    const article = await res.json();

    const title = article?.title ?? "FinanceSignal";
    const description =
        article?.resumen?.slice(0, 160) ?? title;
    const image =
        article?.cover ??
        "https://www.financessignal.com/images/default-og-image.jpg";

    return {
        title,
        description,
        alternates: {
            canonical: `https://www.financessignal.com/article/${slug}`,
        },
        openGraph: {
            type: "article",
            siteName: "FinanceSignal",
            title,
            description,
            url: `https://www.financessignal.com/article/${slug}`,
            images: [{ url: image, width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}

export default function Page() {
    return <ArticleClient />;
}



