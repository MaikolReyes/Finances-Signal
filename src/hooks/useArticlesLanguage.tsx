import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArticlesContext } from "../context";

export const useArticlesLanguage = () => {

    const { slug } = useParams();
    const { articles, language } = useContext(ArticlesContext);
    const navigate = useNavigate();

    // Buscar el artículo actual por título
    const currentArticle = articles?.find((article) => article.slug === slug);

    const localizations = currentArticle?.localizations;

    // Si deseas acceder a la primera localización
    const firstLocalization = localizations?.[0];

    // Buscar la versión traducida según el idioma
    const translatedArticle = firstLocalization?.locale === language ? firstLocalization : currentArticle;

    // Navegar a la versión traducida si es necesario
    useEffect(() => {
        if (translatedArticle && translatedArticle.slug !== slug) {
            navigate(`/article/${translatedArticle.slug}`, { replace: true });
        }
    }, [translatedArticle, slug, navigate]);

    return currentArticle;
};

