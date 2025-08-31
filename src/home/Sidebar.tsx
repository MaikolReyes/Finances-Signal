"use client";
//
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useRecentArticles } from "../hooks/useRecenArticles";
import { getCdnUrl } from "@/utils/getCdnUrl";
import Image from "next/image";
import Link from "next/link";

export const Sidebar = () => {
    const recentArticles = useRecentArticles();

    if (!recentArticles || recentArticles.length === 0) return null;

    return (
        <div className="w-full h-full grid grid-cols-1 gap-5 md:gap-3 md:grid-cols-2">
            {/* Primera sección: imágenes + contenido */}
            {recentArticles.slice(3, 5).map(({ title, cover, id, publishedAt, slug, contenido }) => {
                const formattedDate = new Intl.DateTimeFormat("es-ES", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                }).format(new Date(publishedAt));

                return (
                    <div key={id} className="card">

                        <Link href={`/article/${slug}`}>
                            <div className="relative w-full h-48">
                                <Image
                                    src={getCdnUrl(cover)}
                                    alt={title}
                                    className="object-cover w-full h-full"
                                    width={400}
                                    height={200}
                                    priority={true}
                                    quality={50}
                                />
                            </div>
                        </Link>
                        <div className="p-3">
                            <Link href={`/article/${slug}`}>
                                <h2 className="truncated-title class-title">
                                    {title}
                                </h2>
                            </Link>
                            <div className="truncated-text class-content">
                                <BlocksRenderer content={contenido} />
                            </div>
                            <p className="date">
                                {formattedDate}
                            </p>
                        </div>
                    </div>
                );
            })}

            {/* Segunda sección: solo título + fecha */}
            {
                recentArticles.slice(5, 7).map(({ title, id, publishedAt, slug }) => {
                    const formattedDate = new Intl.DateTimeFormat("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                    }).format(new Date(publishedAt));

                    return (
                        <div key={id} className="card p-3">
                            <Link
                                href={`/article/${slug}`}
                                aria-label={`Leer artículo: ${title}`}>
                                <h2 className="truncated-title class-title">
                                    {title}
                                </h2>
                                <p className="date">
                                    {formattedDate}
                                </p>
                                <span className="sr-only">Leer artículo completo</span>
                            </Link>
                        </div>
                    );
                })
            }
        </div >
    );
};
