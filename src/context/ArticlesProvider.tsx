"use client"
//
import { useEffect, useState, ReactNode } from "react";
import { getArticles } from "../lib";
import { ArticlesContext, Article } from "../context";

type ArticlesProviderProps = {
    children: ReactNode;
};

export const ArticlesProvider = ({ children }: ArticlesProviderProps) => {

    const [articles, setArticles] = useState<Article[]>([]);
    const [language, setLanguage] = useState<string>('es');

    useEffect(() => {

        getArticles(language)
            .then(data => {
                setArticles([...data]); // Asegurar que React detecte un nuevo array
            })
            .catch(err => console.error('Error fetching articles:', err));
    }, [language]);


    return (
        <ArticlesContext.Provider value={{ articles, language, setLanguage }}>
            {children}
        </ArticlesContext.Provider>
    );
}
