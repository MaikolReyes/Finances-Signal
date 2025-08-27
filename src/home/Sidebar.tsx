"use client"

import Link from "next/link";
import Image from "next/image";
import { useRecentArticles } from "../hooks/useRecenArticles";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export const Sidebar = () => {

    const recentArticles = useRecentArticles();

    return (

        <div className="w-full h-full grid grid-cols-1 justify-start gap-3 tablet:grid-cols-2">

            {recentArticles.slice(1, 3).map(({ title, cover, id, publishedAt, slug, contenido }) => {

                const formattedDate = new Intl.DateTimeFormat('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }).format(new Date(publishedAt));

                return (

                    <div className="card" key={id}>
                        <Link href={`/article/${slug}`} className="w-full no-underline text-inherit">
                            <Image
                                src={cover}
                                className="object-cover h-40 large-desktop:h-48 w-full rounded-start"
                                alt={title}
                                priority
                                width={400}
                                height={160}
                            />
                        </Link>
                        <div className="card-body">
                            <h2 className="truncated-title font-title text-base large-desktop:text-xl">
                                {title}
                            </h2>
                            <div className="truncated-text text-gray-600 font-secondary text-sm desktop:text-base large-desktop:text-lg">
                                <BlocksRenderer content={contenido} />
                            </div>
                            <p className="card-text"><small className="text-date">{formattedDate}</small></p>
                        </div>

                    </div>
                )
            })
            }

            {recentArticles.slice(3, 5).map(({ title, id, publishedAt, slug }) => {

                const formattedDate = new Intl.DateTimeFormat('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }).format(new Date(publishedAt));

                return (

                    <div className="card" key={id}>
                        <Link href={`/article/${slug}`}>
                            <div className="card-body">
                                <h2 className="truncated-title font-title text-base large-desktop:text-xl">
                                    {title}
                                </h2>
                                <p className="card-text"><small className="text-date">{formattedDate}</small></p>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}