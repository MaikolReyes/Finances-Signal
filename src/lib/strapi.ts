// lib/api.ts
const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN; // Cambiado: sin NEXT_PUBLIC_

export async function query(url: string) {
    // Verificar que las variables estén definidas
    if (!STRAPI_HOST) {
        throw new Error('NEXT_PUBLIC_STRAPI_HOST is not defined in environment variables');
    }
    
    if (!STRAPI_TOKEN) {
        throw new Error('STRAPI_TOKEN is not defined in environment variables');
    }

    const fullUrl = `${STRAPI_HOST}/api/${url}`;

    
    try {
        const response = await fetch(fullUrl, {
            headers: {
                'Authorization': `Bearer ${STRAPI_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`HTTP ${response.status}:`, errorText);
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // Verificar que sea JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Expected JSON but got:', text.substring(0, 200));
            throw new Error('Response is not JSON');
        }

        const result = await response.json();

        // Verificar estructura de respuesta de Strapi
        if (result.data) {
            return result.data; // Strapi v4 structure
        } else if (Array.isArray(result)) {
            return result; // Strapi v3 structure
        } else {
            console.warn('Unexpected response structure:', result);
            return result;
        }

    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Funciones específicas para endpoints
// export async function getArticles(locale = 'es', limit = 100, start = 0) {
//     const endpoint = `articles?locale=${locale}&pagination[limit]=${limit}&pagination[start]=${start}&populate[imagen]=true&populate[category]=true&populate[localizations]=true&populate[author]=true`;
//     return query(endpoint);
// }

// export async function getCategories(limit = 100) {
//     const endpoint = `categories?populate=localizations&pagination[limit]=${limit}`;
//     return query(endpoint);
// }

// Versión para usar solo en el cliente (sin token)
export async function queryClient(url: string) {
    const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST;
    
    if (!STRAPI_HOST) {
        throw new Error('NEXT_PUBLIC_STRAPI_HOST is not defined');
    }

    const fullUrl = `${STRAPI_HOST}/api/${url}`;
    
    try {
        const response = await fetch(fullUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        return result.data || result;

    } catch (error) {
        console.error('Client API Error:', error);
        throw error;
    }
}