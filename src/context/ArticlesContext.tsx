"use client"

import { createContext } from 'react';
import { ArticlesContextProps } from './InterfaceArticle';

export const ArticlesContext = createContext<ArticlesContextProps>({
    articles: [],
    language: 'es',
    setLanguage: () => { }
});
