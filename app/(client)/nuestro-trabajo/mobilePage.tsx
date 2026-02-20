'use client';

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { TMedia, TMediaImage, TSection } from "./sections";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PortfolioContent, PortfolioMedia, PortfolioProject } from "@/types/content";

export default function MobilePage({ animatePage, content }: {
    animatePage: boolean,
    content: PortfolioContent,
}) {
    const scrollSectionRef = useRef<HTMLDivElement>(null);
    const { projects } = content;

    useEffect(() => {
        if (!animatePage) {
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
    }, [animatePage])

    useGSAP(() => {
        if (!animatePage) {
            return;
        }

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
                const mediaElts = section.querySelectorAll("[data-animatable-media]");
                if (mediaElts) {
                    ScrollTrigger.batch(mediaElts, {
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
    }, { scope: scrollSectionRef, dependencies: [animatePage] });

    return (
        <div className="py-[10vh]" ref={scrollSectionRef}>
            <div className="text-stone-50 px-2 space-y-[10vw]" data-sections-wrapper>
                {
                    projects.map((project) => (
                        <GallerySection key={project.title} sectionData={project} />
                    ))
                }
            </div>
        </div>
    );
}

function GallerySection({ sectionData }: { sectionData: PortfolioProject }) {
    return (
        <div className="space-y-10 md:px-8 md:space-y-16" data-animatable-section>
            <h2
                className="relative z-10 row-start-1 bg-gray-950 text-4xl font-bold font-secondary p-4 translate-y-6 opacity-0 scale-95 text-current/60 md:px-0"
                data-animatable-title
            >
                {sectionData.title}
            </h2>
            <div className="relative z-0 row-start-2 flex flex-col justify-center gap-[25vw] px-6 pb-8 md:gap-44" data-animatable-media-wrapper>
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

function GalleryMediaRow({ media, position }: { media: PortfolioMedia, position: keyof typeof mediaPositions }) {
    switch (media.kind) {
        case "image":
            return <GalleryImg media={media} position={position} />
        case "video":
            return <GalleryVideo video={media} position={media.position ? media.position : position} />
        default:
            return null
    }
}

const mediaPositions = {
    "left": "w-3/5 mr-auto -rotate-2 translate-x-12",
    "right": "w-3/5 ml-auto rotate-4 -translate-x-12",
    "full": "w-4/5 mx-auto translate-y-12",
} as const;

function GalleryImg({ media, position }: {
    media: PortfolioMedia,
    position: keyof typeof mediaPositions
}) {
    const { src, alt, width, height, position: overridePosition } = media;
    const pos = overridePosition || position;

    return (
        <Image
            className={cn(
                "rounded opacity-0 scale-95",
                width > height ? "h-full" : "w-full",
                mediaPositions[pos],
            )}
            src={src}
            alt={alt}
            width={width}
            height={height}
            data-animatable-media
        />
    );
}

function GalleryVideo({ video, position }: { video: PortfolioMedia, position: keyof typeof mediaPositions }) {
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
