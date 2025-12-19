"use client"

import { CategoriesContext, DarkModeContext } from "../context";
import { useContext, useMemo, useState } from "react";
import TradingviewTicker from "./TradingviewTicker";
import { DarkMode } from "../controls";
import lightLogo from '../assets/logoFinanceSignal.png';
import darkLogo from '../assets/logoFinanceSignal-white.png';
import Link from "next/link";
import Image from "next/image";


export const Navbar = () => {
    const { darkMode } = useContext(DarkModeContext);
    const { categories, language } = useContext(CategoriesContext);

    const [isOpen, setIsOpen] = useState(false);

    const sharedClasses = `block font-title text-sm md:text-base 2xl:text-base transition-colors duration-200 ${darkMode
        ?
        "text-white hover:text-gray-200"
        :
        "text-black hover:text-gray-700"
        }`;

    // Filtrar categorías únicas según idioma
    const uniqueCategories = useMemo(() => {
        return categories
            .flatMap(category => {
                if (category.locale === language) return [category];
                const localization = category.localizations?.find(
                    loc => loc.locale === language
                );
                return localization ? [localization] : [];
            })
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [categories, language]);

    return (
        <>
            <nav className="shadow-md z-10 h-full flex flex-col md:flex-row text-center items-center justify-around md:h-14">

                {/* Logo */}
                <div className="flex items-start p-3 md:p-0">
                    <Link href={"/"}>
                        <Image
                            src={darkMode ? darkLogo : lightLogo}
                            width={100}   // tamaño original
                            height={100}   // tamaño original
                            className="w-32 h-auto" // Tailwind: ancho fijo, altura automática
                            alt="Logo"
                        />
                    </Link>
                </div>

                <div className="flex items-center p-3 md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 border-2 rounded border-blue-400 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
                        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? (
                            <i className="fa-solid fa-xmark text-xl"></i>
                        ) : (
                            <i className="fa-solid fa-bars text-xl"></i>
                        )}
                    </button>
                </div>

                {/* Links */}
                <div
                    className={`${isOpen ? "block" : "hidden"
                        } w-full md:flex md:flex-col md:items-center md:w-auto`}
                >

                    <ul className="flex flex-col md:flex-row md:space-x-6 gap-3">
                        {language === "es" ? (
                            <li className="border-b-2 border-transparent hover:border-blue-600 transition duration-200">
                                <Link
                                    href={"/"}
                                    className={sharedClasses}
                                    aria-current="page"
                                >
                                    Últimas noticias
                                </Link>
                            </li>
                        ) : (
                            <li className="border-b-2 border-transparent hover:border-blue-600 transition duration-200">
                                <Link
                                    href={"/"}
                                    className={sharedClasses}
                                    aria-current="page"
                                >
                                    Latest News
                                </Link>
                            </li>
                        )}

                        {uniqueCategories.map(({ id, name }) => (
                            <li
                                key={id}
                                className="border-b-2 gap-3 border-transparent hover:border-blue-600 transition duration-200"
                            >
                                <Link
                                    href={`/category/${name}`}
                                    className={sharedClasses}
                                    aria-label={`Ver artículos sobre ${name}`}
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Botón DarkMode (solo en desktop) */}
                <div className="hidden md:block">
                    <DarkMode />
                </div>


                {/* DarkMode en móvil */}
                {isOpen && (
                    <div className="md:hidden flex justify-end px-6 py-2">
                        <DarkMode />
                    </div>
                )}
            </nav>

            <TradingviewTicker />
        </>
    );
};
