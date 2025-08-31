"use client"
//
import swal from 'sweetalert';

export default function Contact() {

    const sendForm = () => {
        swal({
            title: 'Tu consulta fue enviada',
            text: "Gracias por Contactarte",
            icon: "success"
        })
    }

    return (
        <>
            <div className='min-h-screen'>
                <div className="sectionForm flex items-center flex-col mt-14 mb-4" id="contacto" >
                    <h2 className="text-black font-title text-3xl">Contacto</h2>
                    <p className="font-title text-center w-4/5 desktop:w-2/5 large-desktop:w-1/3 large-desktop:text-base text-black text-lg"> Si queres contactarnos escribinos a través de
                        este formulario.</p>
                </div>


                <div className="form-contact text-white w-2/5 desktop:w-2/4 large-desktop:w-2/5 mx-auto bg-gray-900 mt-10 rounded-2xl">
                    <div className="content flex justify-center">
                        <div className="contact-wrapper">
                            <div className="contact-form bg-dark font-subtitle rounded-3xl">
                                <form onSubmit={sendForm} action="https://formsubmit.co/maikolreyes209@gmail.com" method="POST">
                                    <p>
                                        <label className="text-lg desktop:text-sm large-desktop:text-lg" htmlFor="name">Nombre</label>
                                        <input required type="text" name="Nombre" id="name" />
                                    </p>
                                    <p>
                                        <label className="text-lg desktop:text-sm large-desktop:text-lg" htmlFor="email">Correo Electrónico</label>
                                        <input required type="email" name="Gmail" id="email" />
                                    </p>
                                    <p>
                                        <label className="text-lg desktop:text-sm large-desktop:text-lg" htmlFor="telefono">Teléfono</label>
                                        <input required type="number" name="Telefono" id="telefono" />
                                    </p>
                                    <p>
                                        <label className="text-lg desktop:text-sm large-desktop:text-lg" htmlFor="asunto">Asunto</label>
                                        <input required type="text" name="Asunto" id="asunto" />
                                    </p>
                                    <p className="block">
                                        <label className="text-lg desktop:text-sm large-desktop:text-lg" htmlFor="mensajes">Mensaje</label>
                                        <textarea required name="Mensaje" id="Mensaje" cols={50} rows={1} ></textarea>
                                    </p>
                                    <p className="block desktop:text-sm">
                                        <button className="p-2 text-lg cursor-pointer" type="submit">Enviar</button>
                                        <input type="hidden" name="_next" value="https://www.financessignal.com/" />
                                        <input type="hidden" name="_captcha" value='false' />
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}