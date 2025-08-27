// hooks/useRecentArticles.js
"use client"
import { useContext, useMemo } from 'react';
import { ArticlesContext } from '../context/ArticlesContext';

export const useRecentArticles = () => {

    const { articles } = useContext(ArticlesContext);

    // Filtrar y ordenar artículos recientes
    const recentArticles = useMemo(() => {
        return articles
            .filter((article) => new Date(article.publishedAt) <= new Date()) // Filtra las noticias ya publicadas
            .sort(
                (a, b) =>
                    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            ); // Ordena de más reciente a más antigua
    }, [articles]);

    return recentArticles;
};
