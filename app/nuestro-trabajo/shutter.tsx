import { useEffect, useEffectEvent, useRef } from "react";

export function Shutter({ isIntroDone, setShutterDone }: { isIntroDone: boolean, setShutterDone: React.Dispatch<React.SetStateAction<boolean>> }) {
    const shutterContainerRef = useRef<HTMLDivElement>(null);
    const setShutterDoneEvt = useEffectEvent(setShutterDone);

    useEffect(() => {
        if (!isIntroDone) {
            shutterContainerRef.current?.classList.remove('animate');
            return;
        }

        const onAnimationEnd = () => {
            setShutterDoneEvt(true);
        };
        shutterContainerRef.current?.addEventListener('animationend', onAnimationEnd);
        shutterContainerRef.current?.classList.add('animate');

        return () => {
            shutterContainerRef.current?.removeEventListener('animationend', onAnimationEnd);
        };
    }, [isIntroDone]);

    return (
        <div className="fixed inset-0 z-60 pointer-events-none shutter" style={{ "--flaps": 6 } as React.CSSProperties} ref={shutterContainerRef}>
            <div className="flap" style={{ "--i": 6 } as React.CSSProperties}></div>
            <div className="flap" style={{ "--i": 5 } as React.CSSProperties}></div>
            <div className="flap" style={{ "--i": 4 } as React.CSSProperties}></div>
            <div className="flap" style={{ "--i": 3 } as React.CSSProperties}></div>
            <div className="flap" style={{ "--i": 2 } as React.CSSProperties}></div>
            <div className="flap" style={{ "--i": 1 } as React.CSSProperties}></div>
        </div>
    );
}
