"use client";
import { usePathname } from "next/navigation";
import Intro, { MainIntroAnimation, useIntroStore } from "./Intro";
import { useEffect } from "react";

export default function IntroWrapper() {
    const pathname = usePathname();
    const setIntroComponent = useIntroStore((state) => state.setIntroComponent);
    const triggerReplay = useIntroStore((state) => state.triggerReplay);

    useEffect(() => {
        switch (pathname) {
            case "/proximamente":
                setIntroComponent(<MainIntroAnimation />);
                break;
            case "/diseno-y-creatividad":
                setIntroComponent(<MainIntroAnimation />);
                break;
            case "/produccion-y-medios":
                setIntroComponent(<MainIntroAnimation />);
                break;
            default:
            case "/":
                setIntroComponent(<MainIntroAnimation />);
                break;
        }
        triggerReplay();
    }, [pathname, setIntroComponent, triggerReplay]);

    return <Intro />;
}
