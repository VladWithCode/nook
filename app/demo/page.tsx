"use client";

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useIntroStore } from './Intro';
import { NookLogo } from '@/src/components/svg/nook';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PinnedScrollSections() {
    const containerRef = useRef(null);
    const [animatePage, setAnimatePage] = useState(false);
    const { setIsPageReady } = useIntroStore();

    const setReadyEvt = useEffectEvent(() => {
        setIsPageReady(true, [() => setAnimatePage(true)]);
    })
    useEffect(() => {
        setReadyEvt();
    }, [])

    useGSAP(() => {
        if (!window.document || !animatePage) {
            return;
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${sections.length * 100}%`,
                scrub: 1,
                pin: true
            }
        });

        const sections = document.querySelectorAll("section");
        sections.forEach((section, i) => {
            if (i === 0) {
                gsap.set(section, { opacity: 1, zIndex: sections.length - i });
            } else {
                gsap.set(section, { opacity: 0, zIndex: sections.length - i });

                tl.to(section, {
                    opacity: 1,
                    duration: 0.5
                }, i);

                tl.to(sections[i - 1], {
                    opacity: 0,
                    duration: 0.5
                }, i);
            }
        });

        gsap.to("#hero-video", { opacity: 1, scale: 1, duration: 0.5, delay: 0.05 });
    }, { scope: containerRef, dependencies: [animatePage] });

    return (
        <div className="">
            <div ref={containerRef} className="h-screen relative">
                <section className="relative h-screen z-0">
                    <video id="hero-video" className="absolute inset-0 z-0 h-full w-full object-cover opacity-0 scale-97" autoPlay loop muted>
                        <source src="/demo_vid_hero.mp4" type="video/mp4" />
                    </video>
                    <div className="relative z-10 h-full w-full flex flex-col justify-center items-center gap-8 bg-gray-800/40 p-6">
                        <h1 className="text-7xl mx-auto mt-auto">
                            <div className="sr-only">Nook: minuciosa perfección</div>
                            <NookLogo id="start-hero-logo" className="aspect-2/1 h-40" animateIn={true} />
                        </h1>
                        <div className="mt-auto">
                            <p id="continue-reading" className="flex flex-col items-center text-sm text-gray-200">
                                <span className="sr-only">Continiua leyendo</span>
                                <ChevronDown className="relative z-0" />
                                <ChevronDown className="relative z-10 -mt-4" />
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
