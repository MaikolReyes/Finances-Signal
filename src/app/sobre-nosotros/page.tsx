"use client"
//
import lightLogo from '../../assets/logoFinanceSignal-white.png';
import { DarkModeContext } from "../../context/DarkModeContext";
import darkLogo from '../../assets/logoFinanceSignal.png';
import { useContext } from 'react';
import Image from 'next/image';


export default function About() {

    const { darkMode } = useContext(DarkModeContext);

    return (
        <section className="min-h-screen py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Encabezado */}
                <h1 className="text-4xl font-bold mb-6 text-center">
                    Sobre Nosotros
                </h1>
                <p className="text-lg text-center mb-12">
                    Tu fuente confiable de noticias y análisis financiero.
                </p>

                {/* Contenido principal */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* Imagen o ilustración */}
                    <div>
                        <Image
                            src={darkMode ? lightLogo : darkLogo}
                            alt="Equipo Finance Signal"
                            className="rounded border-4 w-auto"
                        />
                    </div>

                    {/* Texto descriptivo */}
                    <div className="space-y-6">
                        <p className="leading-relaxed">
                            En <strong>Finance Signal</strong> nos dedicamos a proporcionar
                            noticias actualizadas, análisis de mercado y tendencias
                            económicas para ayudar a profesionales, inversionistas y
                            emprendedores a tomar decisiones informadas.
                        </p>
                        <p className="leading-relaxed">
                            Nuestra misión es ofrecer contenido claro, preciso y accesible,
                            respaldado por un equipo de redactores especializados en
                            economía, tecnología y finanzas internacionales.
                        </p>
                        <p className="leading-relaxed">
                            Creemos que la información de calidad es clave para el éxito en
                            los negocios y las inversiones. Por eso, cada artículo está
                            cuidadosamente investigado y pensado para aportar valor real a
                            nuestra audiencia.
                        </p>
                    </div>
                </div>

                {/* Valores */}
                <div className="mt-16">
                    <h2 className="text-2xl font-semibold mb-6 text-center">
                        Nuestros valores
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="text-lg font-semibold mb-2 text-blue-600">
                                Transparencia
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Nos aseguramos de que toda la información sea verificada y
                                presentada de forma clara y objetiva.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="text-lg font-semibold mb-2 text-blue-600">
                                Innovación
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Adoptamos herramientas y métodos modernos para ofrecer un
                                contenido ágil y relevante.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="text-lg font-semibold mb-2 text-blue-600">
                                Compromiso
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Estamos dedicados a brindar un servicio informativo que inspire
                                confianza y credibilidad.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cierre */}
                <div className="mt-16 text-center">
                    <p className="">
                        Finance Signal — Información que impulsa tus decisiones.
                    </p>
                </div>
            </div>
        </section>
    );
};