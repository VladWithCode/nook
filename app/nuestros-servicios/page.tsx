'use client';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(".marquee h1", {
            duration: 2.5,
            x: "-=100vw",
            ease: "none",
            repeat: -1,
        })
    }, { scope: containerRef, dependencies: [] });

    return (
        <>
            <div className="text-foreground" ref={containerRef}>
                <section className="relative z-10 h-svh overflow-hidden">
                    <div className="absolute inset-0 h-full w-full z-0">
                        <video src="/byd.webm" className="w-full h-full object-cover" muted autoPlay playsInline loop></video>
                        <div className="absolute z-10 top-1/2 left-1/2 -translate-1/2 flex flex-col justify-center text-stone-50">
                            <button className="">
                                <PlayCircle className="size-20" strokeWidth="0.5" />
                            </button>
                            <p className="text-center font-secondary tracking-widest uppercase">
                                <span>Visita</span>
                            </p>
                        </div>
                    </div>
                </section>
                <section className="relative z-10">
                    <div className="absolute -bottom-6 inset-x-0 z-10 w-full flex items-center overflow-hidden marquee">
                        <h1 className="w-screen text-6xl font-extrabold uppercase text-center">POSICIONATE</h1>
                        <h1 className="w-screen text-6xl font-extrabold uppercase text-center">POSICIONATE</h1>
                        <h1 className="w-screen text-6xl font-extrabold uppercase text-center">POSICIONATE</h1>
                        <h1 className="w-screen text-6xl font-extrabold uppercase text-center">POSICIONATE</h1>
                    </div>
                </section>
                <section className="relative bg-main text-stone-700 px-8 py-12 space-y-6 z-0">
                    <p className="text-2xl font-extrabold font-secondary uppercase">Tu exito es nuestro exito. Por eso, nuestra oferta esta enfocada en darte en mayor valor por tu inversión.</p>
                    <Link href="/" className="flex gap-2.5 tracking-wider uppercase">Ver Paquetes <ArrowRight /></Link>
                </section>
                <section className="relative bg-stone-900 text-stone-50 px-6 py-12 space-y-6 z-0">
                    <p className="text-2xl font-extrabold font-secondary uppercase pr-4 text-right">Posiciona tu negocio, se la primera opción para tus clientes.</p>
                </section>
                <section className="p-8 space-y-8">
                    <div className="aspect-4/5 flex flex-col bg-main text-stone-50 p-6 rounded-lg">
                        <h2 className="text-4xl font-secondary font-extrabold uppercase mb-6">Plan Básico</h2>
                        <ul className="space-y-3 list-disc list-inside">
                            <li>Diseño de marca</li>
                            <li>Estrategias de crecimiento</li>
                            <li>Planificación de ventas</li>
                            <li>Gestión de clientes</li>
                            <li>Marketing digital</li>
                        </ul>
                        <p className="text-4xl mt-auto">$5,000 MXN/mes</p>
                    </div>
                    <div className="aspect-4/5 flex flex-col bg-stone-900 text-stone-50 p-6 rounded-lg">
                        <h2 className="text-4xl font-secondary font-extrabold uppercase mb-6">Plan Avanzado</h2>
                        <ul className="space-y-3 list-disc list-inside">
                            <li>Incluye servicios del plan Básico</li>
                            <li>Diseño de marca</li>
                            <li>Estrategias de crecimiento</li>
                            <li>Planificación de ventas</li>
                            <li>Gestión de clientes</li>
                            <li>Marketing digital</li>
                        </ul>
                        <p className="text-4xl mt-auto">$8,500 MXN/mes</p>
                    </div>
                    <div className="aspect-4/5 flex flex-col bg-special text-stone-50 p-6 rounded-lg">
                        <h2 className="text-4xl font-secondary font-extrabold uppercase mb-6">Plan Enterprise</h2>
                        <ul className="space-y-3 list-disc list-inside">
                            <li>Incluye servicios del plan Avanzado</li>
                            <li>Diseño de marca</li>
                            <li>Estrategias de crecimiento</li>
                            <li>Planificación de ventas</li>
                            <li>Gestión de clientes</li>
                            <li>Marketing digital</li>
                        </ul>
                        <p className="text-4xl mt-auto">$14,000 MXN/mes</p>
                    </div>
                </section>
                <section className="flex flex-col justify-center items-center gap-8 bg-gray-800 px-6 py-20">
                    <button className="bg-main px-8 py-2 rounded-full text-xl text-stone-50 uppercase">Contratar ahora</button>
                    <button className="bg-stone-50 px-8 py-2 rounded-full text-xl text-stone-900 uppercase">Volver al inicio</button>
                </section>
            </div>
        </>
    );
}
