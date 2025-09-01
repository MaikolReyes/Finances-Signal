"use client";
//
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useRecentArticles } from "../hooks/useRecenArticles";
// import { getCdnUrl } from "../utils/getCdnUrl";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCdnUrl } from "@/utils/getCdnUrl";

export const CarouselSlider = () => {
    const recentArticles = useRecentArticles().slice(0, 3); // 👈 solo 3 artículos
    const [current, setCurrent] = useState(0);

    // cambiar slide automáticamente cada 6s
    useEffect(() => {
        if (recentArticles.length === 0) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % recentArticles.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [recentArticles.length]);

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? recentArticles.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        setCurrent((prev) =>
            prev === recentArticles.length - 1 ? 0 : prev + 1
        );
    };

    if (recentArticles.length === 0) return null;

    return (
        <div className="relative w-full h-full aspect-[4/3] md:aspect-[3/2] xl:aspect-[5/3] 2xl:aspect-[3/2] overflow-hidden rounded-md">
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {recentArticles.map(({ id, title, contenido, cover, slug }) => (
                    <div
                        key={id}
                        className="w-full flex-shrink-0 relative h-full"
                    >
                        <Link
                            href={`/article/${slug}`}
                            className="block h-full w-full relative"
                        >
                            <Image
                                src={getCdnUrl(cover)}
                                alt={title}
                                fill
                                priority={true}
                                className="object-cover w-full h-full"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                quality={75}
                            />
                        </Link>
                        <div className="bg-carousel text-white">
                            <Link href={`/article/${slug}`}>
                                <h2 className="truncated-title title-carousel">
                                    {title}
                                </h2>
                            </Link>
                            <div className="truncated-text-carousel content-carousel">
                                <BlocksRenderer content={contenido} blocks={{
                                    link: ({ children, url }) => {
                                        // Asegurarte de que url es una URL válida
                                        const safeUrl = url.startsWith("http") ? url : "#";

                                        const label =
                                            typeof children === "string"
                                                ? children
                                                : Array.isArray(children)
                                                    ? children.map(child => (typeof child === "string" ? child : "")).join(" ")
                                                    : "Enlace";

                                        return (
                                            <Link
                                                href={safeUrl}
                                                aria-label={label.trim() || "Enlace"}
                                                className="text-blue-500 hover:underline font-bold text-base md:text-lg"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {children || <span className="sr-only">{label}</span>}
                                                <span className="sr-only">Leer artículo completo</span>
                                            </Link>
                                        );
                                    },
                                }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controles */}
            <button
                onClick={prevSlide}
                className="absolute left-3  top-1/2 md:top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2
rounded cursor-pointer"
                aria-label="Ir a la diapositiva anterior"
                type="button"
            >
                <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
                <span className="sr-only">Anterior</span>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 md:top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2
                rounded cursor-pointer"
                aria-label="Ir a la diapositiva siguiente"
                type="button"
            >
                <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                <span className="sr-only">Siguiente</span>
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 ">
                {recentArticles.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        aria-label={`Ir al slide ${index + 1}`}
                        className={`w-3 h-3 rounded-full hidden md:block ${current === index ? "bg-white" : "bg-gray-500"
                            }`}
                    />
                ))}

            </div>
        </div>
    );
};
