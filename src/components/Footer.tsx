import Link from "next/link";
import Image from "next/image";
import { socialLinks } from '../lib/socialLinks';
import darkLogo from '../assets/logoFinanceSignal-white.png';

export const Footer = () => {


    return (


        <footer className="flex items-center flex-col justify-around large-desktop:p-2 bg-dark min-h-[200px]" >

            <Link href={'/'}>
                <Image
                    src={darkLogo}
                    alt="Logo de la empresa"
                    className="max-h-8 w-auto"
                    priority
                    width={120}
                    height={32}
                />
            </Link>

            <div className='flex items-center gap-5'>
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


            <span className='font-secondary mobile:text-base text-lg text-center text-white'>
                © 2025 Copyright FinanceSignal
            </span>

            <div className='flex items-center gap-5'>

                <Link href="/sobre-nosotros" className="text-blue-400 hover:underline">
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
