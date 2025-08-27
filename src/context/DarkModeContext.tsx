"use client"
//
import { createContext } from "react";

type DarkModeContextProps = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeContextProps>({
    darkMode: false,
    toggleDarkMode: () => { },
});


