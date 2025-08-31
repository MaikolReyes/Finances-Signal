"use client"
// TradingViewWidget.jsx
import { useEffect, useRef, memo, useContext } from 'react';
import { DarkModeContext } from '../context';

export function TradingViewWidget() {
    const { darkMode } = useContext(DarkModeContext);
    const container = useRef<HTMLDivElement>(null);
    const widgetInitialized = useRef(false);

    useEffect(() => {
        if (!container.current) return;

        const currentContainer = container.current;

        // Prevenir múltiples inicializaciones
        if (widgetInitialized.current) return;

        // Limpiar cualquier contenido previo
        currentContainer.innerHTML = '';

        // Crear un ID único más simple y confiable
        const widgetId = `tradingview-widget-${Date.now()}`;

        // Crear la estructura HTML de manera más robusta
        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'tradingview-widget-container';
        widgetContainer.style.cssText = 'height:100%;width:100%';

        const widgetInner = document.createElement('div');
        widgetInner.className = 'tradingview-widget-container__widget';
        widgetInner.id = widgetId;

        widgetContainer.appendChild(widgetInner);
        currentContainer.appendChild(widgetContainer);

        // Configuración del widget
        const widgetConfig = {
            "symbols": [
                { "description": "Apple", "proName": "NASDAQ:AAPL" },
                { "description": "Google", "proName": "NASDAQ:GOOGL" },
                { "description": "Microsoft", "proName": "NASDAQ:MSFT" },
                { "description": "Meta", "proName": "NASDAQ:META" },
                { "description": "Amazon", "proName": "NASDAQ:AMZN" },
                { "description": "Mercadolibre", "proName": "NASDAQ:MELI" },
                { "description": "Tesla", "proName": "NASDAQ:TSLA" },
                { "description": "Nvidia", "proName": "NASDAQ:NVDA" },
                { "description": "AMD", "proName": "NASDAQ:AMD" },
                { "description": "Intel", "proName": "NASDAQ:INTC" },
                { "description": "Netflix", "proName": "NASDAQ:NFLX" },
                { "description": "S&P 500", "proName": "SPY" },
                { "description": "Berkshire Hathaway", "proName": "NYSE:BRK.B" },
                { "description": "Bitcoin", "proName": "BITSTAMP:BTCUSD" },
                { "description": "Ethereum", "proName": "BITSTAMP:ETHUSD" }
            ],
            "showSymbolLogo": true,
            "colorTheme": darkMode ? "dark" : "light",
            "isTransparent": true,
            "displayMode": "compact",
            "locale": "en",
            "container_id": widgetId
        };

        // Función para inicializar el widget con verificaciones más robustas
        const initializeWidget = () => {
            try {
                // Verificar que todos los elementos existan
                if (!currentContainer || !currentContainer.isConnected) {
                    console.warn('Container not available or not connected to DOM');
                    return;
                }

                const targetElement = document.getElementById(widgetId);
                if (!targetElement) {
                    console.warn('Target element not found:', widgetId);
                    return;
                }

                // Verificar que no haya ya un script cargándose
                const existingScript = currentContainer.querySelector('script[src*="ticker-tape"]');
                if (existingScript) {
                    console.log('Script already exists, skipping initialization');
                    return;
                }

                // Crear el script
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
                script.async = true;

                // Event listeners para monitoreo
                script.onload = () => {
                    widgetInitialized.current = true;
                };

                script.onerror = (error) => {
                    console.error('Error loading TradingView script:', error);
                    widgetInitialized.current = false;
                };

                // Agregar la configuración como contenido del script
                script.textContent = JSON.stringify(widgetConfig);

                // Agregar el script al final del contenedor principal
                widgetContainer.appendChild(script);


            } catch (error) {
                console.error('Error during widget initialization:', error);
                widgetInitialized.current = false;
            }
        };

        // Esperar a que el DOM esté completamente listo
        const initTimer = setTimeout(() => {
            if (document.readyState === 'complete') {
                initializeWidget();
            } else {
                window.addEventListener('load', initializeWidget, { once: true });
            }
        }, 100);

        // Cleanup function
        return () => {
            clearTimeout(initTimer);
            widgetInitialized.current = false;

            if (currentContainer) {
                // Cleanup más agresivo
                const iframes = currentContainer.querySelectorAll('iframe');
                const scripts = currentContainer.querySelectorAll('script');
                const widgets = currentContainer.querySelectorAll('[id*="tradingview"]');

                iframes.forEach(iframe => {
                    try {
                        iframe.remove();
                    } catch (e) {
                        console.warn('Error removing iframe:', e);
                    }
                });

                scripts.forEach(script => {
                    try {
                        script.remove();
                    } catch (e) {
                        console.warn('Error removing script:', e);
                    }
                });

                widgets.forEach(widget => {
                    try {
                        widget.remove();
                    } catch (e) {
                        console.warn('Error removing widget:', e);
                    }
                });

                // Limpiar el contenedor
                try {
                    currentContainer.innerHTML = '';
                } catch (e) {
                    console.warn('Error clearing container:', e);
                }
            }
        };

    }, [darkMode]);

    return (
        <div
            className="border-2 border-gray-300"
            ref={container}
            style={{
                width: '100%',
                minHeight: '62px',
                overflow: 'hidden',
                position: 'relative'
            }}
        />
    );
}

export default memo(TradingViewWidget);