"use client"
//
import { createContext } from 'react';
import { CategoriesContextProps } from './InterfaceArticle';

export const CategoriesContext = createContext<CategoriesContextProps>({
    categories: [],
    language: 'es',
    setLanguage: () => { }
});
