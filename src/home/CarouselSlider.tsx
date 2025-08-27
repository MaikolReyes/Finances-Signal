"use client"
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useRecentArticles } from "../hooks/useRecenArticles";
import Link from "next/link";
import Image from "next/image";


export const CarouselSlider = () => {

    const recentArticles = useRecentArticles();

    return (
        <div className="w-full h-full aspect-[4/3] tablet:aspect-[3/2] desktop:aspect-[5/3] large-desktop:aspect-[3/2]">

            <div id="carouselExampleCaptions" className="carousel slide overflow-hidden rounded-md h-full">
                <div className="carousel-inner m-auto h-full">
                    {
                        recentArticles.slice(0).map(({ id, title, contenido, cover, slug }, index) => (
                            <div key={id} className={`carousel-item w-full h-full ${index === 0 ? 'active' : ''}`}>
                                <Link href={`/article/${slug}`} className="no-underline text-inherit position-relative h-full">
                                    <Image src={cover}
                                        className="object-cover w-full h-full"
                                        width="1200" height="500"
                                        loading="eager"
                                        alt={title} />
                                </Link>

                                <div className="absolute bottom-0 tablet:mb-8 tablet:left-[10%] tablet:right-[10%] p-3 flex flex-col items-center text-white text-center bg-black/70 rounded-md tablet:rounded-lg">
                                    <h2 className="font-title text-base desktop:text-lg large-desktop:text-xl">{title}</h2>
                                    <div className="truncated-text text-sm desktop:text-base large-desktop:text-lg text-gray-300">
                                        <BlocksRenderer content={contenido} />
                                    </div>
                                </div>

                            </div>
                        ))}
                </div>

            </div >
        </div >

    )
}

