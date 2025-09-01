"use client";

import Script from "next/script";

export function GoogleAnalytics() {
    return (
        <>
            {/* Script externo de Google Analytics */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-8JPR1MN0EH"
                strategy="afterInteractive"
            />

            {/* Inicialización de GA y Google Ads */}
            <Script id="ga-init" strategy="afterInteractive">
                {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-8JPR1MN0EH');

            gtag('config', 'AW-16848723907');

            gtag('event', 'conversion', {
            'send_to': 'AW-16848723907/pJvXCO7b15saEMO_jOI-',
            'value': 1.0,
            'currency': 'ARS'
            });
        `}
            </Script>
        </>
    );
}
