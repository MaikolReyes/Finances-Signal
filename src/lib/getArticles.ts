// import { BlocksContent } from "@strapi/blocks-react-renderer";
import { query } from "./strapi";

// type StrapiResponse<T> = {
//     data: {
//         id: number;
//         attributes: T;
//     }[] | null;
// };

// type ArticleAttributes = {
//     title: string;
//     slug: string;
//     contenido: BlocksContent;
//     resumen: BlocksContent;
//     imagen?: { url?: string };
//     publishedAt: string;
//     locale: string;
//     localizations: [];
//     author: string;
//     category?: { name: string };
// };

export async function getArticles(language: string = "es") {
    const res = await query(
        `articles?locale=${language}&pagination[limit]=100&pagination[start]=0&populate=*&publicationState=live`
    );

    // 🔑 TU query YA DEVUELVE UN ARRAY
    if (!Array.isArray(res)) {
        console.error("Strapi devolvió algo inesperado:", res);
        return [];
    }

    return res.map((article) => {
        const {
            id,
            title,
            category,
            contenido,
            resumen,
            imagen,
            publishedAt,
            locale,
            localizations,
            author,
            slug,
        } = article;

        return {
            id,
            title,
            slug,
            category,
            contenido,
            resumen,
            cover: imagen?.url ?? null,
            publishedAt,
            locale,
            localizations,
            author,
        };
    });
}
