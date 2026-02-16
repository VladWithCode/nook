'use client';

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Mail, Phone } from "lucide-react";
import { TeamCarousel } from "./teamCarousel";
import { ContactForm } from "./contactForm";
import { ScrollTrigger } from "gsap/all";
import { useIntroStore } from "../Intro";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isIntroDone = useIntroStore(state => state.isIntroDone);

    useGSAP(() => {
        if (!isIntroDone) {
            return;
        }

        ScrollTrigger.batch("[data-animatable-card]", {
            batchMax: 6,
            onEnter: (batch) => {
                gsap.to(batch, {
                    autoAlpha: 1,
                    y: "0rem",
                    scale: 1,
                    stagger: 0.05,
                    duration: 0.8,
                })
            },
        });
    }, { scope: containerRef, dependencies: [isIntroDone] });

    return (
        <div className="relative bg-main text-foreground pb-12" ref={containerRef}>
            <div className="fixed inset-0 w-full h-full z-0">
            </div>
            <div className="relative z-10 text-stone-50">
                <section className="grid grid-cols-1 p-6 pt-14 gap-1 md:grid-cols-5 md:gap-3 md:p-8 xl:grid-cols-8">
                    <div className="flex items-center justify-between bg-black/75 p-4 rounded-md animatable-card md:row-start-1 md:col-start-1 md:col-span-2 xl:col-span-2 2xl:px-6" data-animatable-card>
                        <p className="flex flex-col font-secondary leading-tight 2xl:text-xl">
                            <span className="font-bold">Teléfono</span>
                            <span className="text-current/80">+52 618 291 9510</span>
                        </p>
                        <a href="tel:+526182919510" className="block aspect-square bg-stone-600/70 p-4 rounded-full 2xl:p-5">
                            <Phone className="size-5 2xl:size-6" />
                        </a>
                    </div>
                    <div className="flex items-center justify-between bg-black/75 p-4 rounded-md animatable-card md:row-start-2 md:col-start-1 md:col-span-2 xl:col-span-2 2xl:px-6" data-animatable-card>
                        <p className="flex flex-col font-secondary leading-tight 2xl:text-xl">
                            <span className="font-bold">Correo Electrónico</span>
                            <span className="text-current/80">contacto@nookcreativo.mx</span>
                        </p>
                        <a href="mailto:contacto@nookcreativo.mx" className="block aspect-square bg-stone-600/70 p-4 rounded-full 2xl:p-5">
                            <Mail className="size-5 2xl:size-6" />
                        </a>
                    </div>
                    <div className="relative w-full aspect-square bg-black/75 rounded-md overflow-hidden animatable-card md:aspect-auto md:col-span-2 md:row-span-4 md:row-start-3 md:col-start-4 xl:row-start-1 xl:row-span-3 xl:col-span-3" data-animatable-card>
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
                        <div className="relative z-10 h-full flex flex-col justify-end bg-linear-to-t from-stone-900/75 from-10% to-transparent to-60% md:via-stone-600/90 md:via-20% xl:px-2 xl:py-4">
                            <p className="text-3xl p-4 md:text-xl xl:text-3xl 2xl:text-4xl">Calle Nazas 100, Real Country, 34162 Durango, Dgo.</p>
                        </div>
                    </div>
                    <div className="relative w-full bg-black/75 rounded-md p-4 space-y-12 animatable-card md:px-6 md:py-8 md:col-start-auto md:col-span-3 md:row-start-1 md:row-span-2 xl:justify-between xl:row-start-3 xl:col-start-1 xl:row-span-2 xl:col-span-2 2xl:space-y-16" data-animatable-card>
                        <p className="font-secondary font-medium text-current/80 2xl:text-lg">
                            Abierto de 9:00 a 18:00 horas.
                        </p>
                        <h3 className="flex flex-col gap-0.5 text-3xl 2xl:text-4xl">
                            <span>Lunes</span>
                            <span>Martes</span>
                            <span>Miércoles</span>
                            <span>Jueves</span>
                            <span>Viernes</span>
                        </h3>
                    </div>
                    <div className="animatable-card col-span-full md:col-start-4 md:col-span-2 md:row-span-1 md:row-start-7 xl:row-start-4 xl:col-span-6 h-[15vw] *:h-full" data-animatable-card>
                        <TeamCarousel />
                    </div>
                    <div className="relative bg-black/75 rounded-md p-4 space-y-12 animatable-card md:col-span-3 md:row-start-3 md:col-start-1 md:row-span-4 md:py-12 md:px-8 md:space-y-28 xl:row-start-1 xl:col-start-auto xl:col-span-3 xl:row-span-3" data-animatable-card>
                        <h1 className="text-4xl md:text-5xl">Contactanos</h1>
                        <ContactForm />
                    </div>
                </section>
            </div>
        </div>
    );
}
