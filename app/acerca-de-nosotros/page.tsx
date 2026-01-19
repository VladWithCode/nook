"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ChevronDown, ChevronsDown } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollSectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // if (!containerRef.current) {
        //     return;
        // }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scrollSectionRef.current,
                start: "top top",
                end: "+=300%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                onLeave: () => {
                    gsap.set(scrollSectionRef.current, { translateY: "none" });
                },
                onEnterBack: () => {
                    gsap.set(scrollSectionRef.current, { translateY: "" });
                }
            }
        });

        tl.to('[data-animatable-column="left"]', {
            x: "-6rem",
            opacity: 0,
            y: "-2.5rem",
        })
            .to('[data-animatable-column="center"] [data-animatable-cell="up"]', {
                opacity: 0,
                y: "-6rem",
            }, "<")
            .to('[data-animatable-column="center"] [data-animatable-cell="down"]', {
                opacity: 0,
                y: "6rem",
            }, "<")
            .to('[data-animatable-column="right"]', {
                x: "6rem",
                opacity: 0,
                y: "-2.5rem",
            }, "<")
            .to('[data-animatable-video]', {
                aspectRatio: "16 / 9",
                width: "100%",
            }, "<")
            .to('[data-animatable-heading]', {
                opacity: 1,
                y: "0rem",
            }, "<15%");
    }, { scope: containerRef, dependencies: [] });

    return (
        <>
            <div className="relative text-foreground" ref={containerRef}>
                <section className="relative z-0 h-screen" ref={scrollSectionRef}>
                    <div className="fixed inset-0 z-0 w-full h-screen grid grid-cols-[repeat(3,50vw)] gap-5 animated-grid py-4 pointer-events-none">
                        <div className="flex flex-col gap-5" data-animatable-column="left">
                            <div className="grow shrink basis-1/4 rounded-lg w-full overflow-hidden" data-animatable-cell="left">
                                <div className="w-full h-full bg-gray-800"></div>
                            </div>
                            <div className="grow shrink basis-1/2 rounded-lg w-full overflow-hidden" data-animatable-cell="left">
                                <div className="w-full h-full bg-gray-800"></div>
                            </div>
                            <div className="grow shrink basis-2/6 rounded-lg w-full overflow-hidden" data-animatable-cell="left">
                                <div className="w-full h-full bg-gray-800"></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5" data-animatable-column="center">
                            <div className="grow shrink basis-1/4 rounded-lg w-full overflow-hidden" data-animatable-cell="up">
                                <div className="w-full h-full bg-gray-800"></div>
                            </div>
                            <div className="grow shrink basis-full rounded-lg w-full overflow-hidden" data-animatable-cell="up">
                                <div className="w-full h-full bg-gray-800"></div>
                            </div>
                            <div className="grow-0 shrink-0 aspect-3/4 rounded-lg w-full overflow-hidden">
                            </div>
                            <div className="h-12 flex items-center bg-blue-100 basis-auto grow-0 shrink-0 rounded-full" data-animatable-cell="down">
                                <ChevronsDown className="mx-auto" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5" data-animatable-column="right">
                            <div className="grow shrink basis-3/5 rounded-lg w-full overflow-hidden" data-animatable-cell="right">
                                <div className="w-full h-full bg-gray-800"></div>
                            </div>
                            <div className="grow shrink basis-2/5 rounded-lg w-full overflow-hidden" data-animatable-cell="right">
                                <div className="w-full h-full bg-gray-800"></div>
                            </div>
                            <div className="grow shrink basis-1/5 rounded-lg w-full overflow-hidden" data-animatable-cell="right">
                                <div className="w-full h-full bg-gray-800"></div>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-20 h-full grid grid-cols-1 grid-rows-1 justify-items-center items-end py-4 *:col-span-full *:row-span-full">
                        <div className="flex flex-col items-center justify-center px-4">
                            <div className="flex flex-col items-center justify-center opacity-0 translate-y-12" data-animatable-heading>
                                <h1 className="text-3xl font-secondary font-bold text-center">NÖOK: La agencia de publicidad para ti.</h1>
                            </div>
                            <div className="w-[50vw] aspect-3/4 bg-red-800 rounded-lg mt-8 mb-16" data-animatable-video>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
