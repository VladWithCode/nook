'use client';

import { useEffect, useRef, useState } from "react";
import { useIntroStore } from "../Intro";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import './shutter.css';
import { NookLogo } from "@/src/components/svg/nook";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { ScrollTrigger } from "gsap/all";
import byd from "../byd.webp";
import qnr1 from "../qnr1.webp";
import qnr2 from "../qnr2.webp";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);
    const shutterContainerRef = useRef<HTMLDivElement>(null);
    const scrollSectionRef = useRef<HTMLDivElement>(null);
    const isIntroDone = useIntroStore(state => state.isIntroDone)
    const [shutterAnimationDone, setShutterAnimationDone] = useState(false);

    useEffect(() => {
        if (!isIntroDone) {
            return;
        }

        const timeout = setTimeout(() => {
            setShutterAnimationDone(true);
        }, 500);

        return () => clearTimeout(timeout);
    }, [isIntroDone])

    useEffect(() => {
        if (!isIntroDone || !shutterAnimationDone) {
            return;
        }

        const obsv = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    gsap.to(entry.target, {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        scale: 1,
                        duration: 0.9,
                        ease: "power1.out",
                    })
                }
            }
            obsv.disconnect();
        });

        const animatables = scrollSectionRef.current?.querySelectorAll("[data-animatable-title],[data-animatable-media]")
        if (animatables) {
            for (const animatable of animatables) {
                obsv.observe(animatable);
            }
        }

        return () => obsv.disconnect();
    }, [isIntroDone, shutterAnimationDone])

    useGSAP(() => {
        if (!isIntroDone) {
            return;
        }

        shutterContainerRef.current?.classList.add('animate');

        const sectionsWrapper = scrollSectionRef.current?.querySelector("[data-sections-wrapper]");
        const sections = scrollSectionRef.current?.querySelectorAll("[data-animatable-section]");
        if (sectionsWrapper && sections) {
            for (const section of sections) {
                gsap.to(section.querySelector("[data-animatable-title]"), {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.85,
                    scrollTrigger: {
                        trigger: section.querySelector("[data-animatable-title]"),
                        start: "top 80%",
                        once: true,
                    }
                });
                const medias = section.querySelectorAll("[data-animatable-media]");
                if (medias) {
                    ScrollTrigger.batch(medias, {
                        start: "top 80%",
                        once: true,
                        onEnter: (batch) => {
                            gsap.to(batch, {
                                opacity: 1,
                                y: 0,
                                x: 0,
                                scale: 1,
                                stagger: 0.05,
                                duration: 0.85,
                            })
                        },
                    });
                }
            }
        }
    }, { scope: containerRef, dependencies: [isIntroDone] });

    return (
        <div className="relative bg-gray-950" ref={containerRef}>
            <div className="fixed inset-0 z-60 pointer-events-none shutter" style={{ "--flaps": 6 } as React.CSSProperties} ref={shutterContainerRef}>
                <div className="flap" style={{ "--i": 6 } as React.CSSProperties}></div>
                <div className="flap" style={{ "--i": 5 } as React.CSSProperties}></div>
                <div className="flap" style={{ "--i": 4 } as React.CSSProperties}></div>
                <div className="flap" style={{ "--i": 3 } as React.CSSProperties}></div>
                <div className="flap" style={{ "--i": 2 } as React.CSSProperties}></div>
                <div className="flap" style={{ "--i": 1 } as React.CSSProperties}></div>
            </div>
            <div className="" ref={scrollSectionRef}>
                <div className="relative z-10 bg-gray-950 text-stone-50 px-6 pt-16 pb-8">
                    <h1 className="relative flex items-center z-0">
                        <div className="sr-only">Nöok</div>
                        <NookLogo className="h-16 opacity-60" />
                    </h1>
                </div>
                <div className="text-stone-50 px-2 space-y-[35vw]" data-sections-wrapper>
                    {
                        sections.map((section) => (
                            <GallerySection key={section.title} sectionData={section} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

function GallerySection({ sectionData }: { sectionData: typeof sections[0] }) {
    return (
        <div className="space-y-24" data-animatable-section>
            <h2
                className="relative z-10 row-start-1 bg-gray-950 text-4xl font-bold font-secondary p-4 translate-y-6 opacity-0 scale-95 text-current/60"
                data-animatable-title
            >
                {sectionData.title}
            </h2>
            <div className="relative z-0 row-start-2 flex flex-col justify-center gap-[50vw] px-6 pb-8" data-animatable-media-wrapper>
                {
                    sectionData.media.map((media, i) => <GalleryMediaRow
                        media={media}
                        position={
                            (i + 1) % 3 === 0 ? "full"
                                : (i + 1) % 2 === 0 ? "right"
                                    : "left"
                        }
                        key={media.key}
                    />)
                }
            </div>
        </div>
    )
}

function GalleryMediaRow({ media, position }: { media: typeof sections[number]["media"][number], position: keyof typeof mediaPositions }) {
    switch (media.kind) {
        case "image":
            return <GalleryImg img={media} position={position} />
        case "video":
            return <GalleryVideo video={media} position={media.position ? media.position : position} />
        default:
            return null
    }
}

const mediaPositions = {
    "left": "w-3/5 mr-auto -rotate-6 translate-x-12",
    "right": "w-3/5 ml-auto rotate-8 -translate-x-12",
    "full": "w-4/5 mx-auto translate-y-12",
} as const;

function GalleryImg({ img, position }: {
    img: { kind: "image", src: StaticImageData, alt: string, width: number, height: number },
    position: keyof typeof mediaPositions
}) {
    return (
        <Image
            className={cn(
                "rounded opacity-0 scale-95",
                img.width > img.height ? "h-full" : "w-full",
                mediaPositions[position],
            )}
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            data-animatable-media
        />
    )
}

function GalleryVideo({ video, position }: { video: { kind: "video", src: string, width: number, height: number, mimeType: string }, position: keyof typeof mediaPositions }) {
    return (
        <video
            className={cn(
                "rounded opacity-0 scale-95",
                video.width > video.height ? "h-full" : "w-full",
                mediaPositions[position],
            )}
            width={video.width}
            height={video.height}
            autoPlay
            playsInline
            muted
            loop
            data-animatable-media
        >
            <source src={video.src} type={video.mimeType} />
        </video>
    )
}

const sections = [
    {
        title: "BYD",
        media: [
            {
                src: byd,
                alt: "Imagen de galería de la campaña BYD",
                kind: "image",
                width: 600,
                height: 600,
                key: "byd-image-1",
            },
            {
                src: "/byd.webm",
                kind: "video",
                width: 1080,
                height: 1920,
                position: "full",
                mimeType: "video/webm",
                key: "byd-video-1",
            },
        ] as const,
    } as const,
    {
        title: "Limpieza Q&R",
        media: [
            {
                src: qnr1,
                alt: "Imagen de la Q&R",
                kind: "image",
                width: 1080,
                height: 1620,
                key: "qnr-image-1",
            },
            {
                src: qnr2,
                alt: "Imagen de la campaña de Q&R",
                kind: "image",
                width: 1080,
                height: 1620,
                key: "qnr-image-2",
            },
            {
                src: "/qnr.webm",
                kind: "video",
                width: 720,
                height: 1280,
                position: "full",
                mimeType: "video/webm",
                key: "qnr-video-1",
            },
        ] as const,
    } as const,
] as const;
