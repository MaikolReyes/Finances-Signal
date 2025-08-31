"use client"
// TradingViewWidget.jsx
import { useEffect, useRef, memo } from 'react';

type TradingViewWidgetProps = {
    symbol: string; // Ejemplo: "NASDAQ:AAPL", "BINANCE:BTCUSDT"
};

export function TradingViewGraphics({ symbol }: TradingViewWidgetProps) {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!container.current) return;

        container.current.innerHTML = ""; // 🧹 Limpia el contenedor

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
            "allow_symbol_change": true,
            "calendar": false,
            "details": false,
            "hide_side_toolbar": true,
            "hide_top_toolbar": false,
            "hide_legend": false,
            "hide_volume": false,
            "hotlist": false,
            "interval": "W",
            "locale": "es",
            "save_image": true,
            "style": "1",
            "symbol": "${symbol}",
            "theme": "dark",
            "timezone": "Etc/UTC",
            "backgroundColor": "#0F0F0F",
            "gridColor": "rgba(242, 242, 242, 0.06)",
            "watchlist": [],
            "withdateranges": false,
            "compareSymbols": [],
            "studies": [],
            "autosize": true
        }`;

        container.current.appendChild(script);
    }, [symbol]);

    return (
        <div className="tradingview-widget-container" ref={container} style={{
            aspectRatio: "16 / 9",
            width: "100%",
            maxWidth: "700px",
            margin: "0 auto"
        }}>
            <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}></div>
            <div className="tradingview-widget-copyright">
                <a href={`https://www.tradingview.com/symbols/${symbol.replace(":", "-")}/`} rel="noopener nofollow" target="_blank">
                    <span className="blue-text">{symbol} chart by TradingView</span>
                </a>
            </div>
        </div>
    );
}

export default memo(TradingViewGraphics);
