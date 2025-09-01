"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
        dataLayer: unknown[];
    }
}

export function GoogleAnalytics() {
    useEffect(() => {
        // Inicializar dataLayer si no existe
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
        }
    }, []);

    const handleGtagLoad = () => {
        if (typeof window !== 'undefined') {
            // Función gtag usando parámetros rest
            window.gtag = function (...args: unknown[]) {
                window.dataLayer.push(args);
            };

            // Configuración inicial
            window.gtag('js', new Date());

            // Google Analytics
            window.gtag('config', 'G-8JPR1MN0EH');

            // Google Ads
            window.gtag('config', 'AW-16848723907');

            // Event snippet para conversión de page view
            window.gtag('event', 'conversion', {
                'send_to': 'AW-16848723907/pJvXCO7b15saEMO_jOI-',
                'value': 1.0,
                'currency': 'ARS'
            });
        }
    };

    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-8JPR1MN0EH"
                strategy="afterInteractive"
                onLoad={handleGtagLoad}
            />
        </>
    );
}