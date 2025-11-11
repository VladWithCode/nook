"use client";

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { AnimatedLogoLoad } from '@/src/components/logo/animatedLogoLoad';
import { create } from 'zustand';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export type TIntroStore = {
    isIntroDone: boolean;
    isPageReady: boolean;
    shouldHideIntro: boolean;
    callbacks: Array<() => void>;
    setIsIntroDone: (value: boolean) => void;
    setIsPageReady: (value: boolean, cbs: Array<() => void>) => void;
    setShouldHideIntro: (value: boolean) => void;
}

export const useIntroStore = create<TIntroStore>((set) => ({
    isIntroDone: false,
    isPageReady: false,
    shouldHideIntro: false,
    callbacks: [],
    setIsIntroDone: (value) => {
        set({ isIntroDone: value });
    },
    setIsPageReady: (value, cbs) => {
        set({ isPageReady: value, callbacks: cbs });
    },
    setShouldHideIntro: (value) => {
        set({ shouldHideIntro: value });
    },
}))

export default function Intro({ }) {
    const loaderRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const {
        isIntroDone,
        isPageReady,
        shouldHideIntro,
        callbacks,
        setIsIntroDone,
        setShouldHideIntro
    } = useIntroStore();

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.random() * 10; // This should make the intro last around 1s minimum
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const finishIntroEvt = useEffectEvent((p: number) => {
        if (p >= 100) {
            setIsIntroDone(true);
        }
    })
    useEffect(() => {
        finishIntroEvt(progress)
    }, [progress])

    useGSAP(() => {
        if (!isPageReady || !isIntroDone) {
            return;
        }

        const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power1.inOut" } });
        tl.to("#intro-overlay", {
            y: "0%",
        })
            .to(loaderRef.current, {
                y: "-100%",
                onComplete: () => {
                    setShouldHideIntro(true);
                    if (!callbacks || callbacks.length === 0) {
                        return;
                    }

                    for (const callback of callbacks) {
                        callback();
                    }
                },
            }, "-=80%");
    }, { scope: loaderRef, dependencies: [isIntroDone, isPageReady] });

    if (shouldHideIntro) {
        return null;
    }

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-60 bg-main flex flex-col items-center justify-center"
            id="intro-wrapper"
        >
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
        </div>
    );
}
