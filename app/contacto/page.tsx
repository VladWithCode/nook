'use client';

import { useEffect, useEffectEvent, useRef } from "react";
import { useIntroStore } from "../Intro";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) {
            return;
        }

        const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power1.inOut" } });
        tl.to("body", {
            color: "oklch(0.13 0.028 261.692)",
            duration: 0.5,
            ease: "power3.inOut"
        })
    }, {});

    return (
        <>
            <div className="relative text-foreground pb-[20vw]" ref={containerRef}>
                <section className="flex flex-col justify-center py-[55vw] space-y-1">
                    <h1 className="text-7xl font-secondary font-light px-3">Diseño y Creatividad</h1>
                    <video className="w-full aspect-video" autoPlay muted playsInline loop>
                        <source src="/diseno-creatividad.webm" type="video/webm" />
                    </video>
                </section>
                <section className="px-3 pr-12 space-y-16">
                    <h2 className="text-lg">Nuestro proceso creativo</h2>
                    <p className="text-6xl font-secondary font-light">
                        Creamos la mejor experiencia para tus clientes.
                    </p>
                </section>
            </div>
        </>
    );
}
