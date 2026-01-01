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
            title: "FinanceSignal | Últimas noticias",
        };
    }

    return {
        title: `${article.title} | FinanceSignal`,
        description: article.resumen
            ? undefined
            : `Análisis financiero sobre ${article.title}`,
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
