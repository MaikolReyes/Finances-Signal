import { useContext, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArticlesContext } from "../context";

export const useArticlesLanguage = () => {
    const { articles, language } = useContext(ArticlesContext);
    const router = useRouter();
    const params = useParams();

    // params.slug viene de la ruta [slug]
    const slug = params.slug as string;

    // Buscar el artículo actual por slug
    const currentArticle = articles?.find(article => article.slug === slug);

    const localizations = currentArticle?.localizations;

    // Primera localización si existe
    const firstLocalization = localizations?.[0];

    // Buscar la versión traducida según el idioma
    const translatedArticle = firstLocalization?.locale === language ? firstLocalization : currentArticle;

    // Navegar a la versión traducida si es necesario
    useEffect(() => {
        if (translatedArticle && translatedArticle.slug !== slug) {
            router.replace(`/article/${translatedArticle.slug}`);
        }
    }, [translatedArticle, slug, router]);

    return currentArticle;
};
