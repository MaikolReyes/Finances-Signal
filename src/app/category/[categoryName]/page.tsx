"use client"
//
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useCategoryArticles } from "../../../hooks/useCategoryArticles";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function CategoryContent() {

    const { categoryName } = useParams(); // <-- acá lo obtenés

    const recentArticles = useCategoryArticles();

    const decodedCategory = decodeURIComponent(categoryName as string); // <-- decode

    useEffect(() => {
        if (decodedCategory && decodedCategory !== "Artículo sin título") {
            document.title = `FinanceSignal | ${decodedCategory}`;
        }
    }, [decodedCategory]);


    return (
        <>
            <h1 className="text-xl m-5 text-center font-secondary font-bold text-gray-800 md:text-3xl">
                {decodedCategory}
            </h1>
            <div className="container-section">

                {recentArticles.slice(0, 4).map(({ id, title, cover, contenido, publishedAt, slug }) => {

                    const formattedDate = new Intl.DateTimeFormat('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }).format(new Date(publishedAt));

                    return (
                        <div key={id} className="border-2 border-gray-300 rounded">
                            <div className="flex flex-col md:flex-row h-full">
                                <div className="xl:w-2/3 2xl:w-1/3">
                                    <Link href={`/article/${slug}`} className="no-underline text-inherit">

                                        {cover && (
                                            <Image src={cover}
                                                width={300}
                                                height={300}
                                                priority={true}
                                                quality={75}
                                                className="object-cover rounded w-full h-48"
                                                alt={title} />
                                        )}
                                    </Link>
                                </div>

                                <div className="w-full 2xl:w-4/5 p-3">
                                    <div className="card-body">
                                        <Link href={`/article/${slug}`} className="no-underline text-inherit">
                                            <h3 className="truncated-title class-title">{title}</h3>
                                        </Link>
                                        <div className="truncated-text class-content">
                                            <BlocksRenderer content={contenido} />
                                        </div>
                                        <p className="date">
                                            {formattedDate}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                }

            </div >

            <div className="article-down p-3 mb-8">
                {
                    recentArticles.slice(4, 8).map(({ id, title, cover, contenido, publishedAt, slug }) => {

                        const formattedDate = new Intl.DateTimeFormat('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(publishedAt));

                        return (
                            <div key={id} className="border-2 border-gray-300 rounded">
                                <div className="card w-full">
                                    <Link href={`/article/${slug}`} className="no-underline text-inherit">
                                        {cover && (
                                            <Image src={cover}
                                                width={300}
                                                height={300}
                                                priority={true}
                                                quality={75}
                                                className="object-cover rounded-sm w-full h-48"
                                                alt={title} />
                                        )}
                                    </Link>
                                    <div className="p-3">
                                        <h3 className="truncated-title class-title">{title}</h3>
                                        <div className="truncated-text class-content">
                                            <BlocksRenderer content={contenido} />
                                        </div>
                                        <p className="date">
                                            {formattedDate}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
            </div>
        </>
    );
};