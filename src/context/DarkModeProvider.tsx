"use client"
//
import { useEffect, useState, ReactNode } from "react";
import { DarkModeContext } from "./DarkModeContext";

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
    // Inicializar con false para evitar problemas de SSR
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [mounted, setMounted] = useState(false);

    // Cargar el estado desde localStorage solo en el cliente
    useEffect(() => {
        setMounted(true);

        // Verificar que estamos en el cliente
        if (typeof window !== 'undefined') {
            const savedDarkMode = localStorage.getItem("darkMode");
            if (savedDarkMode) {
                setDarkMode(JSON.parse(savedDarkMode));
            }
        }
    }, []);

    // Aplicar cambios al DOM y guardar en localStorage
    useEffect(() => {
        if (mounted && typeof window !== 'undefined') {
            document.body.classList.toggle("dark-mode", darkMode);
            localStorage.setItem("darkMode", JSON.stringify(darkMode));
        }
    }, [darkMode, mounted]);

    const toggleDarkMode = () => setDarkMode(prev => !prev);

    // Prevenir hydration mismatch mostrando un placeholder hasta que se monte
    if (!mounted) {
        return <div style={{ visibility: 'hidden' }}>{children}</div>;
    }

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};