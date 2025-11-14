"use client";

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useIntroStore } from './Intro';
import { NookLogo } from '@/src/components/svg/nook';
import { ChevronDown } from 'lucide-react';
import { Copy1 } from '@/src/components/svg/cpy_icons';
import { Button } from '@/components/ui/button';
import { PortfolioSection } from './_portfolioSection';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Image from 'next/image';
import googleLogo from './google_logo.webp';
import patagoniaLogo from './patagonia_logo.webp';
import kfcLogo from './kfc_logo.webp';
import attLogo from './att_logo.webp';
import wilsonLogo from './wilson_logo.webp';
import sqsect2_1 from './sqsect2_1.webp';
import sqsect2_2 from './sqsect2_2.webp';
import sqsect2_3 from './sqsect2_3.webp';
import sqsect2_4 from './sqsect2_4.webp';
import duckImg from './duck.webp';

gsap.registerPlugin(ScrollTrigger);

export default function PinnedScrollSections() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mainScrollRef = useRef<HTMLDivElement>(null);
    const squaresSectRef = useRef<HTMLDivElement>(null);
    const squaresSect2Ref = useRef<HTMLDivElement>(null);
    const [animatePage, setAnimatePage] = useState(false);
    const { setIsPageReady } = useIntroStore();

    const setReadyEvt = useEffectEvent(() => {
        setIsPageReady(true, [() => setAnimatePage(true)]);
    })
    useEffect(() => {
        setReadyEvt();
    }, [])

    useGSAP(() => {
        if (!containerRef.current || !mainScrollRef.current || !animatePage || !window.document) {
            return;
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainScrollRef.current,
                start: "top top",
                end: () => `+=${sections.length * 100}%`,
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });

        const sections = containerRef.current.querySelectorAll<HTMLElement>('section[data-animation-tl="main"]');
        sections.forEach((section, i) => {
            if (i === 0) {
                gsap.set(section, {
                    zIndex: sections.length - i,
                });
                gsap.to("#hero-video", { opacity: 1, scale: 1, delay: 0.1 });
            } else {
                const outAnimations = getSectionAnimations(sections[i - 1]);
                for (const animation of outAnimations) {
                    let elt = animation.globalSelector
                        ? document.querySelectorAll(animation.element)
                        : sections[i - 1].querySelectorAll(animation.element);
                    if (animation.element === "&") {
                        // @ts-expect-error - TS doesn't know that elt is a HTMLElement
                        elt = sections[i - 1];
                    }

                    if (!animation.exitVars) {
                        tl.to(sections[i - 1], { zIndex: sections.length - i - 1 });
                        continue;
                    } else if (animation.toVars) {
                        tl.fromTo(elt, animation.toVars, animation.exitVars, animation.position);
                        continue;
                    }

                    tl.to(sections[i - 1], { zIndex: sections.length - i - 1 });
                }

                const animations = getSectionAnimations(section);
                for (const animation of animations) {
                    if (!animation.toVars) {
                        continue;
                    }
                    const elt = animation.globalSelector
                        ? document.querySelectorAll(animation.element)
                        : section.querySelectorAll(animation.element);

                    if (animation.fromVars) {
                        tl.fromTo(elt, animation.fromVars, animation.toVars, animation.position);
                        continue;
                    }

                    tl.to(elt, animation.toVars, animation.position);
                }
            }
        });

        if (squaresSectRef.current) {
            gsap.to(squaresSectRef.current.querySelectorAll("[data-animate-square] video"), {
                opacity: 1,
                x: "0%",
                stagger: 0.1,
                duration: 0.5,
                scrollTrigger: {
                    trigger: squaresSectRef.current.querySelector("[data-squares-grid]"),
                    start: "top bottom",
                }
            });

            if (document.body) {
                const bodyBgTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: squaresSectRef.current.querySelector("[data-squares-grid]"),
                        start: "5% bottom",
                        onEnter: () => {
                            bodyBgTl.play();
                        },
                        onLeave: () => {
                            bodyBgTl.reverse();
                        },
                        onEnterBack: () => {
                            bodyBgTl.play();
                        },
                        onLeaveBack: () => {
                            bodyBgTl.reverse();
                        }
                    }
                });
                bodyBgTl.to(document.body, {
                    background: "oklch(0.13 0.028 261.692)",
                    color: "oklch(0.985 0.002 247.839)",
                    duration: 0.5,
                    ease: "power3.inOut"
                })
            }
        }

        if (squaresSect2Ref.current) {
            gsap.to(squaresSect2Ref.current.querySelectorAll("[data-animate-square]"), {
                scale: 1,
                rotate: 0,
                duration: 0.5,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: squaresSect2Ref.current,
                    start: "5% bottom",
                }
            })
        }
    }, { scope: containerRef, dependencies: [animatePage] });

    return (
        <div ref={containerRef} className="relative">
            <div className="h-screen w-full grid grid-cols-1 grid-rows-1 [&>section]:col-start-1 [&>section]:row-start-1" ref={mainScrollRef}>
                <section className="h-full w-full" data-animation="hero" data-animation-tl="main">
                    <video id="hero-video" className="absolute inset-0 z-0 h-full w-full object-cover" autoPlay loop muted>
                        <source src="/demo_vid_hero.mp4" type="video/mp4" />
                    </video>
                    <div className="relative z-10 h-full w-full flex flex-col justify-center items-center gap-8 bg-gray-800/40 p-6">
                        <h1 className="text-7xl mx-auto mt-auto">
                            <div className="sr-only">Nook: minuciosa perfección</div>
                            <NookLogo id="start-hero-logo" className="aspect-2/1 h-40" animateIn={true} />
                        </h1>
                        <div className="mt-auto">
                            <p id="continue-reading" className="flex flex-col items-center text-sm text-gray-200">
                                <span className="sr-only">Continua leyendo</span>
                                <ChevronDown className="relative z-0" />
                                <ChevronDown className="relative z-10 -mt-4" />
                            </p>
                        </div>
                    </div>
                </section>
                <section className="h-full w-full" data-animation="social-proof" data-animation-tl="main">
                    <ul className="flex gap-6 px-6 py-[15vw] [&>li]:flex-1">
                        {
                            awards.map((award, i) => (
                                <AwardItem key={i} award={award} />
                            ))
                        }
                    </ul>
                    <div className="h-px w-9/10 bg-current mx-auto" data-animate="separator">
                        <span className="sr-only">Separador de contenido</span>
                    </div>
                    <div className="space-y-6 pt-8 px-6">
                        <p className="font-light text-xl" data-animate="paragraph">
                            BASIC/DEPT® is a global branding and digital design agency building products, services, and eCommerce experiences that turn cultural values into company value.
                        </p>
                        <Button className="rounded-full border border-current capitalize" variant="ghost" data-animate="button">
                            Ve nuestro trabajo
                        </Button>
                        <div className="flex w-full justify-end" data-animate="logo">
                            <NookLogo className="h-24 w-auto" />
                        </div>
                    </div>
                </section>
                <section className="h-full w-full flex flex-col items-center justify-center" data-animation="duck" data-animation-tl="main">
                    <Image className="-0" src={duckImg} alt="Pato" width={1024} height={1024} data-animate="duck-img" />
                    <h2 className="space-y-2">
                        <NookLogo className="h-24 w-auto" data-animate="logo" />
                        <span>
                            <i className="sr-only">Nook:</i>
                            <span className="inline-block text-xl" data-animate="slogan">minuciosa</span>
                            &nbsp;
                            <span className="inline-block text-xl" data-animate="slogan">perfección</span>
                        </span>
                    </h2>
                </section>
            </div>
            <PortfolioSection />
            <section className="w-full px-6">
                <h2 className="text-3xl">Campañas desctacadas</h2>
                <ScrollArea className="w-full">
                    <ul className="flex gap-6 py-24">
                        <li className="shrink-0 grow-0 w-1/2">
                            <Image width={128} height={40} src={googleLogo} alt="Logo de Google" loading="lazy" />
                            <div className="relative mt-4 pt-8">
                                <span className="absolute top-0 left-0 w-6 h-0.5 bg-current"></span>
                                <h5 className="text-xl uppercase">Google</h5>
                            </div>
                            <p className="text-sm mt-4.5">Our embedded partnership with Google is as deep as it gets. We’re the lead creative agency for Google Store and provide strategy, design, and prototyping to other divisions.</p>
                        </li>
                        <li className="shrink-0 grow-0 w-1/2">
                            <Image width={128} height={40} src={kfcLogo} alt="Logo de KFC" loading="lazy" />
                            <div className="relative mt-4 pt-8">
                                <span className="absolute top-0 left-0 w-6 h-0.5 bg-current"></span>
                                <h5 className="text-xl uppercase">KFC</h5>
                            </div>
                            <p className="text-sm mt-4.5">An award-winning global, digital transformation engagement spanning eCommerce, mobile app, and new drive thru experiences. Bringing KFC’s brand story to life while making it easier for customers to buy chicken.</p>
                        </li>
                        <li className="shrink-0 grow-0 w-1/2">
                            <Image width={128} height={40} src={wilsonLogo} alt="Logo de Wilson" loading="lazy" />
                            <div className="relative mt-4 pt-8">
                                <span className="absolute top-0 left-0 w-6 h-0.5 bg-current"></span>
                                <h5 className="text-xl uppercase">Wilson</h5>
                            </div>
                            <p className="text-sm mt-4.5">Our embedded partnership with Google is as deep as it gets. We’re the lead creative agency for Google Store and provide strategy, design, and prototyping to other divisions.</p>
                        </li>
                        <li className="shrink-0 grow-0 w-1/2">
                            <Image className="size-12" width={128} height={40} src={attLogo} alt="Logo de AT&T" loading="lazy" />
                            <div className="relative mt-4 pt-8">
                                <span className="absolute top-0 left-0 w-6 h-0.5 bg-current"></span>
                                <h5 className="text-xl uppercase">AT&T</h5>
                            </div>
                            <p className="text-sm mt-4.5">Our embedded partnership with Google is as deep as it gets. We’re the lead creative agency for Google Store and provide strategy, design, and prototyping to other divisions.</p>
                        </li>
                        <li className="shrink-0 grow-0 w-1/2">
                            <Image width={128} height={40} src={patagoniaLogo} alt="Logo de Patagonia" loading="lazy" />
                            <div className="relative mt-4 pt-8">
                                <span className="absolute top-0 left-0 w-6 h-0.5 bg-current"></span>
                                <h5 className="text-xl uppercase">Patagonia</h5>
                            </div>
                            <p className="font-secondary text-sm mt-4.5">Our embedded partnership with Google is as deep as it gets. We’re the lead creative agency for Google Store and provide strategy, design, and prototyping to other divisions.</p>
                        </li>
                    </ul>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </section>
            <section className="px-6" ref={squaresSectRef}>
                <h2 className="font-secondary text-6xl font-light pt-6 pb-24">Creamos experiencias para hacerte notar y ayudarte a crecer</h2>
                <div className="grid grid-cols-6 gap-3" data-squares-grid>
                    {
                        [1, 2, 3, -1, 4, 5, 6, 7, 8, 9, -2, 10].map(v => {
                            if (v < 0) {
                                return (
                                    <div className="col-span-2 aspect-square h-full" key={v}></div>
                                )
                            } else {
                                return (
                                    <div className="col-span-2 relative aspect-square h-full overflow-hidden" key={v} data-animate-square={v}>
                                        <video
                                            className="absolute inset-0 scale-105 -translate-x-full opacity-0"
                                            src="/horsect_3.webm"
                                            autoPlay
                                            muted
                                            playsInline
                                        >
                                        </video>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <p className="font-secondary text-center py-12">
                    Nuestra experiencia nos ha dado una envidiable reputación por siempre dar ese factor &quot;WOW&quot;,
                    apoyada con diseño inteligente y bien pensado enfocado a darte la mayor ganancia sobre tu
                    inversión.
                </p>
                <div className="-mx-6 grid grid-cols-2 grid-rows-2 aspect-3/4" ref={squaresSect2Ref}>
                    <div className="relative h-full w-full overflow-hidden scale-0 -rotate-180" data-animate-square>
                        <Image className="transform-none w-full h-full object-cover" src={sqsect2_1} alt="Imagen de la sección de squares" />
                    </div>
                    <div className="relative h-full w-full overflow-hidden scale-0 -rotate-180" data-animate-square>
                        <Image className="transform-none w-full h-full object-cover" src={sqsect2_2} alt="Imagen de la sección de squares" />
                    </div>
                    <div className="relative h-full w-full overflow-hidden scale-0 -rotate-180" data-animate-square>
                        <Image className="transform-none w-full h-full object-cover" src={sqsect2_3} alt="Imagen de la sección de squares" />
                    </div>
                    <div className="relative h-full w-full overflow-hidden scale-0 -rotate-180" data-animate-square>
                        <Image className="transform-none w-full h-full object-cover" src={sqsect2_4} alt="Imagen de la sección de squares" />
                    </div>
                </div>
            </section>
        </div>
    );
}

type TSectionAnimation = {
    element: string;
    toVars?: GSAPTweenVars;
    exitVars?: GSAPTweenVars;
    fromVars?: GSAPTweenVars;
    position?: string | number;
    globalSelector?: boolean;
}

function getSectionAnimations(section: HTMLElement): TSectionAnimation[] {
    const animation = section.dataset.animation;
    switch (animation) {
        case "hero":
            return [{
                element: "#hero-video",
                toVars: { opacity: 1, scale: 1 },
                fromVars: { opacity: 0, scale: 97 },
                exitVars: { opacity: 0, scale: 1.05 },
            }, {
                element: "#start-hero-logo",
                toVars: { opacity: 1, scale: 1 },
                exitVars: { opacity: 0, scale: 0.8 },
                position: "<",
            }, {
                element: "&",
                toVars: { opacity: 1 },
                fromVars: { opacity: 0 },
                exitVars: { autoAlpha: 0 }
            }];
        case "social-proof":
            return [{
                element: "body",
                toVars: { background: "oklch(0.985 0.002 247.839)", color: "oklch(0.13 0.028 261.692)" },
                fromVars: { background: "oklch(0.13 0.028 261.692)", color: "oklch(0.985 0.002 247.839)" },
                exitVars: { background: "oklch(0.985 0.002 247.839)", color: "oklch(0.13 0.028 261.692)" },
                globalSelector: true
            }, {
                element: "ul>li",
                toVars: { opacity: 1, x: "0rem", stagger: 0.1 },
                fromVars: { opacity: 0, x: "-3.5rem", stagger: 0.15 },
                exitVars: { opacity: 0, x: "3.5rem", stagger: 0.05 },
                position: "<50%"
            }, {
                element: '[data-animate="separator"]',
                toVars: { width: "90%" },
                fromVars: { width: "0%" },
                exitVars: { width: "0%" },
                position: "<90%",
            }, {
                element: '[data-animate="paragraph"]',
                toVars: { opacity: 1, y: "0rem" },
                fromVars: { opacity: 0, y: "3.5rem" },
                exitVars: { opacity: 0, y: "-2rem" },
                position: "<"
            }, {
                element: '[data-animate="button"]',
                toVars: { opacity: 1, x: "0rem" },
                fromVars: { opacity: 0, x: "-3.5rem" },
                exitVars: { opacity: 0, x: "3.5rem" },
                position: "<"
            }, {
                element: '[data-animate="logo"] #n',
                toVars: { opacity: 1, y: "0rem" },
                fromVars: { opacity: 0, y: "3.5rem" },
                exitVars: { opacity: 0, y: "-2rem" },
                position: "<"
            }, {
                element: '[data-animate="logo"] #o1_g',
                toVars: { opacity: 1, y: "0rem" },
                fromVars: { opacity: 0, y: "3.5rem" },
                exitVars: { opacity: 0, y: "-2rem" },
                position: "<15%"
            }, {
                element: '[data-animate="logo"] #o2_g',
                toVars: { opacity: 1, y: "0rem" },
                fromVars: { opacity: 0, y: "3.5rem" },
                exitVars: { opacity: 0, y: "-2rem" },
                position: "<15%"
            }, {
                element: '[data-animate="logo"] #k',
                toVars: { opacity: 1, y: "0rem" },
                fromVars: { opacity: 0, y: "3.5rem" },
                exitVars: { opacity: 0, y: "-2rem" },
                position: "<15%"
            }, {
                element: "&",
                toVars: { opacity: 1 },
                fromVars: { opacity: 0 },
                exitVars: { autoAlpha: 0 }
            }];
        case "duck":
            return [{
                element: '[data-animate="duck-img"]',
                toVars: { scale: 1 },
                fromVars: { scale: 0 },
                exitVars: { scale: 0 },
            }, {
                element: '[data-animate="logo"]',
                toVars: { scale: 1 },
                fromVars: { scale: 0 },
                exitVars: { scale: 0 },
                position: "<10%"
            }, {
                element: '[data-animate="slogan"]',
                toVars: { y: "0rem", opacity: 1, stagger: 0.05 },
                fromVars: { y: "1.5rem", opacity: 0 },
                exitVars: { y: "-1.5rem" },
                position: "<50%"
            }];

        default:
            return [{
                element: "&",
                toVars: { opacity: 1 },
                fromVars: { opacity: 0 },
                exitVars: { autoAlpha: 0 }
            }];
    }
}

type TAwardProps = {
    award: {
        label: string;
        icon: React.ReactNode;
        href: string;
    }
}
function AwardItem({ award }: TAwardProps) {
    return (
        <li>
            <a href={award.href}>
                <figure>
                    {award.icon}
                </figure>
                <span className="text-xs">{award.label}</span>
            </a>
        </li>
    );
}

const awards = [
    {
        label: "Design and branding agency of the year.",
        icon: <Copy1 />,
        href: "#"
    },
    {
        label: "Agency of the year.",
        icon: <Copy1 />,
        href: "#"
    },
    {
        label: "Digital innovation agency of the year finalist.",
        icon: <Copy1 />,
        href: "#"
    }
];
