"use client"

import { useRouter, usePathname } from 'next/navigation';
import { useContext } from 'react';
import { ArticlesContext } from '../context/ArticlesContext';
import { CategoriesContext } from '../context/CategoriesContext';

export const useLanguageNavigation = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { articles, setLanguage: setArticlesLanguage } = useContext(ArticlesContext);
    const { categories, setLanguage: setCategoriesLanguage } = useContext(CategoriesContext);

    const changeLanguage = (newLanguage: string) => {
        // Actualizar los contextos
        setArticlesLanguage(newLanguage);
        setCategoriesLanguage(newLanguage);

        // Obtener la ruta actual
        const currentPath = pathname;

        // Si estamos en una página de artículo específico
        if (currentPath.startsWith('/article/')) {
            const currentSlug = currentPath.replace('/article/', '');

            // Buscar el artículo actual por slug
            const currentArticle = articles.find(article =>
                article.slug === currentSlug ||
                article.localizations?.some(loc => loc.slug === currentSlug)
            );

            if (currentArticle) {
                // Si el artículo ya está en el idioma deseado
                if (currentArticle.locale === newLanguage) {
                    router.push(`/article/${currentArticle.slug}`);
                } else {
                    // Buscar la localización en el idioma deseado
                    const localization = currentArticle.localizations?.find(loc => loc.locale === newLanguage);
                    if (localization) {
                        router.push(`/article/${localization.slug}`);
                    } else {
                        // Si no hay localización, ir al home
                        router.push('/');
                    }
                }
            }
        }
        // Si estamos en una página de categoría
        else if (currentPath.startsWith('/category/')) {
            const currentCategoryName = decodeURIComponent(currentPath.replace('/category/', ''));

            // Buscar la categoría actual por nombre
            const currentCategory = categories.find(category =>
                category.name === currentCategoryName ||
                category.localizations?.some(loc => loc.name === currentCategoryName)
            );

            if (currentCategory) {
                // Si la categoría ya está en el idioma deseado
                if (currentCategory.locale === newLanguage) {
                    router.push(`/category/${encodeURIComponent(currentCategory.name)}`);
                } else {
                    // Buscar la localización en el idioma deseado
                    const localization = currentCategory.localizations?.find(loc => loc.locale === newLanguage);
                    if (localization) {
                        router.push(`/category/${encodeURIComponent(localization.name)}`);
                    } else {
                        // Si no hay localización, ir al home
                        router.push('/');
                    }
                }
            }
        }
        // Para otras rutas (home, etc.), mantener la misma ruta
        else {
            // No necesitamos navegar, solo cambiar el idioma
            // Opcionalmente podrías hacer router.refresh() para recargar la página actual
        }
    };

    return { changeLanguage };
};