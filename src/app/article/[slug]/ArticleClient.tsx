"use client";
//
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
// import { useArticlesLanguage } from '@/hooks/useArticlesLanguage';
import { ShareButtons } from '../../../controls/ShareButtons';
import { getCdnUrl } from "../../../utils/getCdnUrl";
import { socialLinks } from '@/lib/socialLinks';
import { NewsRelations, SideNews } from '@/components';
import { DarkModeContext } from '@/context';
import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';


type ArticleProps = {
    article: {
        id: number;
        title: string;
        contenido: BlocksContent;
        resumen: BlocksContent;
        publishedAt: string;
        cover: string | null;
        author: {
            name: string;
        }
    };
};


export default function ArticleClient({ article }: ArticleProps) {
    const {
        id,
        title,
        contenido,
        resumen,
        publishedAt,
        cover,
        author,
    } = article; // 👈 AHORA article SE USA

    const { darkMode } = useContext(DarkModeContext);
    // Context
    // const currentArticles = useArticlesLanguage();



    const formattedDate = publishedAt
        ? new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        }).format(new Date(publishedAt))
        : 'Fecha no disponible';


    return (

        <>

            <div className='grid grid-cols-1 md:grid-cols-3 mx-auto p-3 md:p-2 mt-2 gap-5'>

                <div key={id} className="flex flex-col col-span-2 justify-center w-full ml-auto md:w-4/5 2xl:w-3/5">

                    <h1 className="text-xl font-secondary font-bold text-gray-800 md:text-3xl">{title}</h1>
                    <div className={`flex gap-3 p-1 border-t-2 my-1 ${darkMode ? 'border-white' : 'border-gray-300'}`}>

                        {
                            socialLinks.map(({ href, label, icon }) => (
                                <a key={label} href={href} target='_blank'
                                    rel="noopener noreferrer" aria-label={`Ingresar a ${label}`}
                                    className='icon-redes text-2xl text-gray-800'>
                                    <i className={`fa-brands ${icon} hover:text-blue-500`}></i>
                                </a>
                            ))
                        }
                    </div>

                    {cover && (
                        <Image
                            src={cover ? getCdnUrl(cover) : 'https://www.financessignal.com/images/default-og-image.jpg'}
                            className="rounded-xl shadow-lg w-full mx-auto"
                            width={1200}
                            height={500}
                            alt={title}
                            priority={true}
                            quality={75}
                        />
                    )}

                    <div className="p-3 border-2 mt-2 mb-2 border-gray-300 rounded flex items-center gap-3">
                        {/* Foto autor */}
                        <Image
                            src="/images/autor-maikol.png"
                            alt="Maikol Reyes - Analista financiero en FinanceSignal"
                            width={12}
                            height={12}
                            className="w-12 h-12 rounded-full object-cover border"
                        />

                        {/* Info autor */}
                        <div>
                            <h2 className="font-secondary text-base font-semibold">
                                Autor:{" "}
                                <a
                                    href="https://www.linkedin.com/in/maikol-reyes"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {author.name}
                                </a>{" "}
                                <span className="font-normal text-gray-600">
                                    – Analista financiero en FinanceSignal
                                </span>
                            </h2>

                            <p className="font-secondary font-bold text-base">
                                Fecha de publicación: {formattedDate}
                            </p>
                        </div>
                    </div>


                    <div className={`bg-gray-100 rounded p-5 border border-gray-300 shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'}`}>
                        <BlocksRenderer content={resumen}
                            blocks={{
                                paragraph: ({ children }) => <p className="font-title text-base md:text-lg">{children}</p>,
                                list: ({ children }) => <ul className="list-disc pl-6 text-base md:text-lg">{children}</ul>,
                                'list-item': ({ children }) => <li className='font-title text-base md:text-lg'>{children}</li>
                            }}
                        />
                    </div>

                    <div className='mt-4'>
                        <BlocksRenderer content={contenido}
                            blocks={{
                                paragraph: ({ children }) => (
                                    <p className="font-secondary text-gray-900 text-base md:text-lg">{children}</p>),
                                heading: ({ children, level }) => {
                                    const sizeMap: Record<number, string> = {
                                        1: 'text-5xl', 2: 'text-4xl', 3: 'text-3xl', 4: 'text-2xl', 5: 'text-xl', 6: 'text-lg',
                                    };
                                    const className = `${sizeMap[level] || 'text-base'} font-bold font-secondary text-gray-800`;

                                    switch (level) {
                                        case 1: return <h1 className={className}>{children}</h1>;
                                        case 2: return <h2 className={className}>{children}</h2>;
                                        case 3: return <h3 className={className}>{children}</h3>;
                                        case 4: return <h4 className={className}>{children}</h4>;
                                        case 5: return <h5 className={className}>{children}</h5>;
                                        case 6: return <h6 className={className}>{children}</h6>;
                                        default: return <h1 className={className}>{children}</h1>;
                                    }
                                },

                                image: ({ image }) => (
                                    <div className="flex justify-center">
                                        <Image
                                            src={getCdnUrl(image.url)}
                                            alt={image.alternativeText || 'Imagen'}
                                            width={1200}
                                            height={500}
                                            className="rounded-lg shadow-md max-w-full"
                                            style={{ maxWidth: '100%', height: 'auto' }}  // Aquí puedes agregar más estilos
                                        />
                                    </div>
                                ),
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
                                quote: ({ children }) => (
                                    <blockquote className={`font-secondary text-base md:text-lg border-l-4 border-blue-500 pl-4 italic font-bold my-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {children}
                                    </blockquote>
                                ),
                                list: ({ children }) => <ul className="list-disc pl-6">{children}</ul>,
                                'list-item': ({ children }) => <li className='font-secondary text-gray-900 text-base md:text-lg'>{children}</li>
                            }}
                        />
                        {/* <Tradingview symbol="NASDAQ:AAPL" /> */}
                    </div>

                    <section
                        className="mt-6 p-4 bg-gray-100 rounded text-sm text-gray-800 font-title"
                        aria-label="Información del autor"
                    >
                        <h3 className="font-semibold mb-1">
                            Sobre el autor
                        </h3>

                        <p>
                            Maikol Reyes es creador de FinanceSignal, un medio digital enfocado en
                            economía, finanzas personales y análisis del costo de vida en Argentina.
                            Analiza información pública, datos oficiales y tendencias del mercado
                            con un enfoque informativo y educativo para lectores interesados en
                            comprender el contexto económico actual.
                        </p>
                    </section>


                    <section
                        className="mt-6 mb-6 p-4 border-l-4 border-gray-400 bg-gray-50 text-sm text-gray-700 font-title"
                        aria-label="Aviso legal"
                    >
                        <h3 className="font-semibold mb-1">
                            Aviso legal / Disclaimer
                        </h3>

                        <p>
                            Este contenido tiene fines exclusivamente informativos y educativos.
                            No constituye asesoramiento financiero, legal ni impositivo.
                            Las decisiones económicas deben tomarse con información actualizada
                            y, de ser necesario, con el asesoramiento de un profesional matriculado.
                        </p>

                        <p className="mt-2">
                            Los contenidos publicados en FinanceSignal se basan en información pública,
                            fuentes oficiales y análisis editorial propio.
                        </p>
                    </section>

                    <ShareButtons
                        title={title}
                        url={`https://www.financessignal.com/article/${title}`}
                    />
                    <NewsRelations />
                </div >

                <SideNews />
            </div>

        </>
    );
};