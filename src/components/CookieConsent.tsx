"use client"
//
import { useState, useEffect, useCallback } from "react";

// No redeclaramos Window para evitar conflictos
// Usamos los tipos existentes de gtag si están disponibles

const GTAG_ID = 'G-8JPR1MN0EH';
const CONVERSION_ID = 'AW-16848723907';
const CONVERSION_LABEL = 'AW-16848723907/pJvXCO7b15saEMO_jOI-';
const COOKIE_NAME = 'cookieConsent';
const COOKIE_DURATION_DAYS = 180;
const RENEWAL_CHECK_HOURS = 24; // Verificar renovación cada 24 horas

// Función helper para verificar si gtag está disponible
const isGtagAvailable = (): boolean => {
    return typeof window !== 'undefined' &&
        typeof window.gtag === 'function';
};

// Función helper para verificar si dataLayer está disponible
const isDataLayerAvailable = (): boolean => {
    return typeof window !== 'undefined' &&
        Array.isArray(window.dataLayer);
};

export const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRenewal, setIsRenewal] = useState(false); // Para distinguir renovación vs primera vez

    // 🚨 SOLO PARA DESARROLLO - Eliminar en producción
    const resetCookieConsent = useCallback((): void => {
        if (typeof document !== 'undefined') {
            document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            setShowBanner(true);
            console.log('Cookie consent reset - banner should appear');
        }
    }, []);

    // Utilidades para cookies mejoradas con timestamp
    const getCookieWithTimestamp = useCallback((name: string): { value: string; timestamp: number } | undefined => {
        if (typeof document === 'undefined') return undefined;

        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        const cookieValue = parts.length === 2 ? parts.pop()?.split(";").shift() : undefined;

        if (!cookieValue) return undefined;

        try {
            const parsed = JSON.parse(decodeURIComponent(cookieValue));
            return parsed;
        } catch {
            // Cookie antigua sin timestamp, asumir que necesita renovación
            return { value: cookieValue, timestamp: 0 };
        }
    }, []);

    const getCookie = useCallback((name: string): string | undefined => {
        const result = getCookieWithTimestamp(name);
        return result?.value;
    }, [getCookieWithTimestamp]);

    const setCookieWithTimestamp = useCallback((name: string, value: string, days: number): void => {
        if (typeof document === 'undefined') return;

        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

        const cookieData = {
            value: value,
            timestamp: Date.now()
        };

        document.cookie = `${name}=${encodeURIComponent(JSON.stringify(cookieData))}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
    }, []);

    const setCookie = useCallback((name: string, value: string, days: number): void => {
        setCookieWithTimestamp(name, value, days);
    }, [setCookieWithTimestamp]);

    // Función para verificar si necesita renovación
    const needsRenewal = useCallback((name: string): boolean => {
        const cookieData = getCookieWithTimestamp(name);

        if (!cookieData) return false; // No existe la cookie
        if (cookieData.timestamp === 0) return true; // Cookie antigua sin timestamp

        const hoursSinceConsent = (Date.now() - cookieData.timestamp) / (1000 * 60 * 60);
        return hoursSinceConsent >= RENEWAL_CHECK_HOURS;
    }, [getCookieWithTimestamp]);

    // Función para configurar consentimiento
    const updateConsent = useCallback((granted: boolean): void => {
        if (!isDataLayerAvailable()) return;

        const status = granted ? 'granted' : 'denied';

        // Usar dataLayer directamente para evitar conflictos de tipos
        window.dataLayer.push(['consent', 'update', {
            'analytics_storage': status,
            'ad_storage': status,
            'functionality_storage': status,
            'personalization_storage': status
        }]);
    }, []);

    // Función para configurar Google Analytics
    const configureAnalytics = useCallback((): void => {
        if (!isDataLayerAvailable()) return;

        // Usar dataLayer directamente para evitar conflictos de tipos con gtag
        window.dataLayer.push(['js', new Date()]);

        window.dataLayer.push(['config', GTAG_ID, {
            anonymize_ip: true,
            cookie_expires: COOKIE_DURATION_DAYS * 24 * 60 * 60
        }]);

        window.dataLayer.push(['config', CONVERSION_ID]);

        window.dataLayer.push(['event', 'conversion', {
            'send_to': CONVERSION_LABEL,
            'value': 1.0,
            'currency': 'ARS'
        }]);
    }, []);

    // Función para cargar scripts de terceros
    const loadThirdPartyScripts = useCallback((): Promise<void> => {
        return new Promise((resolve) => {
            // Verificar si ya está cargado
            if (isDataLayerAvailable()) {
                updateConsent(true);
                configureAnalytics();
                resolve();
                return;
            }

            const script = document.createElement("script");
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`;
            script.async = true;

            script.onload = () => {
                if (typeof window === 'undefined') {
                    resolve();
                    return;
                }

                // Inicializar dataLayer si no existe
                if (!isDataLayerAvailable()) {
                    // Usar Object.assign para evitar problemas de tipos
                    Object.assign(window, { dataLayer: [] });
                }

                // Inicializar gtag si no existe
                if (!isGtagAvailable()) {
                    // Usar Object.assign para evitar conflictos de tipos
                    Object.assign(window, {
                        gtag: function () {
                            if (isDataLayerAvailable()) {
                                // eslint-disable-next-line prefer-rest-params
                                window.dataLayer.push(Array.prototype.slice.call(arguments));
                            }
                        }
                    });
                }

                // Configurar analytics
                updateConsent(true);
                configureAnalytics();

                // Disparar evento personalizado
                window.dispatchEvent(new CustomEvent('cookiesAccepted'));

                resolve();
            };

            script.onerror = () => {
                console.error('Error loading Google Analytics script');
                resolve();
            };

            if (document.head) {
                document.head.appendChild(script);
            }
        });
    }, [updateConsent, configureAnalytics]);

    // Función para denegar cookies
    const denyCookies = useCallback((): void => {
        setCookie(COOKIE_NAME, "denied", COOKIE_DURATION_DAYS);
        setShowBanner(false);

        // Actualizar consentimiento si gtag está disponible
        updateConsent(false);

        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('cookiesDenied'));
        }
    }, [setCookie, updateConsent]);

    // Función para aceptar cookies
    const acceptCookies = useCallback(async (): Promise<void> => {
        console.log('🍪 Accepting cookies...');
        setIsLoading(true);
        setCookie(COOKIE_NAME, "accepted", COOKIE_DURATION_DAYS);
        setShowBanner(false);

        try {
            await loadThirdPartyScripts();
            console.log('✅ Third-party scripts loaded successfully');
            console.log('📊 DataLayer:', window.dataLayer);
        } catch (error) {
            console.error('❌ Error loading third-party scripts:', error);
        } finally {
            setIsLoading(false);
        }
    }, [setCookie, loadThirdPartyScripts]);

    // Effect para verificar consentimiento existente y renovación
    useEffect(() => {
        const consentStatus = getCookie(COOKIE_NAME);
        const requiresRenewal = needsRenewal(COOKIE_NAME);

        if (!consentStatus) {
            // Primera vez - mostrar banner
            setIsRenewal(false);
            setShowBanner(true);
        } else if (requiresRenewal) {
            // Necesita renovación - mostrar banner con mensaje diferente
            setIsRenewal(true);
            setShowBanner(true);
            console.log('🔄 Cookie consent needs renewal after 24 hours');
        } else if (consentStatus === "accepted") {
            // Todo OK - cargar scripts
            loadThirdPartyScripts().catch(console.error);
        }

        // 🚨 SOLO PARA DESARROLLO - Agregar función global para testing
        if (typeof window !== 'undefined') {
            (window as unknown as { resetCookies?: () => void }).resetCookies = resetCookieConsent;

            // Función adicional para simular renovación
            (window as unknown as { simulateRenewal?: () => void }).simulateRenewal = () => {
                // Simular cookie antigua (más de 24 horas)
                const oldTimestamp = Date.now() - (25 * 60 * 60 * 1000); // 25 horas atrás
                const cookieData = { value: "accepted", timestamp: oldTimestamp };
                document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(cookieData))}; path=/; Secure; SameSite=Strict`;
                window.location.reload();
            };
        }
    }, [getCookie, needsRenewal, loadThirdPartyScripts, resetCookieConsent]);

    if (!showBanner) return null;

    return (
        <div
            className="fixed inset-x-0 bottom-0 z-50 bg-gray-900 text-white shadow-2xl border-t border-gray-700"
            role="dialog"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-description"
        >
            <div className="max-w-7xl mx-auto p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                        <h3 id="cookie-consent-title" className="font-semibold text-lg mb-2">
                            {isRenewal ? 'Renovar Preferencias de Cookies' : 'Preferencias de Cookies'}
                        </h3>
                        <p id="cookie-consent-description" className="text-sm text-gray-300 leading-relaxed">
                            {isRenewal
                                ? 'Han pasado 24 horas desde tu último consentimiento. Por favor, confirma nuevamente tus preferencias de cookies para continuar con la mejor experiencia.'
                                : 'Utilizamos cookies esenciales para el funcionamiento del sitio y cookies de análisis para mejorar tu experiencia. Puedes gestionar tus preferencias en cualquier momento.'
                            }
                        </p>
                        <a
                            href="/politica-de-privacidad"
                            className="text-blue-400 hover:text-blue-300 underline text-sm mt-2 inline-block transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ver Política de Privacidad
                        </a>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
                        <button
                            onClick={denyCookies}
                            className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors text-sm font-medium"
                            type="button"
                        >
                            Rechazar
                        </button>
                        <button
                            onClick={acceptCookies}
                            disabled={isLoading}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
                            type="button"
                        >
                            {isLoading && (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            )}
                            {isRenewal ? 'Confirmar Renovación' : 'Aceptar Todas'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};