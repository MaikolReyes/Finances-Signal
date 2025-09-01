// app/layout.tsx
import { DarkModeProvider, ArticlesProvider, CategoriesProvider } from "@/context";
import { GoogleAnalytics, Navbar, CookieConsent, Footer } from "@/components";
import { Lato, Roboto } from 'next/font/google';
import Script from "next/script";
import "./globals.css";

// Configuración optimizada de fuentes
const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
  preload: true,
});

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  preload: true,
});

// app/layout.tsx - Cambia tu metadata por esto:
export const metadata = {
  title: {
    template: '%s | FinanceSignal',
    default: 'FinanceSignal | Ultimas Noticias',
  },
  description: "Mantente informado con las últimas noticias de finanzas y economía. Descubre análisis de mercado, tendencias económicas y consejos financieros en un solo lugar. ¡Tu fuente confiable para tomar decisiones inteligentes!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${lato.variable} ${roboto.variable}`}>
      <head>

        {/* DNS prefetch para mejorar conexiones */}
        <link rel="dns-prefetch" href="//d1gbtbhodg3cj1.cloudfront.net" />
        <link rel="preconnect" href="https://d1gbtbhodg3cj1.cloudfront.net" crossOrigin="" />

        {/* AdSense - Movido a afterInteractive */}
        <meta name="google-adsense-account" content="ca-pub-8500553745947588" />

      </head>

      <body className="antialiased">
        <GoogleAnalytics />

        {/* Scripts no críticos después del contenido */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8500553745947588"
          crossOrigin="anonymous"
          strategy="afterInteractive" // 🔥 Cambio crítico
        />

        <Script
          src="https://kit.fontawesome.com/120dea019e.js"
          crossOrigin="anonymous"
          strategy="lazyOnload" // ✅ Correcto
        />

        <DarkModeProvider>
          <CategoriesProvider>
            <ArticlesProvider>
              <Navbar />
              {children}
              <CookieConsent />
              <Footer />
            </ArticlesProvider>
          </CategoriesProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}