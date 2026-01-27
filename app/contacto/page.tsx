'use client';

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Mail, Phone } from "lucide-react";
import { TeamCarousel } from "./teamCarousel";
import { ContactForm } from "./contactForm";

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
        <div className="relative text-foreground pb-[20vw]" ref={containerRef}>
            <div className="fixed inset-0 w-full h-full z-0">
            </div>
            <div className="relative z-10 p-6 pt-14 space-y-1 text-stone-50">
                <section className="space-y-1">
                    <div className="flex items-center justify-between bg-stone-800/90 p-4 rounded-md">
                        <p className="flex flex-col font-secondary leading-tight">
                            <span className="font-bold">Teléfono</span>
                            <span className="text-current/80">+52 618 291 9510</span>
                        </p>
                        <a href="tel:+526182919510" className="block aspect-square bg-stone-600/70 p-4 rounded-full">
                            <Phone className="size-5" />
                        </a>
                    </div>
                    <div className="flex items-center justify-between bg-stone-800/90 p-4 rounded-md">
                        <p className="flex flex-col font-secondary leading-tight">
                            <span className="font-bold">Correo Electrónico</span>
                            <span className="text-current/80">contacto@nookcreativo.mx</span>
                        </p>
                        <a href="mailto:contacto@nookcreativo.mx" className="block aspect-square bg-stone-600/70 p-4 rounded-full">
                            <Mail className="size-5" />
                        </a>
                    </div>
                    <div className="relative w-full aspect-square bg-stone-800/90 rounded-md overflow-hidden">
                        <iframe
                            className="absolute inset-0 z-0 w-full h-full overflow-hidden object-cover opacity-90"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227.80060299908374!2d-104.643469825387!3d24.002498011523645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bb9ee2648f965%3A0x67d72edb3d7d8299!2sPlaza%20San%20Sebasti%C3%A1n!5e0!3m2!1ses-419!2smx!4v1769123700550!5m2!1ses-419!2smx"
                            width="600"
                            height="600"
                            style={{ border: "0" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                        <div className="relative z-10 h-full flex flex-col justify-end bg-linear-to-t from-stone-900/90 from-10% to-transparent to-60%">
                            <p className="text-3xl p-4">Calle Nazas 100, Real Country, 34162 Durango, Dgo.</p>
                        </div>
                    </div>
                    <div className="relative w-full bg-stone-800/90 rounded-md p-4 space-y-12">
                        <p className="font-secondary font-medium text-current/80">
                            Abierto de 9:00 a 18:00 horas.
                        </p>
                        <h3 className="flex flex-col gap-0.5 text-3xl">
                            <span>Lunes</span>
                            <span>Martes</span>
                            <span>Miércoles</span>
                            <span>Jueves</span>
                            <span>Viernes</span>
                        </h3>
                    </div>
                    <TeamCarousel />
                    <div className="relative bg-stone-800/90 rounded-md p-4 space-y-12">
                        <h1 className="text-4xl">Contactanos</h1>
                        <ContactForm />
                    </div>
                </section>
            </div>
        </div>
    );
}
