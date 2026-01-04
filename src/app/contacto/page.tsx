"use client";

import { useState } from "react";

export default function Contact() {
    const [sent, setSent] = useState(false);

    return (
        <section className="min-h-screen flex flex-col items-center justify-start px-4 py-16">

            {/* Header */}
            <div className="text-center max-w-xl mb-10">
                <h1 className="text-3xl font-bold text-gray-900">
                    Contacto
                </h1>
                <p className="mt-3 text-gray-600">
                    Si querés contactarnos, escribinos a través del siguiente formulario.
                </p>
            </div>

            {/* Form */}
            <div className="w-full max-w-xl bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-8">
                {!sent ? (
                    <form
                        action="https://formsubmit.co/maikolreyes209@gmail.com"
                        method="POST"
                        onSubmit={() => setSent(true)}
                        className="space-y-5"
                    >
                        {/* Nombre */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                Nombre
                            </label>
                            <input
                                id="name"
                                name="Nombre"
                                type="text"
                                required
                                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                name="Email"
                                type="email"
                                required
                                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label htmlFor="telefono" className="block text-sm font-medium text-gray-300">
                                Teléfono
                            </label>
                            <input
                                id="telefono"
                                name="Telefono"
                                type="tel"
                                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Asunto */}
                        <div>
                            <label htmlFor="asunto" className="block text-sm font-medium text-gray-300">
                                Asunto
                            </label>
                            <input
                                id="asunto"
                                name="Asunto"
                                type="text"
                                required
                                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Mensaje */}
                        <div>
                            <label htmlFor="mensaje" className="block text-sm font-medium text-gray-300">
                                Mensaje
                            </label>
                            <textarea
                                id="mensaje"
                                name="Mensaje"
                                rows={4}
                                required
                                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>

                        {/* Hidden config */}
                        <input type="hidden" name="_next" value="https://www.financessignal.com/" />
                        <input type="hidden" name="_captcha" value="false" />

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-semibold hover:bg-blue-700 transition"
                        >
                            Enviar mensaje
                        </button>
                    </form>
                ) : (
                    <div className="text-center text-white py-10">
                        <h2 className="text-xl font-semibold mb-2">
                            ¡Mensaje enviado!
                        </h2>
                        <p className="text-gray-300">
                            Gracias por contactarte. Te responderemos a la brevedad.
                        </p>
                    </div>
                )}
            </div>
            <p className="mt-6 text-sm text-gray-500 text-center max-w-xl">
                También podés escribirnos directamente a financessignal@gmail.com
            </p>
        </section>
    );
}
