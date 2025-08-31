import Link from "next/link";
import Image from "next/image";
import { socialLinks } from '../lib/socialLinks';
import darkLogo from '../assets/logoFinanceSignal-white.png';

export const Footer = () => {


    return (


        <footer className="flex items-center flex-col justify-around large-desktop:p-2 bg-gray-900 text-white min-h-[200px]" >

            <Link href={'/'} className="p-5">
                <Image
                    src={darkLogo}
                    width={100}   // tamaño original
                    height={100}   // tamaño original
                    className="w-32 h-auto" // Tailwind: ancho fijo, altura automática
                    alt="Logo"
                />
            </Link>

            <div className='flex items-center m-5 md:m-2 gap-5'>
                {
                    socialLinks.map(({ href, label, src }) => (
                        <a key={label} href={href} target='_blank'
                            rel="noopener noreferrer" aria-label={`Ingresar a ${label}`}
                            className='icon-redes text-white'>
                            <Image
                                src={src}
                                className='w-6'
                                alt={label}
                                width={24}
                                height={24}
                            />
                        </a>
                    ))
                }
            </div>


            <span className='font-secondary text-sm md:text-base m-5 md:m-2 text-center text-white'>
                © 2025 Copyright FinanceSignal
            </span>

            <div className='flex flex-col p-5 text-sm items-center gap-3 md:flex-row md:gap-5 md:text-base'>

                <Link href="/sobre-nosotros" className=" text-blue-400 hover:underline">
                    Sobre Nosotros
                </Link>

                <Link href="/contacto" className="text-blue-400 hover:underline">
                    Contacto
                </Link>

                <Link href="/politica-de-privacidad" className="text-blue-400 hover:underline">
                    Política de Privacidad
                </Link>

                <Link href="/aviso-legal" className="text-blue-400 hover:underline">
                    Aviso Legal
                </Link>

            </div>

        </footer >

    );
};
