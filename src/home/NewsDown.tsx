"use client"
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useRecentArticles } from "../hooks/useRecenArticles";
import { getCdnUrl } from "@/utils/getCdnUrl";
import Image from "next/image";
import Link from "next/link";

export const NewsDown = () => {

    const recentArticles = useRecentArticles();

    return (
        <div className="w-full grid grid-cols-1 gap-5 items-center md:grid-cols-2">

            {recentArticles.slice(7, 11).map(({ id, title, cover, contenido, publishedAt, slug }) => {

                const formattedDate = new Intl.DateTimeFormat('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }).format(new Date(publishedAt));


                return (
                    <div key={id} className="card">
                        <div className="flex flex-col md:flex-row h-full">

                            <div className="h-48 xl:h-52 xl:w-2/3 2xl:w-2/5">
                                <Link href={`/article/${slug}`}>
                                    <Image
                                        src={getCdnUrl(cover)}
                                        width={300}
                                        height={200}
                                        className="object-cover rounded h-full w-full"
                                        alt={title}
                                        priority={false}
                                        quality={50}
                                    />
                                </Link>
                            </div>

                            <div className="w-full 2xl:w-4/5 p-5">
                                <div className="card-body">
                                    <Link href={`/article/${slug}`}>
                                        <h2 className="truncated-title class-title">{title}</h2>
                                    </Link>
                                    <div className="truncated-text class-content">
                                        <BlocksRenderer content={contenido} />
                                    </div>
                                    <p className="date">{formattedDate}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            })}
        </div >


    )
}