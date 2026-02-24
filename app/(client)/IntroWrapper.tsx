"use client";
import { usePathname } from "next/navigation";
import Intro, { MainIntroAnimation, useIntroStore } from "./Intro";
import { useEffect, useEffectEvent } from "react";

export default function IntroWrapper() {
    const pathname = usePathname();
    const setIntroComponent = useIntroStore((state) => state.setIntroComponent);
    const triggerReplay = useIntroStore((state) => state.triggerReplay);
    const introComponentEvt = useEffectEvent((c: React.ReactElement) => {
        setIntroComponent(c);
    });
    const replayEvt = useEffectEvent(() => {
        triggerReplay();
    });
    useEffect(() => {
        switch (pathname) {
            case "/proximamente":
                introComponentEvt(<MainIntroAnimation />);
                break;
            case "/diseno-y-creatividad":
                introComponentEvt(<MainIntroAnimation />);
                break;
            case "/produccion-y-medios":
                introComponentEvt(<MainIntroAnimation />);
                break;
            case "/":
            default:
                introComponentEvt(<MainIntroAnimation />);
                break;
        }
        replayEvt();
    }, [pathname]);

    return <Intro />;
}
