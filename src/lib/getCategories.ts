import { query } from "./strapi";

export function getCategories() {
    return query(`categories?populate=localizations&pagination[limit]=100`)
        .then(res => {
            return res.map((category: {
                id: string;
                name: string;
                slug: string;
                locale: string;
                localizations: { id: string; name: string; locale: string; slug: string }[];
            }) => {

                const { id, name, slug, locale, localizations } = category;

                // Usamos el ID original como documentId (puede ajustarse si tenés un campo real llamado documentId)
                const documentId = category.localizations?.[0]?.id
                    ? category.localizations[0].id // su traducción
                    : id; // o el mismo si no tiene traducción

                return {
                    id, name, slug, locale, localizations, documentId
                };
            });
        });
}
