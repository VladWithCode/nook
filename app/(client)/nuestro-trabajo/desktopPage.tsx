'use client';

import { useEffect, useEffectEvent, useRef } from "react";
import Image from "next/image";
import { ContextSafeFunc } from "@gsap/react";
import gsap from "gsap";
import { PortfolioContent, PortfolioMedia } from "@/types/content";

export default function DesktopPage({ content, animatePage, contextSafe }: {
    content: PortfolioContent,
    animatePage: boolean,
    contextSafe: ContextSafeFunc,
}) {
    const mainScrollRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<Array<HTMLElement | null>>([]);
    const titleRefs = useRef<Array<HTMLHeadingElement | null>>([]);
    const descRefs = useRef<Array<HTMLParagraphElement | null>>([]);
    const mediaContainerRefs = useRef<Array<HTMLDivElement | null>>([]);
    const { projects } = content;

    /* eslint-disable */
    const animateInitialSection = contextSafe(() => {
        // Animate the first section in immediately when the page loads
        const sectionEl = sectionRefs.current[0];
        if (!sectionEl) return;

        const selector = gsap.utils.selector(sectionEl);
        const mediaCards = selector('[data-media-card]');

        if (mediaCards.length === 0) return;

        const cardWidth = mediaCards[0].clientWidth;

        const initialTimeline = gsap.timeline();

        // Set initial states
        gsap.set(selector('[data-details-overlay]'), { autoAlpha: 0 });
        gsap.set(selector('[data-details-title], [data-details-description]'), { opacity: 0, y: '6rem' });
        gsap.set(selector('[data-details-video-background]'), { opacity: 0, scale: 1.1 });
        gsap.set(selector('[data-media-container]'), { x: cardWidth });

        // Animate in video background
        initialTimeline.to(selector('[data-details-video-background]'), {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
        }, 0);

        // Animate in title and description
        initialTimeline.to(selector('[data-details-overlay]'), {
            autoAlpha: 1,
            duration: 0.8,
            ease: "power2.out",
        }, 0);

        initialTimeline.to(selector('[data-details-title], [data-details-description]'), {
            opacity: 1,
            y: '0rem',
            duration: 0.8,
            ease: "power2.out",
        }, 0);

        initialTimeline.to(selector('[data-media-card]'), {
            opacity: 0.65,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
        }, 0);

        return initialTimeline;
    });

    const animateScroll = contextSafe(() => {
        if (!mainScrollRef.current) return;

        const masterTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: mainScrollRef.current,
                start: "top top",
                end: () => `+=${projects.length * 250}%`,
                scrub: 1,
                pin: true,
            },
            defaults: {
                ease: "power2.inOut",
                duration: 0.8,
            }
        });

        projects.forEach((_, idx) => {
            const sectionEl = sectionRefs.current[idx];
            const selector = gsap.utils.selector(sectionEl);

            if (!sectionEl) return;

            const mediaCards = selector('[data-media-card]');
            const mediaCount = mediaCards.length;

            // Calculate how much to move each card to center it
            const cardWidth = mediaCards[0].clientWidth;
            const cardSpacing = 80; // space-x-20 = -80px
            const movePerCard = cardWidth + cardSpacing;

            // For first section, skip intro animation (already played)
            // For other sections, play the intro animation
            if (idx > 0) {
                // INTRO ANIMATION
                const introLabel = `section-${idx}-intro`;
                masterTimeline.addLabel(introLabel);

                // Set initial states
                gsap.set(selector('[data-details-overlay]'), { autoAlpha: 0 });
                gsap.set(selector('[data-details-title], [data-details-description]'), { opacity: 0, y: '6rem' });
                gsap.set(selector('[data-details-video-background]'), { opacity: 0, scale: 1.1 });
                gsap.set(selector('[data-media-container]'), { x: cardWidth });

                // Animate in video background
                masterTimeline.to(selector('[data-details-video-background]'), {
                    opacity: 1,
                    scale: 1,
                }, introLabel);

                // Animate in title and description
                masterTimeline.to(selector('[data-details-overlay]'), {
                    autoAlpha: 1,
                }, introLabel);

                masterTimeline.to(selector('[data-details-title], [data-details-description]'), {
                    opacity: 1,
                    y: '0rem',
                }, introLabel);

                masterTimeline.to(selector('[data-media-card]'), {
                    opacity: 0.65,
                    x: 0,
                }, introLabel);
            }

            // SCROLLING ANIMATION
            const scrollLabel = `section-${idx}-scroll`;
            masterTimeline.addLabel(scrollLabel);

            // For each media card, scroll it to center and scale it up
            for (let i = 0; i < mediaCount; i++) {
                const card = mediaCards[i];

                // Move all cards to bring current one to center
                masterTimeline.to(selector('[data-media-container]'), {
                    x: cardWidth - (i * movePerCard),
                }, scrollLabel + `+=${i * 1}`);

                masterTimeline.to(card, {
                    scale: 1,
                    opacity: 1,
                }, scrollLabel + `+=${i * 1}`);

                if (i > 0) {
                    masterTimeline.to(mediaCards[i - 1], {
                        scale: 0.85,
                        opacity: 0.65,
                    }, scrollLabel + `+=${i * 1}`);
                }
            }

            // OUTRO ANIMATION (if not last section)
            if (idx < projects.length - 1) {
                const outroLabel = `section-${idx}-outro`;
                masterTimeline.addLabel(outroLabel);

                // Fade out and translate up title and description
                masterTimeline.fromTo(selector('[data-details-title], [data-details-description]'), {
                    opacity: 1,
                    y: '0rem',
                }, {
                    opacity: 0,
                    y: '-6rem',
                }, outroLabel);

                // Scale down and fade out video background
                masterTimeline.fromTo(selector('[data-details-video-background]'), {
                    opacity: 1,
                    scale: 1,
                }, {
                    opacity: 0,
                    scale: 0.9,
                }, outroLabel);

                // Translate left and fade out media
                masterTimeline.fromTo(selector('[data-media-container]'), {
                    xPercent: 0,
                    opacity: 1,
                }, {
                    xPercent: -100,
                    opacity: 0,
                }, outroLabel);
            }
        });
    });
    /* eslint-enable */

    const animateScrollEvt = useEffectEvent(animateScroll);
    const animateInitialSectionEvt = useEffectEvent(animateInitialSection);

    useEffect(() => {
        if (animatePage) {
            // First animate the initial section in
            animateInitialSectionEvt();
            // Then set up the scroll animations
            animateScrollEvt();
        }
    }, [animatePage]);

    return (
        <div className="h-dvh w-dvw grid grid-cols-1 grid-rows-1 [&>section]:col-start-1 [&>section]:row-start-1 bg-neutral-950" ref={mainScrollRef}>
            {projects.map((project, index) => (
                <section
                    key={`section-${index}`}
                    ref={el => { sectionRefs.current[index] = el }}
                    className="h-full w-full grid grid-cols-[30%_60%] grid-rows-1"
                >
                    <div className="relative w-full overflow-hidden">
                        <div
                            className="absolute z-10 inset-0 opacity-0 scale-110"
                            data-details-video-background
                        >
                            {
                                project.bgKind === "image"
                                    ? <Image className="h-full w-full object-cover object-center" src={project.bg} alt={project.title} />
                                    : <video className="h-full w-full object-cover object-center" autoPlay muted playsInline loop>
                                        <source src={project.bg} type={project.bgMimeType} />
                                    </video>
                            }
                        </div>
                        <div
                            className="relative z-10 h-full flex flex-col gap-16 items-center justify-center bg-gray-950/50 px-16 backdrop-blur-lg opacity-0 invisible"
                            data-details-overlay
                        >
                            <h2
                                className="text-7xl opacity-0 translate-y-24"
                                ref={el => { titleRefs.current[index] = el }}
                                data-details-title
                            >
                                {project.title}
                            </h2>
                            <p
                                className="text-current/80 opacity-0 transltate-y-24"
                                ref={el => { descRefs.current[index] = el }}
                                data-details-description
                            >
                                {project.description}
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex items-center space-x-20 px-16"
                        ref={el => { mediaContainerRefs.current[index] = el }}
                        data-media-container
                    >
                        {project.media.map(media => <MediaCard media={media} key={media.key} />)}
                        {project.media.map(media => <MediaCard media={media} key={`${media.key}-2`} />)}
                        {project.media.map(media => <MediaCard media={media} key={`${media.key}-3`} />)}
                        {project.media.map(media => <MediaCard media={media} key={`${media.key}-4`} />)}
                    </div>
                </section>
            ))}
        </div>
    );
}

function MediaCard({ media }: { media: PortfolioMedia }) {
    return (
        <div
            className="media-card w-96 grow-0 shrink-0 rounded-lg bg-gray-950 overflow-hidden scale-85 z-0 opacity-0 translate-x-24"
            key={media.key}
            data-media-card
        >
            {
                media.kind === "image"
                    ? <MediaImg media={media} />
                    : <MediaVideo media={media} />
            }
        </div>
    )
}

function MediaImg({ media }: { media: PortfolioMedia }) {
    return (
        <Image
            className="w-full h-full object-cover z-0"
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            data-media-elt
            data-media-elt-img
        />
    )
}

function MediaVideo({ media }: { media: PortfolioMedia }) {
    return (
        <video
            height={media.height}
            width={media.width}
            autoPlay muted playsInline loop
            data-media-elt
            data-media-elt-video
        >
            <source src={media.src} type={media.mimeType} />
        </video>
    );
}
