// app/article/[slug]/page.tsx
import { Metadata } from "next";
import ArticleClient from "./ArticleClient";

export async function generateMetadata(
    props: { params: { title: string } }
): Promise<Metadata> {
    const slug = props.params.title;
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_HOST;

    if (!slug || !API_URL) {
        return {
            title: "FinanceSignal",
        };
    }

    try {
        const res = await fetch(`${API_URL}/articles/${slug}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return {
                title: "FinanceSignal",
            };
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
                images: [
                    {
                        url: image,
                        width: 1200,
                        height: 630,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [image],
            },
        };
    } catch {
        return {
            title: "FinanceSignal",
        };
    }
}

export default function Page() {
    return <ArticleClient />;
}
