import { useContext, useEffect, useMemo } from "react";
import { ArticlesContext } from "../context/ArticlesContext";
import { useRouter, useParams } from "next/navigation";

export const useCategoryArticles = () => {
    const router = useRouter();
    const params = useParams();
    const categoryName = useMemo(() => {
        if (!params?.categoryName) return undefined;
        const name = Array.isArray(params.categoryName) ? params.categoryName[0] : params.categoryName;
        return decodeURIComponent(name);
    }, [params?.categoryName]);

    const { articles, language } = useContext(ArticlesContext);

    // Buscar la categoría en el idioma actual
    const translatedCategory = useMemo(() => {
        return articles
            .map(article => article.category)
            .find(category => category?.locale === language && category?.name === categoryName);
    }, [articles, language, categoryName]);

    // Actualizar la URL cuando cambia el idioma
    useEffect(() => {
        if (translatedCategory && translatedCategory.name !== categoryName) {
            router.replace(`/category/${translatedCategory.name}`);
        }
    }, [translatedCategory, categoryName, router]);

    // Filtrar y ordenar los artículos, memorizando el resultado
    const recentArticles = useMemo(() => {
        // Filtrar por categoría
        const filteredArticles = articles.filter(article => article.category?.name === categoryName);

        // Filtrar por fecha y ordenar
        return filteredArticles
            .filter(article => new Date(article.publishedAt) <= new Date())
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }, [articles, categoryName]);

    return recentArticles;
};