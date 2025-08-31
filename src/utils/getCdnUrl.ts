// utils/getCdnUrl.ts

const CLOUDFRONT_DOMAIN = "https://d1gbtbhodg3cj1.cloudfront.net";
const S3_DOMAIN = "https://img-financessignal-s3.s3.sa-east-1.amazonaws.com";

/**
 * Reemplaza la URL de S3 por la de CloudFront.
 * Si la URL no contiene S3, devuelve la misma URL.
 */
export function getCdnUrl(url: string): string {
    if (!url) return ""; // manejo de valores nulos
    return url.replace(S3_DOMAIN, CLOUDFRONT_DOMAIN);
}
