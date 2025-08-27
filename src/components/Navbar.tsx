"use client"

import { CategoriesContext, DarkModeContext } from "../context";
import { useContext, useMemo } from "react";
import TradingviewTicker from "./TradingviewTicker";
import { DarkMode } from "../controls";
import lightLogo from '../assets/logoFinanceSignal.png';
import darkLogo from '../assets/logoFinanceSignal-white.png';
import Link from "next/link";
import Image from "next/image";


export const Navbar = () => {

    const { darkMode } = useContext(DarkModeContext);

    const sharedClasses = `nav-link font-title bg-blue hover:!text-gray-700 text-sm tablet:text-2xl ${darkMode ? 'text-white hover:!text-gray-200' : 'text-black'}`;

    const { categories, language } = useContext(CategoriesContext);

    // Filtrar categorías únicas según el idioma
    const uniqueCategories = useMemo(() => {
        return categories
            .flatMap(category => {
                // Si el idioma actual coincide con el locale de la categoría, usar la categoría directamente
                if (category.locale === language) {
                    return [category];
                }

                // Si no coincide, buscar en las localizaciones
                const localization = category.localizations?.find(loc => loc.locale === language);
                return localization ? [localization] : [];
            })
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [categories, language]);

    return (
        <>

            <nav className="navbar navbar-expand-lg shadow-md z-10 flex justify-around">

                <div className="flex items-start ml-5 bg-blue">
                    <Link href={'/'}>
                        <Image
                            src={darkMode ? darkLogo : lightLogo}
                            alt="Logo de la empresa"
                            className="max-h-8 w-auto"
                            priority
                            width={120}
                            height={32}
                        />
                    </Link>
                </div>

                <div className="container-fluid">

                    <button className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">

                        <ul className="navbar-nav" >


                            {/* Aquí se debe agregar un condicional para mostrar el texto en español o en inglés */}
                            {language === 'es' ?
                                <li className="nav-item border-b-2 border-transparent hover:border-blue-600 transition duration-200">
                                    <Link href={'/'} className={`${sharedClasses} `}
                                        aria-current="page">
                                        Últimas noticias
                                    </Link>
                                </li> :
                                <li className="nav-item border-b-2 border-transparent hover:border-blue-600 transition duration-200">
                                    <Link href={'/'} className={`${sharedClasses}`}
                                        aria-current="page">
                                        Latest News
                                    </Link>
                                </li>
                            }


                            {uniqueCategories.map(({ id, name }) => (
                                <li className="nav-item border-b-2 border-transparent hover:border-blue-600 transition duration-200" key={id}>
                                    <Link
                                        className={`${sharedClasses} `}
                                        href={`/category/${name}`}
                                        aria-label={`Ver artículos sobre ${name}`}
                                    >
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* <ButtonLanguages /> */}
                    <DarkMode />
                </div>
            </nav>

            <TradingviewTicker />
        </>
    )
}