"use client";

import { createRef, useEffect, useEffectEvent, useRef } from 'react';
import { AnimatedLogoLoad } from '@/src/components/logo/animatedLogoLoad';
import { create } from 'zustand';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

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
        const newPg = get().progress + value || 0;
        if (newPg >= 100) {
            set({ progress: 100 });
        } else {
            set({ progress: newPg });
        }

        return newPg;
    },
    setIntroComponent: (value) => {
        set({ introComponent: value });
        const callbacks = get().callbacks;
        for (const cb of callbacks) {
            cb();
        }
    },
    setIsIntroDone: (value) => {
        set({ isIntroDone: value });
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

export default function Intro({ }) {
    const loaderRef = useRef(null);
    const {
        introComponent,
        shouldHideIntro,
        shouldReplay,
        setProgress,
        setIsIntroDone,
        setWrapperRef,
    } = useIntroStore();

    useEffect(() => {
        setWrapperRef(loaderRef);
    }, []);

    const setProgressEvt = useEffectEvent((p: number) => {
        return setProgress(p);
    });
    const finishIntroEvt = useEffectEvent(() => {
        setIsIntroDone(true);
    })
    useEffect(() => {
        if (shouldReplay) {
            // Reset progress
            setProgressEvt(0);
            // TODO: Find a better place for this
            useIntroStore.setState({ shouldReplay: false });
            return;
        }

        // Simulate loading progress
        const interval = setInterval(() => {
            const newPg = setProgressEvt(Math.random() * 10);
            if (newPg >= 100) {
                clearInterval(interval);
                finishIntroEvt();
            }
        }, 100);

        return () => clearInterval(interval);
    }, [shouldReplay]);

    if (shouldHideIntro) {
        return null;
    }

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-60 bg-main flex flex-col items-center justify-center"
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

        const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power1.inOut" } });
        tl.to("#intro-overlay", {
            y: "0%",
        })
            .to(wrapperRef.current, {
                y: "-100%",
                onComplete: () => setIsIntroDone(true),
            }, "-=80%");
    }, { scope: wrapperRef, dependencies: [progress] });

    return (
        <>
            <div id="intro-overlay" className="absolute inset-0 z-10 bg-main translate-y-full"></div>
            <div id="intro-content" className="relative z-0 text-center space-y-8">
                <div className="w-64 h-2 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-linear-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>
                <AnimatedLogoLoad />
            </div>
        </>
    )
}
