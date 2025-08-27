"use client"

import { useState, useRef, useEffect, useContext } from 'react';
import { DarkModeContext } from "../context";
import { ArticlesContext } from '../context/ArticlesContext';
import { CategoriesContext } from '../context/CategoriesContext';
import { useLanguageNavigation } from '../hooks/useLanguageNavigation'; // Importar el hook

export const ButtonLanguages = () => {

    const { darkMode } = useContext(DarkModeContext);
    // Contexts
    const { language: articlesLanguage } = useContext(ArticlesContext);
    const { language: categoriesLanguage } = useContext(CategoriesContext);

    // Hook personalizado
    const { changeLanguage } = useLanguageNavigation();

    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Usar el idioma de cualquiera de los contextos (deberían estar sincronizados)
    const currentLanguage = articlesLanguage || categoriesLanguage;

    const toggleDropdown = () => setOpen(prev => !prev);

    const handleLanguageChange = (newLanguage: string) => {
        changeLanguage(newLanguage);
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={ref}>
            <button
                onClick={toggleDropdown}
                className={`btn text-black px-4 py-2 rounded flex items-center ${darkMode ? 'text-white' : 'text-black'}`}
            >
                <i className="fa-solid fa-earth-americas mr-2"></i>
                {currentLanguage === 'es' ? 'Español' : 'English'}
                <i className="fa-solid fa-caret-down ml-2"></i>
            </button>

            {open && (
                <ul className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                    <li>
                        <button
                            className={`block w-full text-left px-4 py-2 ${darkMode ? 'hover:bg-gray-100 text-black' : 'hover:bg-gray-200'}`}
                            onClick={() => handleLanguageChange('es')}
                        >
                            Español
                        </button>
                    </li>
                    <li>
                        <button
                            className={`block w-full text-left px-4 py-2 ${darkMode ? 'hover:bg-gray-100 text-black' : 'hover:bg-gray-200'}`}
                            onClick={() => handleLanguageChange('en')}
                        >
                            English
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};