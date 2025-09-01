"use client"
//
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useRecentArticles } from '../hooks/useRecenArticles';
import { getCdnUrl } from "@/utils/getCdnUrl";
import Link from 'next/link';
import Image from 'next/image';
import { DarkModeContext } from '@/context';
import { useContext } from 'react';

export const NewsRelations = () => {

    const { darkMode } = useContext(DarkModeContext);
    const recentArticles = useRecentArticles();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 border-t-2 border-gray-400 md:gap-5">
            {
                recentArticles.slice(1, 3).map(({ id, title, cover, contenido, publishedAt, slug }) => {
                    const formattedDate = new Intl.DateTimeFormat('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }).format(new Date(publishedAt));

                    return (
                        <div key={id} className={`my-2 md:my-6  ${darkMode ? 'border-white' : 'border-gray-800'}`} >
                            <div className="card">
                                <Link href={`/article/${slug}`} className="no-underline text-inherit">
                                    <Image
                                        src={getCdnUrl(cover)}
                                        className="object-cover rounded-sm w-full aspect-[16/9]"
                                        alt={title}
                                        width={300}
                                        height={300}
                                        priority={false}
                                        quality={50}
                                    />
                                </Link>
                                <div className=" p-3">
                                    <h3 className="truncated-title class-title">{title}</h3>
                                    <div className="truncated-text class-content">
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
