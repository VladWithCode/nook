"use client";

import { createRef, useEffect, useEffectEvent, useRef } from 'react';
import { AnimatedLogoLoad } from '@/src/components/logo/animatedLogoLoad';
import { create } from 'zustand';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

export type TIntroStore = {
    progress: number;
    isIntroDone: boolean;
    introComponent: React.ReactNode;
    shouldHideIntro: boolean;
    shouldReplay: boolean;
    wrapperRef: React.RefObject<HTMLDivElement | null>;
    callbacks: Array<() => void>;
    setProgress: (value: number) => number;
    setIntroComponent: (value: React.ReactElement) => void;
    setIsIntroDone: (value: boolean) => void;
    setShouldHideIntro: (value: boolean) => void;
    triggerReplay: () => void;
    setWrapperRef: (value: React.RefObject<HTMLDivElement | null>) => void;
}

export const useIntroStore = create<TIntroStore>((set, get) => ({
    progress: 0,
    isIntroDone: false,
    introComponent: null,
    shouldHideIntro: false,
    shouldReplay: false,
    wrapperRef: createRef<HTMLDivElement>(),
    callbacks: [],
    setProgress: (value) => {
        if (value === 0) {
            set({ progress: 0 });
        }
        const newPg = Math.min(get().progress + value || 0, 100);
        set({ progress: newPg });

        return newPg;
    },
    setIntroComponent: (value) => {
        set({ introComponent: value });
    },
    setIsIntroDone: (value) => {
        set({ isIntroDone: value });
        const callbacks = get().callbacks;
        for (const cb of callbacks) {
            cb();
        }
    },
    setShouldHideIntro: (value) => {
        set({ shouldHideIntro: value });
    },
    triggerReplay: () => {
        set({
            shouldReplay: true,
            isIntroDone: false,
            shouldHideIntro: false
        });
    },
    setWrapperRef: (value) => {
        set({ wrapperRef: value });
    },
}))

export default function Intro() {
    const loaderRef = useRef(null);
    const {
        introComponent,
        shouldHideIntro,
        shouldReplay,
        setProgress,
        setWrapperRef,
    } = useIntroStore();

    useEffect(() => {
        setWrapperRef(loaderRef);
    }, [setWrapperRef]);

    const setProgressEvt = useEffectEvent((p: number) => {
        return setProgress(p);
    });
    const { contextSafe } = useGSAP({ scope: loaderRef });
    const resetIntroComponent = useEffectEvent(contextSafe(() => {
        gsap.set(document.getElementById("intro-wrapper"), {
            clearProps: "all",
        });
        gsap.set("*", {
            clearProps: "all",
        });
    }));
    useEffect(() => {
        if (shouldReplay) {
            // Reset progress
            setProgressEvt(0);
            // TODO: Find a better place for this
            useIntroStore.setState({ shouldReplay: false });
            resetIntroComponent();
        }

        // Simulate loading progress
        const interval = setInterval(() => {
            const newPg = setProgressEvt(Math.random() * 10);
            if (newPg >= 100) {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [shouldReplay]);

    return (
        <div
            ref={loaderRef}
            className={cn(
                "fixed inset-0 w-full h-dvh z-60 bg-[#488685] overflow-hidden",
                shouldHideIntro && "hidden"
            )}
            id="intro-wrapper"
        >
            {introComponent}
        </div>
    );
}

// type TIntroAnimationProps = {
//     wrapperRef: React.RefObject<HTMLDivElement>;
//     finishIntro: () => void;
//     progress: number;
// }

export function MainIntroAnimation() {
    const { setIsIntroDone, wrapperRef, progress } = useIntroStore();

    useGSAP(() => {
        if (progress < 100) {
            return;
        }

        const tl = gsap.timeline();
        tl.to("#intro-overlay", {
            y: "0%",
            duration: 0.8,
        })
            .to(wrapperRef.current, {
                y: "-100%",
                duration: 0.2,
                onComplete: () => setIsIntroDone(true),
            }, "-=80%")
    }, { scope: wrapperRef, dependencies: [progress] });

    return (
        <>
            <div id="intro-overlay" className="absolute inset-0 z-10 bg-[#488685] translate-y-full"></div>
            <div id="intro-content" className="relative z-0 h-full w-full text-center">
                {/* <div className="w-64 h-2 rounded-full overflow-hidden"> */}
                {/*     <div */}
                {/*         className="h-full bg-linear-to-r from-purple-500 to-pink-500 transition-[width] duration-300 ease-out" */}
                {/*         style={{ width: `${Math.min(progress, 100)}%` }} */}
                {/*     /> */}
                {/* </div> */}
                <div className="absolute z-10 inset-x-0 bottom-24">
                    <p className="text-xl">Cargando...</p>
                </div>
                <video
                    id="intro-video"
                    className="fixed inset-0 z-0 h-full w-full"
                    src="/intro-animation.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                />
            </div>
        </>
    )
}
