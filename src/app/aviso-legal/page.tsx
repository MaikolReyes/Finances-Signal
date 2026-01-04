export default function LegalNotice() {
    return (
        <section className="min-h-screen px-4 py-16 flex justify-center">
            <div className="w-full max-w-3xl text-gray-800">

                <h1 className="text-3xl font-bold mb-6">
                    Aviso Legal
                </h1>

                <p className="mb-6 leading-relaxed">
                    En cumplimiento de la legislación vigente, se informa a los usuarios
                    que el acceso y uso del sitio web <strong>FinanceSignal</strong> implica
                    la aceptación de las presentes condiciones.
                </p>

                {/* Propiedad */}
                <h2 className="text-xl font-semibold mt-8 mb-2">
                    1. Titularidad del sitio web
                </h2>
                <p className="leading-relaxed">
                    El sitio web <strong>FinanceSignal</strong> es un proyecto digital
                    independiente con fines informativos y editoriales, operado desde
                    la República Argentina.
                </p>

                {/* Responsabilidad */}
                <h2 className="text-xl font-semibold mt-8 mb-2">
                    2. Responsabilidad del contenido
                </h2>
                <p className="leading-relaxed">
                    Los contenidos publicados en este sitio tienen carácter meramente
                    informativo y educativo. En ningún caso constituyen asesoramiento
                    financiero, legal o impositivo. FinanceSignal no se responsabiliza
                    por el uso que los usuarios puedan hacer de la información aquí
                    publicada.
                </p>

                {/* Propiedad intelectual */}
                <h2 className="text-xl font-semibold mt-8 mb-2">
                    3. Propiedad intelectual
                </h2>
                <p className="leading-relaxed">
                    Los derechos de propiedad intelectual sobre los contenidos de este
                    sitio web, incluyendo textos, imágenes, gráficos y logotipos, son
                    titularidad de FinanceSignal o de terceros que han autorizado su uso.
                    Queda prohibida su reproducción, distribución o modificación sin
                    autorización expresa.
                </p>

                {/* Modificaciones */}
                <h2 className="text-xl font-semibold mt-8 mb-2">
                    4. Modificación de las condiciones
                </h2>
                <p className="leading-relaxed">
                    FinanceSignal se reserva el derecho de modificar, actualizar o
                    eliminar en cualquier momento y sin previo aviso los contenidos
                    y condiciones del sitio web.
                </p>

                {/* Legislación */}
                <h2 className="text-xl font-semibold mt-8 mb-2">
                    5. Legislación aplicable
                </h2>
                <p className="leading-relaxed">
                    El presente Aviso Legal se rige por las leyes vigentes en la
                    República Argentina. Cualquier controversia será sometida a los
                    tribunales competentes.
                </p>

                {/* Contacto */}
                <h2 className="text-xl font-semibold mt-8 mb-2">
                    6. Contacto
                </h2>
                <p className="leading-relaxed">
                    Para consultas relacionadas con este Aviso Legal, podés comunicarte
                    a través del correo electrónico{" "}
                    <a
                        href="mailto:financessignal@gmail.com"
                        className="text-blue-600 hover:underline"
                    >
                        financessignal@gmail.com
                    </a>.
                </p>

            </div>
        </section>
    );
}
