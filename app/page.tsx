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
import calienteDeDgo from './caliente_de_durango.webp';
import qrLogo from './logo_qr.webp';
import chLogo from './logo_ch.webp';
import sqsect2_1 from './sqsect2_1.webp';
import sqsect2_2 from './sqsect2_2.webp';
import sqsect2_3 from './sqsect2_3.webp';
import sqsect2_4 from './sqsect2_4.webp';
import duckImg from './duck.webp';
import { BydLogo } from '@/src/components/svg/byd';
import { useBreakpoint } from '@/hooks/useBreakpoint';

gsap.registerPlugin(ScrollTrigger);

export default function PinnedScrollSections() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mainScrollRef = useRef<HTMLDivElement>(null);
    const squaresSectRef = useRef<HTMLDivElement>(null);
    const squaresSect2Ref = useRef<HTMLDivElement>(null);
    const isIntroDone = useIntroStore(state => state.isIntroDone);
    const shouldReplay = useIntroStore(state => state.shouldReplay);
    const breakpoint = useBreakpoint();
    const [socialProofSepType, setSocialProofSepType] = useState<"horizontal" | "vertical">("horizontal");
    const [sqSectionTriggerStart, setSqSectionTriggerStart] = useState("5% bottom");
    const [squaresGridVariant, setSquaresGridVariant] = useState<Array<number>>([]);
    const [showHeroVideo, setShowHeroVideo] = useState(false);
    const setSqSectionTriggerStartEvt = useEffectEvent((val: string) => setSqSectionTriggerStart(val));
    const setSocialProofSepTypeEvt = useEffectEvent((val: "horizontal" | "vertical") => setSocialProofSepType(val));
    const setSquaresGridVariantEvt = useEffectEvent((val: Array<number>) => setSquaresGridVariant(val));
    const setHeroVideoEvt = useEffectEvent((val: boolean) => setShowHeroVideo(val));

    useEffect(() => {
        switch (breakpoint) {
            case "sm":
                setSqSectionTriggerStartEvt("5% bottom");
                setSocialProofSepTypeEvt("horizontal");
                setSquaresGridVariantEvt(squareVariants.small);
                setHeroVideoEvt(false);
                break;
            case "md":
                setSqSectionTriggerStartEvt("10% bottom");
                setSocialProofSepTypeEvt("horizontal");
                setSquaresGridVariantEvt(squareVariants.small);
                setHeroVideoEvt(false);
                break;
            case "lg":
                setSqSectionTriggerStartEvt("50% bottom");
                setSocialProofSepTypeEvt("horizontal");
                setSquaresGridVariantEvt(squareVariants.medium);
                setHeroVideoEvt(false);
                break;
            case "xl":
                setSqSectionTriggerStartEvt("30% bottom");
                setSocialProofSepTypeEvt("vertical");
                setSquaresGridVariantEvt(squareVariants.large);
                setHeroVideoEvt(false);
                break;
            case "2xl":
                setSqSectionTriggerStartEvt("35% bottom");
                setSocialProofSepTypeEvt("vertical");
                setSquaresGridVariantEvt(squareVariants.large);
                setHeroVideoEvt(true);
                break;
        }
    }, [breakpoint])

    useGSAP(() => {
        if (!containerRef.current || !mainScrollRef.current || shouldReplay) {
            return;
        }

        if (!isIntroDone) {
            const vects = containerRef.current.querySelectorAll("#start-hero-logo [data-animatable-vector]") as NodeListOf<SVGGeometryElement> | null;
            if (!vects) {
                return;
            }
            for (const vect of vects) {
                const len = vect.getTotalLength();
                gsap.to(vect, {
                    strokeDasharray: len,
                    strokeDashoffset: len,
                    fill: "none",
                    stroke: "white",
                    strokeWidth: 1
                })
            }

            gsap.set("#start-hero-logo #line1", { width: 0, transformOrigin: "left center" });
            gsap.set("#start-hero-logo #line2", { width: 0, transformOrigin: "left center" });
            gsap.set("#start-hero-logo #circle_g ellipse", { rx: 0, ry: 0 });
            gsap.set('[data-animate="hero-slogan"]', { y: "-1em", opacity: 0 });
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
                const hTl = gsap.timeline({ defaults: { duration: 1.5, ease: "power3.inOut" } });
                hTl.to(section.querySelector("#hero-video"), {
                    opacity: 1,
                    scale: 1,
                })
                    .to("#start-hero-logo [data-animatable-vector]", {
                        strokeDashoffset: 0,
                        stagger: 0.2,
                    }, "<25%")
                    .to("#start-hero-logo [data-animatable-vector]", {
                        fill: "white",
                        duration: 0.4,
                        stagger: 0.05,
                    })
                    .to("#start-hero-logo #line2", {
                        width: 104.5, duration: 0.5
                    }, "<")
                    .to("#start-hero-logo #line1", {
                        width: 118.1, duration: 0.5
                    }, "<25%")
                    .to("#start-hero-logo #circle_g ellipse", {
                        rx: 22.1,
                        ry: 21.9,
                        duration: 0.5,
                        stagger: 0.05
                    }, "<")
                    .to(section.querySelectorAll('[data-animate="hero-slogan"]'), {
                        opacity: 1,
                        y: "0rem",
                        stagger: 0.05,
                    }, "<");
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
                    if (!elt) {
                        continue;
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
                        start: sqSectionTriggerStart,
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
                    start: sqSectionTriggerStart,
                }
            })
        }
    }, { scope: containerRef, dependencies: [isIntroDone, shouldReplay, sqSectionTriggerStart] });

    return (
        <div ref={containerRef} className="relative md:space-y-6">
            <div className="h-dvh w-dvw grid grid-cols-1 grid-rows-1 [&>section]:col-start-1 [&>section]:row-start-1" ref={mainScrollRef}>
                <section className="h-full w-full" data-animation="hero" data-animation-tl="main">
                    <video id="hero-video" className="absolute inset-0 z-0 h-full w-full object-cover" autoPlay loop muted playsInline>
                        <source src="/nook_hero.webm" type="video/webm" />
                    </video>
                    <div className="relative z-10 h-full w-full flex flex-col justify-center items-center gap-8 bg-gray-800/75 p-6 2xl:grid 2xl:grid-cols-[40%_60%] 2xl:grid-rows-[1fr_auto] 2xl:gap-x-32 2xl:pt-24">
                        {
                            showHeroVideo ? (
                                <div className="col-start-1 row-start-1 m-auto mr-0">
                                    <video className="w-96 aspect-9/16 rounded-lg" autoPlay loop muted playsInline>
                                        <source src="/nook_hero.webm" type="video/webm" />
                                    </video>
                                </div>
                            ) : null
                        }
                        <h1 className="flex flex-col gap-6 text-7xl mx-auto mt-auto 2xl:col-start-2 2xl:m-auto 2xl:ml-0">
                            <NookLogo id="start-hero-logo" className="aspect-2/1 h-40 lg:h-52 2xl:h-36" />
                            <div className="flex text-center text-2xl mx-auto lg:text-4xl 2xl:text-3xl">
                                <i className="sr-only">Nook:</i>
                                <div className="" data-animate="hero-slogan">minuciosa</div>
                                <span className="inline-block h-0">&nbsp;</span>
                                <div className="" data-animate="hero-slogan">perfección</div>
                            </div>
                        </h1>
                        <div className="mt-auto 2xl:col-span-full 2xl:row-start-2 2xl:mx-auto">
                            <Button id="continue-reading" className="flex flex-col items-center text-sm text-gray-200 animate-bounce" variant="ghost">
                                <span className="sr-only">Continua leyendo</span>
                                <ChevronDown className="relative size-4 z-0" />
                                <ChevronDown className="relative size-4 z-10 -mt-4.5" />
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="h-screen w-screen flex flex-col pt-[5vh] xl:grid xl:grid-cols-[auto_auto_1fr] xl:pt-0 2xl:px-32" data-animation="social-proof" data-animation-tl="main">
                    <ul className="flex gap-2 px-6 py-[15vw] [&>li]:flex-1 md:gap-8 xl:flex-col xl:col-start-1 xl:row-span-2 xl:py-32">
                        {
                            awards.map((award, i) => (
                                <AwardItem key={i} award={award} />
                            ))
                        }
                    </ul>
                    <div className="flex items-center justify-center col-start-2 row-span-2 xl:px-12">
                        {
                            socialProofSepType === "horizontal"
                                ? (
                                    <div className="h-px w-9/10 bg-current mx-auto" data-animate="separator-hor">
                                        <span className="sr-only">Separador de contenido</span>
                                    </div>
                                )
                                : (
                                    <div className="w-px h-9/10 bg-current mx-auto xl:col-start-2 xl:row-span-2 xl:w-px xl:h-9/10" data-animate="separator-ver">
                                        <span className="sr-only">Separador de contenido</span>
                                    </div>
                                )
                        }
                    </div>
                    <div className="space-y-6 pt-8 px-6 md:pt-12 md:space-y-8 lg:pt-20 lg:space-y-16">
                        <p className="font-light md:text-xl lg:text-2xl" data-animate="paragraph">
                            <span className="inline-block pr-2 pl-1">
                                <NookLogo className="h-8 md:h-10 lg:h-14" />
                            </span>
                            <span className="font-secondary font-normal">
                                es una agencia digital mexicana que impulsa negocios con precisión quirúrgica.
                                Diseñamos marcas, campañas y experiencias que convierten cada detalle en crecimiento real.
                            </span>
                        </p>
                        <Button className="rounded-full border-2 border-current text-current/80 capitalize cursor-pointer hover:text-neutral-100 hover:bg-neutral-950  hover:shadow-lg active:text-neutral-100 active:bg-neutral-950 md:text-lg md:p-6 lg:text-xl lg:p-6.5" variant="ghost" asChild data-animate="button">
                            <a href="/nuestro-trabajo">
                                Ver nuestro trabajo
                            </a>
                        </Button>
                    </div>
                    <div className="flex w-full justify-end px-6 py-6 mt-auto" data-animate="logo">
                        <NookLogo className="h-24 w-auto lg:h-40" />
                    </div>
                </section>
                <section className="h-full w-full flex flex-col items-center justify-center gap-4" data-animation="duck" data-animation-tl="main">
                    <Image className="w-auto h-72 md:h-128" src={duckImg} alt="Pato" width={1024} height={1024} data-animate="duck-img" />
                    <h2 className="space-y-2 md:text-center">
                        <NookLogo className="h-24 w-auto md:h-40" data-animate="logo" />
                        <span className="text-xl md:text-3xl">
                            <i className="sr-only">Nook:</i>
                            <span className="inline-block" data-animate="slogan">minuciosa</span>
                            &nbsp;
                            <span className="inline-block" data-animate="slogan">perfección</span>
                        </span>
                    </h2>
                </section>
            </div>
            <PortfolioSection />
            <section className="w-full px-6 overflow-hidden lg:pt-8 xl:py-32">
                <h2 className="text-3xl lg:text-4xl xl:w-7xl xl:mx-auto">Campañas desctacadas</h2>
                <ScrollArea className="w-full">
                    <ul className="flex gap-6 py-24 2xl:gap-20 2xl:px-12">
                        <li className="shrink-0 grow-0 w-1/2 2xl:w-1/3">
                            <a href="https://villachenacolo.com/" target="_blank">
                                <Image className="h-20 w-auto" width={512} height={141} src={chLogo} alt="Logo de AT&T" loading="lazy" />
                                <div className="relative mt-4 pt-8">
                                    <span className="absolute top-0 left-0 w-6 h-0.5 bg-current"></span>
                                    <h5 className="text-xl uppercase md:text-2xl">Villa Chenacolo</h5>
                                </div>
                                <p className="text-current/60 text-sm font-secondary mt-4.5 md:text-base">
                                    Branding y sistema visual de alto lujo para Villa Chenacolo,
                                    un salón de eventos exclusivo que fusiona elegancia arquitectónica y
                                    experiencias memorables en cada celebración.
                                </p>
                            </a>
                        </li>
                        <li className="shrink-0 grow-0 w-1/2 xl:w-1/3">
                            <a href="https://www.byd.com/mx" target="_blank">
                                <BydLogo className="h-20" />
                                <div className="relative mt-4 pt-8">
                                    <span className="absolute top-0 left-0 w-6 h-0.5 bg-current"></span>
                                    <h5 className="text-xl uppercase md:text-2xl">BYD Durango</h5>
                                </div>
                                <p className="text-current/60 text-sm font-secondary mt-4.5 md:text-base">Una experiencia digital creada para impulsar la nueva era de movilidad eléctrica en México.</p>
                            </a>
                        </li>
                        <li className="shrink-0 grow-0 w-1/2 xl:w-1/3">
                            <a href="https://www.instagram.com/calientedgo/">
                                <Image className="size-20 aspect-square" width={128} height={128} src={calienteDeDgo} alt="Logo de Caliente de Durango" loading="lazy" />
                                <div className="relative mt-4 pt-8">
                                    <span className="absolute top-0 left-0 w-6 h-0.5 bg-current"></span>
                                    <h5 className="text-xl uppercase md:text-2xl">Caliente de Durango</h5>
                                </div>
                                <p className="text-current/60 text-sm font-secondary mt-4.5 md:text-base">Campañas digitales enfocadas en conversión y presencia local en Durango.</p>
                            </a>
                        </li>
                        <li className="shrink-0 grow-0 w-1/2 xl:w-1/3">
                            <a href="https://qrestrellas.com/" target="_blank">
                                <Image className="h-20 w-auto" width={256} height={124} src={qrLogo} alt="Logo de Wilson" loading="lazy" />
                                <div className="relative mt-4 pt-8">
                                    <span className="absolute top-0 left-0 w-6 h-0.5 bg-current"></span>
                                    <h5 className="text-xl uppercase md:text-2xl">Q&R Estrellas de la Limpieza</h5>
                                </div>
                                <p className="text-current/60 text-sm font-secondary mt-4.5 md:text-base">Branding y sistema visual profesional para una empresa dedicada a limpieza industrial y residencial.</p>
                            </a>
                        </li>
                    </ul>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </section>
            <section className="px-6 xl:w-7xl xl:mx-auto" ref={squaresSectRef}>
                <h2 className="font-secondary text-6xl font-light pt-6 pb-24">Creamos experiencias para hacerte notar y ayudarte a crecer</h2>
                <div className="grid grid-cols-6 gap-3 xl:grid-cols-12" data-squares-grid>
                    {
                        squaresGridVariant.map(v => {
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
                                            loop
                                        >
                                        </video>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <p className="font-secondary text-center py-12 md:text-lg lg:pt-16">
                    Nuestra experiencia nos ha dado una envidiable reputación por siempre dar ese factor &quot;WOW&quot;,
                    apoyada con diseño inteligente y bien pensado enfocado a darte la mayor ganancia sobre tu
                    inversión.
                </p>
            </section>
            <section>
                <div className="grid grid-cols-2 aspect-3/4 xl:grid-cols-4 xl:aspect-auto xl:h-96" ref={squaresSect2Ref}>
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
                element: '[data-animate="hero-slogan"]',
                toVars: { y: "0rem", opacity: 1 },
                exitVars: { y: "1.5rem", opacity: 0 },
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
                element: '[data-animate="separator-hor"]',
                toVars: { scaleX: 0.9 },
                fromVars: { scaleX: 0 },
                exitVars: { scaleX: 0 },
                position: "<90%",
            }, {
                element: '[data-animate="separator-ver"]',
                toVars: { scaleY: 0.9 },
                fromVars: { scaleY: 0 },
                exitVars: { scaleY: 0 },
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
        title: string;
        href: string;
    }
}
function AwardItem({ award }: TAwardProps) {
    return (
        <li>
            <a className="flex flex-col gap-2 md:gap-4" href={award.href}>
                <span className="text-3xl md:text-5xl lg:text-6xl xl:text-8xl">{award.title}</span>
                <span className="text-xs text-current/80 font-secondary font-normal leading-tight md:text-lg lg:text-xl xl:text-lg xl:text-current/60">{award.label}</span>
            </a>
        </li>
    );
}

const awards = [
    {
        label: "Diseño que convierte ideas en impacto real.",
        title: "Crea",
        icon: <Copy1 />,
        href: "#"
    },
    {
        label: "Estrategias que redefinen cómo crece tu marca.",
        title: "Innova",
        icon: <Copy1 />,
        href: "#"
    },
    {
        label: "Impulso digital que acelera tu negocio.",
        icon: <Copy1 />,
        title: "Crece",
        href: "#"
    }
];

const squareVariants = {
    "small": [1, 2, 3, -1, 4, 5, 6, 7, 8, 9, -2, 10],
    "medium": [1, 2, 3, -1, 4, 5, 6, -2, 7, 8, 9, -3, 10, 11, 12, -4, 13, 14, 15, 16, -5, 17, 18],
    "large": [1, 2, 3, -1, 4, 5, 6, -2, 7, 8, 9, -3, 10, 11, 12, -4, 13, 14, 15, 16, -5, 17, 18, 19, 20, -6, 21, 22, 23, 24, -7, 25, 26, 27, 28, -8]
}
