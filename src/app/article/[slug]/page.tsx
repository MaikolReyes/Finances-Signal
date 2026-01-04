import { Metadata } from "next";
import { slugify } from "@/app/utils/slugify";
import ArticleClient from "./ArticleClient";
import { getArticles } from "@/lib/getArticles";

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata(
    props: PageProps
): Promise<Metadata> {
    const { slug } = await props.params;
    const articles = await getArticles("es");

    const article = articles.find(
        a => slugify(a.title) === slug
    );

    if (!article) {
        return {
            title: "Últimas noticias",
        };
    }

    // 🔑 URL absoluta de la imagen
    const imageUrl = article.cover
        ? article.cover.startsWith("http")
            ? article.cover
            : `https://www.financessignal.com${article.cover}`
        : "https://www.financessignal.com/images/default-og-image.jpg";

    return {
        // ⚠️ NO repitas FinanceSignal si usás title.template en layout
        title: article.title,

        description: `Análisis financiero sobre ${article.title}. Información basada en fuentes públicas y análisis editorial propio.`,

        openGraph: {
            type: "article",
            siteName: "FinanceSignal",
            title: article.title,
            description: `Análisis financiero sobre ${article.title}.`,
            url: `https://www.financessignal.com/article/${slug}`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: `Análisis financiero sobre ${article.title}.`,
            images: [imageUrl],
        },
    };
}

export default async function Page(props: PageProps) {
    // 🔑 await params
    const { slug } = await props.params;

    const articles = await getArticles("es");

    console.log("SLUG URL:", slug);

    articles.forEach(a => {
        const generatedSlug = a.title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        console.log("TITLE:", a.title);
        console.log("SLUG GENERADO:", generatedSlug);
    });

    const article = articles.find(
        a => slugify(a.title) === slug
    );

    if (!article) {
        return <h1>Artículo no encontrado</h1>;
    }

    return <ArticleClient article={article} />;
}
