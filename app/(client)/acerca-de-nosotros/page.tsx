"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowRight, ChevronRight, CircleDot, Clock, HashIcon, Link2, ThumbsUp, User, UserCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useIntroStore } from "../Intro";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import chenacoloSm from "../chenacolo-sm.webp";
import chenacoloShowcase from "../chenacolo_showcase.webp";
import limpiezaQr from "../qr_icon.webp";
import { BydLogo } from "@/src/components/svg/byd";
import { MasonrySection } from "./masonrySection";
import "./masonryStyle.css";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isIntroDone = useIntroStore(state => state.isIntroDone);
    const [showPage, setShowPage] = useState(false);

    const { contextSafe } = useGSAP(() => {
    }, { scope: containerRef, dependencies: [isIntroDone] });

    return (
        <>
            <div className="text-foreground" ref={containerRef}>
                <MasonrySection
                    isIntroDone={isIntroDone}
                    contextSafe={contextSafe}
                    setShowPage={setShowPage}
                />
                {
                    showPage ? (
                        <div className="relative z-10 px-6 pb-[10vw] -mt-0 space-y-24 md:w-4/5 md:mx-auto xl:w-6xl xl:space-y-48">
                            <section className="grid grid-cols-2 gap-4 font-medium font-secondary leading-tight" data-animate-section>
                                <p className="text-current/60">
                                    NÖOK es una agencia digital mexicana que impulsa negocios con precisión quirúrgica.
                                </p>
                                <p className="text-current/60">
                                    Diseñamos marcas, campañas y experiencias que convierten cada detalle en crecimiento real.
                                </p>
                            </section>
                            <section className="space-y-12">
                                <h2 className="text-4xl text-center">
                                    Todos los expertos, un techo.
                                    <br />
                                    No más teléfono descompuesto.
                                </h2>
                                <div className="flex flex-col items-center justify-center aspect-square w-fit mx-auto">
                                    <p className="font-secondary max-w-80 text-center">Reserva tu lugar. Desarrollemos tu proyecto, juntos.</p>
                                    <div className="py-8">
                                        <Button className="bg-main rounded-full p-6 px-20 text-base" asChild>
                                            <Link href="/contacto">Agendar Cita</Link>
                                        </Button>
                                    </div>
                                    <p className="font-secondary max-w-80 text-center">Somos todo oidos&mdash;no hay ideas locas, en NÖOK no juzgamos.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-6 font-secondary leading-tight text-current/60">
                                    <div className="space-y-4 xl:space-y-6">
                                        <p className="">
                                            Construir tu marca o sitio web deberia ser emocionante
                                            &mdash;y debe generar resultados...
                                        </p>
                                        <p className="">
                                            Hablando en serio.
                                            <br />
                                            Coordinar múltiples estudios o navegar grandes agencias
                                            puede distorsionar tu visión y desperdiciar tu tiempo&mdash;
                                            energía que es mejor invertir en hacer crecer tu negocio.
                                            <br />
                                            NÖOK es tu lugar para hacerlo.
                                        </p>
                                    </div>
                                    <div className="space-y-4 xl:space-y-6">
                                        <p className="">
                                            Con 14 años de experiencia, somos del tamaño justo&mdash;ni muy grandes, ni muy pequeños, exactamente lo necesario&mdash;la experiencia de un estudio de talla mundial con la flexibilidad de una agencia boutique&mdash;sin las complicaciones.
                                        </p>
                                        <p className="">
                                            Sin juegos de teléfono. Sin pérdidas de energía. Solo excelente trabajo y buenas vibras. Hacemos que todo funcione.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <Button className="bg-special text-stone-50 text-base p-6 px-20 rounded-full" asChild>
                                        <Link href="/contacto">Contactanos ya</Link>
                                    </Button>
                                </div>
                            </section>
                            <section className="space-y-4 xl:space-y-6">
                                <div className="space-y-1">
                                    <h2 className="font-secondary">Una formula simple y efectiva.</h2>
                                    <p className="text-3xl tracking-tighter xl:text-4xl">
                                        Sexy primero. Inteligente siempre.
                                        <br />
                                        Una estrategia 500 millones de años en desarrollo.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-6 font-secondary leading-tight text-current/60">
                                    <div className="space-y-4 xl:space-y-6">
                                        <p>
                                            &quot;Sexy & Smart&quot; es como llamamos a nuestro enfoque 100% orgánico,
                                            inspirado por la estratega definitiva: la Madre Naturaleza.
                                        </p>
                                        <p>
                                            Desde plumas deslumbrantes hasta cantos hipnóticos, cada especie en el reino
                                            animal usa rasgos destacados para atraer atención y asegurar su supervivencia.
                                            La seducción no es solo instinto&mdash;es evolución.
                                        </p>
                                        <p>Para tu marca, la seducción es la clave del éxito.</p>
                                    </div>
                                    <div className="space-y-4 xl:space-y-6">
                                        <p>
                                            Por hacerte irresistible a primera vista, cautivamos a tu audiencia.
                                            Si el momento se siente correcto, darán el siguiente paso: interactuar con tu oferta.
                                        </p>
                                        <p>
                                            Así funciona el cerebro. Primero, decisiones rápidas e intuitivas (Sistema 1),
                                            luego razonamiento lógico más profundo (Sistema 2)&mdash;
                                            pero esa es una historia para otro día.
                                        </p>
                                        <p>
                                            Atráelos con &quot;Sexy.&quot; Cierra el trato con &quot;Inteligente.&quot;
                                            Es una estrategia ganadora para tu marca&mdash;y quién sabe,
                                            tal vez también para tu próxima cita.
                                        </p>
                                    </div>
                                </div>
                            </section>
                            <section className="border-t border-current/10 py-3 space-y-2 xl:space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg">Mira nuestros proyectos</h2>
                                    <Link href="/" className="flex items-center gap-1 text-blue-500">
                                        <span>Todos</span>
                                        <ArrowRight className="size-5" />
                                    </Link>
                                </div>
                                <div className="flex gap-2 xl:gap-8">
                                    <div className="aspect-3/4 basis-1/3 grow-0 shrink-0 grid grid-cols-3 grid-rows-4 gap-2 xl:gap-8 xl:shrink">
                                        <div className="col-span-3 row-span-3">
                                            <Image className="w-full h-full object-cover rounded-xl" src={chenacoloShowcase} alt="Demostración de Villa Chenacolo" />
                                        </div>
                                        <div className="aspect-square bg-special/80 rounded-lg p-1">
                                            <Image src={chenacoloSm} alt="Logo de Villa Chenacolo" />
                                        </div>
                                        <div className="col-span-2 flex items-center">
                                            <p className="text-xs xl:text-base">Villa Chenacolo</p>
                                            {/* <p className="text-xs text-current/60">Recreación</p> */}
                                        </div>
                                    </div>
                                    <div className="aspect-3/4 basis-1/3 grow-0 shrink-0 grid grid-cols-3 grid-rows-4 gap-2 xl:gap-8 xl:shrink">
                                        <div className="col-span-3 row-span-3 bg-blue-600 rounded-xl"></div>
                                        <div className="aspect-square bg-blue-100 rounded-lg p-1">
                                            <Image className="h-full" src={limpiezaQr} alt="Logo de Limpieza Q&R" />
                                        </div>
                                        <div className="col-span-2 flex items-center">
                                            <p className="text-xs xl:text-base">Limpieza Q&R</p>
                                            {/* <p className="text-xs text-current/60">Limpieza</p> */}
                                        </div>
                                    </div>
                                    <div className="aspect-3/4 basis-1/3 grow-0 shrink-0 grid grid-cols-3 grid-rows-4 gap-2 xl:gap-8 xl:shrink">
                                        <div className="col-span-3 row-span-3 bg-stone-900 rounded-xl">
                                        </div>
                                        <div className="flex items-center aspect-square bg-stone-200 rounded-lg p-1">
                                            <BydLogo />
                                        </div>
                                        <div className="col-span-2 flex items-center">
                                            <p className="text-xs xl:text-base">BYD</p>
                                            {/* <p className="text-xs text-current/60"></p> */}
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="space-y-4 xl:space-y-6">
                                <h2 className="text-3xl tracking-tighter xl:text-4xl">
                                    Ayudamos a marcas desafiantes de todos los tamaños a enfrentar&mdash;
                                    y destronar&mdash;a los líderes del mercado.
                                </h2>
                                <div className="grid grid-cols-2 gap-6 font-secondary leading-tight text-current/60">
                                    <div className="space-y-4 xl:space-y-6">
                                        <p>
                                            Los líderes del mercado, en su intento por proteger su territorio,
                                            a menudo se vuelven cautelosos—demasiado cautelosos.
                                            Dudan en innovar, jugando a lo seguro hasta que su postura defensiva
                                            se convierte en su caída.
                                        </p>
                                        <p>
                                            Ahí es donde entran los desafiantes. Audaces, rompedores de reglas y
                                            sin miedo a interrumpir el mercado, los desafiantes saben que resultados
                                            diferentes requieren movimientos diferentes.
                                        </p>
                                    </div>
                                    <div className="space-y-4 xl:space-y-6">
                                        <p>Y aquí estás tú.</p>
                                        <p>
                                            No navegando el sitio web de una agencia tradicional, sino el nuestro.
                                            Eso dice mucho sobre tus ambiciones.
                                        </p>
                                        <p>
                                            Eres un desafiante. Y nosotros somos el aliado que te ayudará a sacudir
                                            a tus competidores&mdash;y tomar su lugar.
                                        </p>
                                    </div>
                                </div>
                            </section>
                            <section className="grid grid-cols-2 auto-rows-[27vh] gap-3 border-t border-current/10 py-3 xl:grid-cols-3 xl:gap-5 xl:py-6">
                                <div className="flex flex-col justify-between w-full h-full bg-linear-to-b from-fuchsia-400 to-orange-300 rounded-lg p-3">
                                    <h3 className="text-lg tracking-tight leading-tight">Dale a tu negocio una identidad que destaque.</h3>
                                    <div className="flex items-end justify-between leading-none">
                                        <p className="font-secondary font-medium">Branding</p>
                                        <ArrowRight className="size-4 stroke-2" />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between w-full h-full bg-linear-to-b from-blue-400 from-35% via-pink-400 to-orange-300 to-65% rounded-lg p-3">
                                    <h3 className="text-lg tracking-tight leading-tight">Conviertete en una estrella de Instagram.</h3>
                                    <div className="flex items-end justify-between leading-none">
                                        <p className="font-secondary font-medium">Creación de Contenido</p>
                                        <ArrowRight className="size-4 stroke-2" />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between w-full h-full bg-linear-to-b from-sky-300 from-15% via-violet-400 to-yellow-200 rounded-lg p-3">
                                    <h3 className="text-lg tracking-tight leading-tight">Reposiciona tu marca para reflejar tu nueva visión.</h3>
                                    <div className="flex items-end justify-between leading-none">
                                        <p className="font-secondary font-medium">Estrategia de Marca</p>
                                        <ArrowRight className="size-4 stroke-2" />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between w-full h-full bg-linear-to-b from-yellow-100 from-30% via-pink-200 to-sky-300 to-70% rounded-lg p-3">
                                    <h3 className="text-lg tracking-tight leading-tight">Dale a tu negocio una identidad que destaque.</h3>
                                    <div className="flex items-end justify-between leading-none">
                                        <p className="font-secondary font-medium">Branding</p>
                                        <ArrowRight className="size-4 stroke-2" />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between w-full h-full bg-linear-to-b from-lime-200 from-20% via-pink-200 to-sky-200 to-70% rounded-lg p-3">
                                    <h3 className="text-lg tracking-tight leading-tight">Establece tu presencia en línea y expande tu alcance</h3>
                                    <div className="flex items-end justify-between leading-none">
                                        <p className="font-secondary font-medium">Servicios Web</p>
                                        <ArrowRight className="size-4 stroke-2" />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between w-full h-full bg-linear-to-b from-sky-300 from-30% to-yellow-300 to-70% rounded-lg p-3">
                                    <h3 className="text-lg tracking-tight leading-tight">Refresca tu imagen con una visión moderna.</h3>
                                    <div className="flex items-end justify-between leading-none">
                                        <p className="font-secondary font-medium">Branding</p>
                                        <ArrowRight className="size-4 stroke-2" />
                                    </div>
                                </div>
                            </section>
                            <section className="space-y-4 xl:space-y-0 xl:gap-8 xl:grid xl:grid-cols-3">
                                <h2 className="text-3xl tracking-tighter xl:text-4xl xl:col-span-full">¿Cómo es trabajar con nosotros?</h2>
                                <div className="grid grid-cols-2 gap-6 font-secondary leading-tight text-current/60 xl:col-start-2 xl:col-span-2">
                                    <div className="space-y-4 xl:space-y-6">
                                        <p>
                                            Claro, escuchar puede no parecer la razón más
                                            llamativa para confiarnos tu proyecto,
                                            pero es la que nuestros clientes más elogian.
                                        </p>
                                        <p>
                                            Te dirán: es esa atención al detalle, ese enfoque en ti,
                                            lo que marca la diferencia.
                                        </p>
                                    </div>
                                    <div className="space-y-4 xl:space-y-6">
                                        <p>
                                            Combina eso con un ambiente colaborativo y lleno de confianza,
                                            y tienes la salsa secreta para desbloquear lo mejor de nuestro equipo.
                                        </p>
                                        <p>
                                            Y no se trata solo de entregar proyectos de alto rendimiento
                                            (aunque también hacemos eso). Se trata de crear un proceso que sea
                                            gratificante, divertido y que a menudo abre la puerta a oportunidades
                                            inesperadas que no viste venir.
                                        </p>
                                    </div>
                                </div>
                                <div className="py-6 xl:col-start-1 xl:row-start-2 xl:py-0">
                                    <video className="aspect-9/16 rounded-lg bg-gray-800" autoPlay muted playsInline>
                                        <source src="/nook_hero.webm" type="video/webm" />
                                    </video>
                                </div>
                            </section>
                            <section className="space-y-4">
                                <h2 className="text-4xl tracking-tighter">NÖOK en pocas palabras.</h2>
                                <ul className="divide-y divide-current/30">
                                    <li className="grid grid-cols-[repeat(2,50%)] items-center gap-2 py-2.5">
                                        <h3 className="flex items-center gap-1 text-current/50">
                                            <Clock className="size-4" />
                                            <span>Creación</span>
                                        </h3>
                                        <p className="">Agosto 2025</p>
                                    </li>
                                    <li className="grid grid-cols-[repeat(2,50%)] items-start gap-2 py-2.5">
                                        <h3 className="flex items-center gap-1 text-current/50">
                                            <CircleDot className="size-4" />
                                            <span>Servicios</span>
                                        </h3>
                                        <ul className="divide-y divide-current/30 *:first:pt-0 *:last:pb-0">
                                            <li className="grid grid-cols-[auto_1fr] gap-2 py-2.5">
                                                <h4 className="">Branding y Estrategia de Marca</h4>
                                                <ChevronRight className="size-4 my-auto stroke-current/30" />
                                            </li>
                                            <li className="grid grid-cols-[auto_1fr] gap-2 py-2.5">
                                                <h4 className="">Creación de Contenido</h4>
                                                <ChevronRight className="size-4 my-auto stroke-current/30" />
                                            </li>
                                            <li className="grid grid-cols-[auto_1fr] gap-2 py-2.5">
                                                <h4 className="">Producción Audiovisual</h4>
                                                <ChevronRight className="size-4 my-auto stroke-current/30" />
                                            </li>
                                            <li className="grid grid-cols-[auto_1fr] gap-2 py-2.5">
                                                <h4 className="">Manejo de Redes Sociales</h4>
                                                <ChevronRight className="size-4 my-auto stroke-current/30" />
                                            </li>
                                            <li className="grid grid-cols-[auto_1fr] gap-2 py-2.5">
                                                <h4 className="">Servicios Web</h4>
                                                <ChevronRight className="size-4 my-auto stroke-current/30" />
                                            </li>
                                            <li className="grid grid-cols-[auto_1fr] gap-2 py-2.5">
                                                <h4 className="">Más Servicios</h4>
                                                <ChevronRight className="size-4 my-auto stroke-current/30" />
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="grid grid-cols-[repeat(2,50%)] items-start gap-2 py-2.5">
                                        <h3 className="flex items-center gap-1 text-current/50">
                                            <User className="size-4" />
                                            <span>Clientes</span>
                                        </h3>
                                        <p className="font-secondary font-bold">336</p>
                                    </li>
                                    <li className="grid grid-cols-[repeat(2,50%)] items-start gap-2 py-2.5">
                                        <h3 className="flex items-center gap-1 text-current/50">
                                            <User className="size-4" />
                                            <span>Proyectos de Branding</span>
                                        </h3>
                                        <p className="font-secondary font-bold">103</p>
                                    </li>
                                    <li className="grid grid-cols-[repeat(2,50%)] items-start gap-2 py-2.5">
                                        <h3 className="flex items-center gap-1 text-current/50">
                                            <User className="size-4" />
                                            <span>Diseños Web</span>
                                        </h3>
                                        <p className="font-secondary font-bold">276</p>
                                    </li>
                                    <li className="grid grid-cols-[repeat(2,50%)] items-start gap-2 py-2.5">
                                        <h3 className="flex items-start gap-1 text-current/50">
                                            <HashIcon className="size-6" />
                                            <span>¿Con qué industrias trabajamos?</span>
                                        </h3>
                                        <p className="">Todas</p>
                                    </li>
                                    <li className="grid grid-cols-[repeat(2,50%)] items-start gap-2 py-2.5">
                                        <h3 className="flex items-center gap-1 text-current/50">
                                            <ThumbsUp className="size-4" />
                                            <span>Liderazgo</span>
                                        </h3>
                                        <ul className="divide-y divide-current/30 *:first:pt-0 *:last:pb-0">
                                            <li className="grid grid-cols-[auto_1fr] gap-2 py-2.5">
                                                <UserCircle className="size-8 my-auto stroke-current/30 xl:size-10" />
                                                <h4 className="text-sm font-secondary font-semibold xl:text-base">Nely Marian&mdash;CEO y Fundadora</h4>
                                            </li>
                                            <li className="grid grid-cols-[auto_1fr] gap-2 py-2.5">
                                                <UserCircle className="size-8 my-auto stroke-current/30 xl:size-10" />
                                                <h4 className="text-sm font-secondary font-semibold xl:text-base">Nely Marian&mdash;CEO y Fundadora</h4>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="grid grid-cols-[repeat(2,50%)] items-start gap-2 py-2.5">
                                        <h3 className="flex items-center gap-1 text-current/50">
                                            <ThumbsUp className="size-4" />
                                            <span>Expertos</span>
                                        </h3>
                                        <p className="">20</p>
                                    </li>
                                    <li className="grid grid-cols-[repeat(2,50%)] items-start gap-2 py-2.5">
                                        <h3 className="flex items-center gap-1 text-current/50">
                                            <Clock className="size-4" />
                                            <span>Presencia en Redes Sociales</span>
                                        </h3>
                                        <ul className="divide-y divide-current/30 *:first:pt-0 *:last:pb-0">
                                            <li className="flex items-center justify-between gap-2 py-2.5">
                                                <h4 className="">Instagram</h4>
                                                <Link2 className="size-4 my-auto stroke-current/30" />
                                            </li>
                                            <li className="flex items-center justify-between gap-2 py-2.5">
                                                <h4 className="">LinkedIn</h4>
                                                <Link2 className="size-4 my-auto stroke-current/30" />
                                            </li>
                                            <li className="flex items-center justify-between gap-2 py-2.5">
                                                <h4 className="">TikTok</h4>
                                                <Link2 className="size-4 my-auto stroke-current/30" />
                                            </li>
                                            <li className="flex items-center justify-between gap-2 py-2.5">
                                                <h4 className="">Facebook</h4>
                                                <Link2 className="size-4 my-auto stroke-current/30" />
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    ) : null
                }
            </div>
        </>
    );
}
