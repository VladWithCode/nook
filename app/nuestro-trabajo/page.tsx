'use client';

import { useRef } from "react";
import { useIntroStore } from "../Intro";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import './shutter.css';

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);
    const shutterContainerRef = useRef<HTMLDivElement>(null);
    const isIntroDone = useIntroStore(state => state.isIntroDone)

    useGSAP(() => {
        if (!isIntroDone) {
            return;
        }

        gsap.set(document.body, {
            color: "oklch(0.13 0.028 261.692)",
            duration: 0.5,
            ease: "power3.inOut"
        });
        shutterContainerRef.current?.classList.add('animate');
    }, { scope: containerRef, dependencies: [isIntroDone] });

    return (
        <div className="relative" ref={containerRef}>
            <div className="fixed inset-0 z-60 shutter" style={{ "--flaps": 6 } as React.CSSProperties} ref={shutterContainerRef}>
                <div className="flap" style={{ "--i": 6 } as React.CSSProperties}></div>
                <div className="flap" style={{ "--i": 5 } as React.CSSProperties}></div>
                <div className="flap" style={{ "--i": 4 } as React.CSSProperties}></div>
                <div className="flap" style={{ "--i": 3 } as React.CSSProperties}></div>
                <div className="flap" style={{ "--i": 2 } as React.CSSProperties}></div>
                <div className="flap" style={{ "--i": 1 } as React.CSSProperties}></div>
            </div>
            <div className="relative py-[55vw]">
                <h1 className="text-7xl font-secondary">Producción y Medios</h1>
            </div>
        </div>
    );
}
