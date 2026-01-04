export default function PrivacyPolicy() {
    return (
        <section className="min-h-screen px-4 py-16 flex justify-center">
            <div className="w-full max-w-3xl text-gray-800">

                <h1 className="text-3xl font-bold mb-4">
                    Política de Privacidad
                </h1>

                <p className="mb-6 text-sm text-gray-600">
                    Última actualización: <strong>Marzo 2025</strong>
                </p>

                <p className="mb-6 leading-relaxed">
                    En <strong>FinanceSignal</strong> valoramos y respetamos tu privacidad.
                    Esta Política de Privacidad explica cómo recopilamos, utilizamos y
                    protegemos la información personal de los usuarios que visitan
                    nuestro sitio web.
                </p>

                {/* 1 */}
                <h2 className="text-xl font-semibold mt-8 mb-2">
                    1. Información que recopilamos
                </h2>
                <p>Podemos recopilar los siguientes tipos de información:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>
                        <strong>Información personal:</strong> nombre, dirección de correo
                        electrónico u otros datos que nos proporciones voluntariamente a
                        través de formularios de contacto.
                    </li>
                    <li>
                        <strong>Información automática:</strong> datos técnicos como
                        dirección IP, tipo de navegador, páginas visitadas y tiempo de
                        navegación.
                    </li>
                    <li>
                        <strong>Información de terceros:</strong> datos obtenidos a través de
                        herramientas de analítica o servicios publicitarios, conforme a sus
                        propias políticas de privacidad.
                    </li>
                </ul>

                {/* 2 */}
                <h2 className="text-xl font-semibold mt-8 mb-2">
                    2. Uso de la información
                </h2>
                <p>Utilizamos la información recopilada para:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Mejorar la experiencia de navegación y el contenido del sitio.</li>
                    <li>Analizar métricas y tendencias de uso.</li>
                    <li>Responder consultas enviadas por los usuarios.</li>
                    <li>Cumplir con obligaciones legales y de seguridad.</li>
                </ul>

                {/* 3 */}
                <h2 className="text-xl font-semibold mt-8 mb-2">
                    3. Publicidad y servicios de terceros
                </h2>
                <p className="leading-relaxed">
                    FinanceSignal puede mostrar anuncios proporcionados por terceros,
                    incluidos servicios como Google AdSense. Estos proveedores pueden
                    utilizar cookies u otras tecnologías para mostrar anuncios relevantes
                    en función de la navegación del usuario.
                </p>

                {/* 4 */}
                <h2 className="text-xl font-semibold mt-8 mb-2">
                    4. Uso de cookies
                </h2>
                <p className="leading-relaxed">
                    Utilizamos cookies y tecnologías similares para mejorar la experiencia
                    del usuario y analizar el tráfico del sitio. Podés gestionar o
                    desactivar las cookies desde la configuración de tu navegador.
                </p>

                {/* 5 */}
                <h2 className="text-xl font-semibold mt-8 mb-2">
                    5. Seguridad de la información
                </h2>
                <p className="leading-relaxed">
                    Implementamos medidas de seguridad razonables para proteger la
                    información personal. Sin embargo, ninguna transmisión por Internet
                    es completamente segura.
                </p>

                {/* 6 */}
                <h2 className="text-xl font-semibold mt-8 mb-2">
                    6. Derechos del usuario
                </h2>
                <p>Como usuario, tenés derecho a:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Acceder, rectificar o eliminar tus datos personales.</li>
                    <li>Solicitar información sobre el uso de tus datos.</li>
                    <li>Retirar tu consentimiento en cualquier momento.</li>
                </ul>

                <p className="mt-3">
                    Para ejercer estos derechos, podés contactarnos a{" "}
                    <a
                        href="mailto:financessignal@gmail.com"
                        className="text-blue-600 hover:underline"
                    >
                        financessignal@gmail.com
                    </a>
                    .
                </p>

                {/* 7 */}
                <h2 className="text-xl font-semibold mt-8 mb-2">
                    7. Cambios en esta política
                </h2>
                <p className="leading-relaxed">
                    Nos reservamos el derecho de modificar esta Política de Privacidad en
                    cualquier momento. Los cambios serán publicados en esta página.
                </p>

                {/* 8 */}
                <h2 className="text-xl font-semibold mt-8 mb-2">
                    8. Contacto
                </h2>
                <p className="leading-relaxed">
                    Si tenés dudas sobre esta Política de Privacidad, podés escribirnos a{" "}
                    <a
                        href="mailto:financessignal@gmail.com"
                        className="text-blue-600 hover:underline"
                    >
                        financessignal@gmail.com
                    </a>
                    .
                </p>
            </div>
        </section>
    );
}
