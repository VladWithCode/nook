'use client';
import { ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div className="text-foreground pb-[20vw]" ref={containerRef}>
                <section className="relative z-10 h-svh overflow-hidden">
                    <div className="absolute inset-0 h-full w-full z-0">
                        <video src="/proximamente.mp4" className="w-full h-full object-cover"></video>
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
                    <div className="absolute -bottom-6 inset-x-0 z-10 w-full flex items-center gap-12 overflow-hidden marquee">
                        <h1 className="text-6xl font-extrabold uppercase">PROXIMAMENTE</h1>
                        <h1 className="text-6xl font-extrabold uppercase">PROXIMAMENTE</h1>
                    </div>
                </section>
                <section className="relative bg-main text-stone-700 px-8 py-12 space-y-6 z-0">
                    <p className="text-2xl font-extrabold font-secondary uppercase">Obten un vistazo de nuestros proyectos en construcción</p>
                    <Link href="/" className="flex gap-2.5 tracking-wider uppercase">Ver proyectos <ArrowRight /></Link>
                </section>
                <section className="relative bg-stone-900 text-stone-50 px-6 py-12 space-y-6 z-0">
                    <p className="text-2xl font-extrabold font-secondary uppercase pr-4">Obten un vistazo de nuestros proyectos en construcción</p>
                    <Link href="/" className="flex gap-2.5 tracking-wider uppercase">Ver proyectos <ArrowRight /></Link>
                </section>
                <section className="text-main p-8 space-y-8">
                    <div className="aspect-4/5 bg-main"></div>
                    <h2 className="text-4xl font-secondary font-extrabold uppercase">Convertimos las metas y objetivos en realidad</h2>
                    <Link href="/" className="flex gap-2.5 tracking-wider uppercase">Leer más <ArrowRight /></Link>
                </section>
            </div>
        </>
    );
}
