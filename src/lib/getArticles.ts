import { query } from "./strapi";


export function getArticles(language: string = 'es') {
    return query(`articles?locale=${language}&pagination[limit]=100&pagination[start]=0&populate[imagen]=true&populate[category]=true&populate[localizations]=true&populate[author]=true`)
        .then(res => {
            // Iteramos sobre los artículos
            return res.map((article: { id: string; author: { name: string }; slug: string; title: string; category: { name: string, localizations: [] }; publishedAt: number; contenido: []; resumen: string; localizations: []; imagen: { url: string }, locale: string }) => {

                const { id, title, category, contenido, resumen, imagen, publishedAt, locale, localizations, author, slug } = article;

                // Aseguramos que la URL de la imagen esté definida
                const cover = `${imagen?.url}`;

                return { id, title, category, contenido, resumen, cover, publishedAt, locale, localizations, author, slug };
            });
        })
}