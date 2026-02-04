'use client';

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useIntroStore } from "../Intro";
import { Shutter } from "./shutter";
import { sections } from "./sections";
import './shutter.css';

gsap.registerPlugin(ScrollTrigger);

const DynamicPageSelector = dynamic(() => import("./pageSelector"), { ssr: false });

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isIntroDone = useIntroStore(state => state.isIntroDone)
    const [isShutterDone, setShutterDone] = useState(false);

    return (
        <div className="relative bg-gray-950" ref={containerRef}>
            <Shutter isIntroDone={isIntroDone} setShutterDone={setShutterDone} />
            <DynamicPageSelector sections={sections} isShutterDone={isShutterDone} />
        </div>
    );
}
