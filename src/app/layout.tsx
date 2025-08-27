// app/layout.tsx
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DarkModeProvider } from "@/context/DarkModeProvider";
import { CategoriesProvider } from "@/context/CategoriesProvider";
import { ArticlesProvider } from "@/context/ArticlesProvider";
import { GoogleAnalytics } from "@/components/GoogleAnalitycs";
import Script from "next/script";
import "./globals.css";


export const metadata = {
  title: "FinanceSignal",
  description: "Mantente informado con las últimas noticias de finanzas y economía. Descubre análisis de mercado, tendencias económicas y consejos financieros en un solo lugar. ¡Tu fuente confiable para tomar decisiones inteligentes!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Pre-conexiones para optimizar la carga de recursos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Fuentes externas */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />

        {/* Bootstrap CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />

        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-8500553745947588" />
      </head>

      <body>
        {/* Google Analytics */}
        <GoogleAnalytics />

        {/* FontAwesome */}
        <Script
          src="https://kit.fontawesome.com/120dea019e.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        {/* AdSense Script */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8500553745947588"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        {/* Bootstrap JS */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        <DarkModeProvider>
          <CategoriesProvider>
            <ArticlesProvider>
              <Navbar />
              {children}
              <Footer />
            </ArticlesProvider>
          </CategoriesProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}