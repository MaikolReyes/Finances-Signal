// interfaces.ts
export interface Category {
    id: number;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    documentId: string;
    locale: string;
    localizations: {
        id: number;
        name: string;
        slug: string;
        locale: string;
    }[];
}
export interface Author {
    id: number;
    name: string;
}

export interface Article {
    id: string;
    title: string;
    category: Category;
    slug: string;
    resumen: [];
    contenido: [];
    cover: string;
    publishedAt: number;
    locale: string;
    author: Author;
    localizations?: Article[];
}

export interface ArticlesContextProps {
    articles: Article[];
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export interface CategoriesContextProps {
    categories: Category[];
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
}