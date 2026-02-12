'use client';

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useIntroStore } from "../(client)/Introtro";
import { Shutter } from "./shutter";
import { sections } from "./sections";
import './shutter.css';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const DynamicPageSelector = dynamic(() => import("./pageSelector"), { ssr: false });

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isIntroDone = useIntroStore(state => state.isIntroDone)
    const [isShutterDone, setShutterDone] = useState(false);

    const { contextSafe } = useGSAP({ scope: containerRef });

    return (
        <div className="relative bg-gray-950" ref={containerRef}>
            <Shutter isIntroDone={isIntroDone} setShutterDone={setShutterDone} />
            <DynamicPageSelector sections={sections} isShutterDone={isShutterDone} contextSafe={contextSafe} />
        </div>
    );
}
