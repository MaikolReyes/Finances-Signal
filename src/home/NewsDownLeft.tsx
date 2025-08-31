"use client"
//
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useRecentArticles } from "../hooks/useRecenArticles";
import { getCdnUrl } from "@/utils/getCdnUrl";
import Image from "next/image";
import Link from "next/link";

export const NewsDownLeft = () => {

    const recentArticles = useRecentArticles();

    return (
        <div className="down-left">

            {recentArticles.slice(11, 15).map(({ id, title, cover, contenido, publishedAt, slug }) => {

                const formattedDate = new Intl.DateTimeFormat('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }).format(new Date(publishedAt));

                return (

                    <div key={id} className="card">
                        <div className="w-full">
                            <Link href={`/article/${slug}`} >
                                <Image
                                    src={getCdnUrl(cover)}
                                    className="object-cover rounded-sm w-full aspect-[16/9]"
                                    alt={title}
                                    width={300}
                                    height={300}
                                    priority={false}
                                    quality={50}
                                    loading="lazy"
                                />
                            </Link >
                            <div className="p-3">
                                <Link href={`/article/${slug}`} >
                                    <h2 className="class-title truncated-title">{title}</h2>
                                </Link>
                                <div className="class-content truncated-text">
                                    <BlocksRenderer content={contenido} />
                                </div>
                                <p className="date">{formattedDate}</p>
                            </div>
                        </div>
                    </div >
                )
            })}

        </div >
    )
}