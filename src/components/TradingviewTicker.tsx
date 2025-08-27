// TradingViewWidget.jsx
import { useEffect, useRef, memo, useContext } from 'react';
import { DarkModeContext } from '../context';

function TradingViewWidget() {
    const { darkMode } = useContext(DarkModeContext);
    const container = useRef<HTMLDivElement>(null);
    const scriptLoaded = useRef(false);

    useEffect(() => {
        if (!container.current) return;

        const currentContainer = container.current;

        // Limpiar cualquier contenido previo
        currentContainer.innerHTML = '';
        scriptLoaded.current = false;

        // Crear un ID único para este widget
        const widgetId = `tradingview_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Crear la estructura HTML directamente
        currentContainer.innerHTML = `
            <div class="tradingview-widget-container" style="height:100%;width:100%">
                <div class="tradingview-widget-container__widget" id="${widgetId}"></div>
            </div>
        `;

        // Crear la configuración
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

        // Función para cargar el script de manera más segura
        const initializeWidget = () => {
            if (scriptLoaded.current || !currentContainer) return;

            try {
                // Verificar que el contenedor del widget exista
                const widgetElement = currentContainer.querySelector(`#${widgetId}`);
                if (!widgetElement) {
                    console.warn('Widget container not found');
                    return;
                }

                // Limpiar cualquier script anterior
                const existingScripts = currentContainer.querySelectorAll('script[src*="tradingview"]');
                existingScripts.forEach(script => script.remove());

                // Crear el script
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
                script.async = true;
                script.innerHTML = JSON.stringify(widgetConfig);

                // Añadir event listeners para debugging
                script.onload = () => {
                    scriptLoaded.current = true;
                };

                script.onerror = (error) => {
                    console.error('Error loading TradingView script:', error);
                };

                // Insertar el script en el contenedor del widget
                const widgetContainer = currentContainer.querySelector('.tradingview-widget-container');
                if (widgetContainer) {
                    widgetContainer.appendChild(script);
                }

            } catch (error) {
                console.error('Error initializing TradingView widget:', error);
            }
        };

        // Usar múltiples estrategias de timing para mayor robustez
        const timeouts: NodeJS.Timeout[] = [];

        // Primera tentativa inmediata
        timeouts.push(setTimeout(initializeWidget, 0));

        // Segunda tentativa con un pequeño delay
        timeouts.push(setTimeout(initializeWidget, 100));

        // Tercera tentativa con más delay por si acaso
        timeouts.push(setTimeout(initializeWidget, 500));

        // Cleanup function
        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout));
            scriptLoaded.current = false;

            if (currentContainer) {
                // Limpiar iframes y scripts
                const iframes = currentContainer.querySelectorAll('iframe');
                const scripts = currentContainer.querySelectorAll('script');

                iframes.forEach(iframe => iframe.remove());
                scripts.forEach(script => script.remove());

                currentContainer.innerHTML = '';
            }
        };

    }, [darkMode]);

    return (
        <div
            className="border-2"
            ref={container}
            style={{
                width: '100%',
                minHeight: '62px',
                overflow: 'hidden'
            }}
        />
    );
}

export default memo(TradingViewWidget);