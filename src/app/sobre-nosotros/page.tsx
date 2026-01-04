export default function AboutUs() {
    return (
        <section className="min-h-screen px-4 py-16 flex justify-center">
            <div className="w-full max-w-3xl text-gray-800">

                {/* Header */}
                <header className="mb-10 text-center">
                    <h1 className="text-3xl font-bold mb-3">
                        Sobre FinanceSignal
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Información clara y análisis editorial sobre economía y finanzas.
                    </p>
                </header>

                {/* Qué es */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                        ¿Qué es FinanceSignal?
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        FinanceSignal es un medio digital independiente enfocado en economía,
                        finanzas personales y análisis del costo de vida en Argentina.
                        Nuestro objetivo es brindar contenido informativo y educativo que
                        ayude a comprender el contexto económico actual.
                    </p>
                </section>

                {/* Enfoque editorial */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                        Nuestro enfoque editorial
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Los contenidos publicados en FinanceSignal se basan en información
                        pública, fuentes oficiales y análisis editorial propio. No ofrecemos
                        recomendaciones de inversión ni asesoramiento financiero
                        personalizado.
                    </p>
                </section>

                {/* Autor */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                        Sobre el autor
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Maikol Reyes es creador de FinanceSignal y analista editorial
                        enfocado en economía y finanzas personales. Su trabajo se centra en
                        interpretar datos públicos, medidas económicas y tendencias
                        relevantes para el público general y profesional.
                    </p>
                </section>

                {/* Transparencia */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                        Transparencia y responsabilidad
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        El contenido de este sitio tiene fines exclusivamente informativos y
                        educativos. No constituye asesoramiento financiero, legal ni
                        impositivo. Las decisiones económicas deben tomarse con información
                        actualizada y, de ser necesario, con el asesoramiento de un
                        profesional matriculado.
                    </p>
                </section>

                {/* Contacto */}
                <section className="mt-12 border-t pt-6 text-sm text-gray-600">
                    <p>
                        Para consultas generales o contacto editorial, podés escribirnos a{" "}
                        <a
                            href="mailto:contacto@financessignal.com"
                            className="text-blue-600 hover:underline"
                        >
                            financessignal@gmail.com
                        </a>
                    </p>
                </section>

            </div>
        </section>
    );
}
