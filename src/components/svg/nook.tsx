"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function NookLogo(
    { className, animateIn, ...props }:
        {
            className?: string;
            animateIn?: boolean;
        } & React.SVGAttributes<SVGSVGElement>
) {
    const logoRef = useRef<SVGSVGElement>(null);

    useGSAP(() => {
        if (!animateIn) {
            return;
        }

        const tl = gsap.timeline();

        // Get elements
        const nEl = logoRef.current?.querySelector("#n") as SVGGeometryElement | null;
        const o1El = logoRef.current?.querySelector("#o1") as SVGGeometryElement | null;
        const o2El = logoRef.current?.querySelector("#o2") as SVGGeometryElement | null;
        const kEl = logoRef.current?.querySelector("#k") as SVGGeometryElement | null;
        const line1El = logoRef.current?.querySelector("#line1");
        const line2El = logoRef.current?.querySelector("#line2");
        const leftCircleEl = logoRef.current?.querySelector("#left_circle");
        const rightCircleEl = logoRef.current?.querySelector("#right_circle");

        // Set initial states for paths (drawing animation)
        [nEl, o1El, o2El, kEl].forEach(el => {
            if (el && el.tagName !== "g") {
                const length = el.getTotalLength();
                gsap.set(el, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                    fill: "none",
                    stroke: "white",
                    strokeWidth: 1
                });
            }
        });

        // Set initial states for rects (width growth)
        gsap.set(line2El || [], { width: 0, transformOrigin: "left center" });
        gsap.set(line1El || [], { width: 0, transformOrigin: "left center" });

        // Set initial states for ellipses (radial growth)
        gsap.set([leftCircleEl, rightCircleEl].filter(Boolean), { rx: 0, ry: 0 });

        // Animate sequentially with gradual fill
        tl.to([nEl, o1El, o2El, kEl], {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: "power1.inOut",
            stagger: 0.2,
        }, "+=2.5")
            .to([nEl, o1El, o2El, kEl], {
                fill: "white",
                duration: 0.4,
                ease: "power1.inOut",
                stagger: 0.05,
            })
            .to(line2El || [], {
                width: 104.5, duration: 0.5, ease: "power1.inOut"
            }, "<")
            .to(line1El || [], {
                width: 118.1, duration: 0.5, ease: "power1.inOut"
            }, "<25%")
            .to([leftCircleEl, rightCircleEl].filter(Boolean), {
                rx: 22.1,
                ry: 21.9,
                duration: 0.5,
                ease: "power1.inOut",
                stagger: 0.05
            }, "<");
    }, { scope: logoRef, dependencies: [animateIn] });

    return (
        <svg
            className={cn("fill-white aspect-2/1", className)}
            id="nook-logo"
            viewBox="0 0 539.8 261.8"
            ref={logoRef}
            {...props}
        >
            <g id="whole_g">
                <path id="k" d="M451.6,128.7l16.9-4.9,33.4-80.1h37.3l-37,80.8c3.5,1.8,7.4,2.8,10.8,4.7,15,8.8,19.7,27.9,22.2,44,4,26.6,3.4,53.8,4.7,80.7h-35v-33.4c-2-14.6.4-49.1-12.4-59-9.1-7.1-30.3-2.9-40.8.3v92.1h-34.4V43.7h33.4l1,1v84h0Z" />
                <g id="o2_g">
                    <rect id="line2" x="290" y="193.6" width="104.5" height="29.9" />
                    <path id="o2" d="M335.3,46.5c-74.8,7.2-68.8,132.7,10.2,128.3,79.6-4.4,74-136.4-10.2-128.3ZM342.2,146.3c-33.8.2-35.4-66.9-3.7-71.2,39-5.3,40.1,71,3.7,71.2Z" />
                </g>
                <g id="o1_g">
                    <rect id="line1" x="142.8" y="227.4" width="118.1" height="34.4" />
                    <path id="o1" d="M196.5,60.2c-84.1,6.3-82.2,139.6-1.5,145.8,99.9,7.7,98.3-153,1.5-145.8ZM205.4,173.5c-43,4.3-44.2-76.6-6.9-80.9,42.4-4.9,44,77.2,6.9,80.9Z" />
                    <g id="circle_g">
                        <ellipse id="left_circle" cx="171.6" cy="22.1" rx="22.1" ry="21.9" />
                        <ellipse id="right_circle" cx="231" cy="21.9" rx="22.1" ry="21.9" />
                    </g>
                </g>
                <polygon id="n" points="33.1 44.4 89.5 171.6 89.5 44.4 118.1 44.4 118.1 254.6 92.5 254.6 29.2 117.1 29.2 253.6 28.2 254.6 1 254.6 0 253.6 0 44.4 33.1 44.4" />
            </g>
        </svg>
    );
}

export function NookClipPath() {
    return (
        <svg
            className="hidden"
            id="nook-logo"
            viewBox="0 0 539.8 261.8"
            width={0}
            height={0}
        >
            <defs>
                <clipPath id="nook-logo-cp">
                    <path id="k" d="M451.6,128.7l16.9-4.9,33.4-80.1h37.3l-37,80.8c3.5,1.8,7.4,2.8,10.8,4.7,15,8.8,19.7,27.9,22.2,44,4,26.6,3.4,53.8,4.7,80.7h-35v-33.4c-2-14.6.4-49.1-12.4-59-9.1-7.1-30.3-2.9-40.8.3v92.1h-34.4V43.7h33.4l1,1v84h0Z" />
                    <rect id="line2" x="290" y="193.6" width="104.5" height="29.9" />
                    <path id="o2" d="M335.3,46.5c-74.8,7.2-68.8,132.7,10.2,128.3,79.6-4.4,74-136.4-10.2-128.3ZM342.2,146.3c-33.8.2-35.4-66.9-3.7-71.2,39-5.3,40.1,71,3.7,71.2Z" />
                    <rect id="line1" x="142.8" y="227.4" width="118.1" height="34.4" />
                    <path id="o1" d="M196.5,60.2c-84.1,6.3-82.2,139.6-1.5,145.8,99.9,7.7,98.3-153,1.5-145.8ZM205.4,173.5c-43,4.3-44.2-76.6-6.9-80.9,42.4-4.9,44,77.2,6.9,80.9Z" />
                    <circle id="circle_r" cx="231" cy="22" r="22" />
                    <circle id="circle_l" cx="171.6" cy="22" r="22" />
                    <polygon id="n" points="33.1 44.4 89.5 171.6 89.5 44.4 118.1 44.4 118.1 254.6 92.5 254.6 29.2 117.1 29.2 253.6 28.2 254.6 1 254.6 0 253.6 0 44.4 33.1 44.4" />
                </clipPath>
            </defs>
        </svg>
    );
}
