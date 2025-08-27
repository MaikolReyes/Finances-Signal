"use client"
//
import { ReactNode, useEffect, useState } from 'react';
import { getCategories } from '../lib/getCategories';
import { CategoriesContext, Category } from '../context';

type CategoriesProviderProps = {
    children: ReactNode;
};

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [language, setLanguage] = useState<string>('es');

    useEffect(() => {
        getCategories()
            .then(data => {
                setCategories([...data]); // Asegurar que React detecte un nuevo array
            })
            .catch(err => console.error('Error fetching articles:', err));
    }, [language]);

    return (
        <CategoriesContext.Provider value={{ categories, language, setLanguage }}>
            {children}
        </CategoriesContext.Provider>
    );
};
