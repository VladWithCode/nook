import { useEffect, useEffectEvent, useRef } from "react";

const ShutterDuration = 1.5; // seconds

export function Shutter({ isIntroDone, setShutterDone }: { isIntroDone: boolean, setShutterDone: React.Dispatch<React.SetStateAction<boolean>> }) {
    const shutterContainerRef = useRef<HTMLDivElement>(null);
    const setShutterDoneEvt = useEffectEvent(setShutterDone);

    useEffect(() => {
        if (!isIntroDone) {
            // Allow for shutter animation to replay if intro replays
            shutterContainerRef.current?.classList.remove('animate');
            setShutterDoneEvt(false);
            return;
        }

        const timeout = setTimeout(() => {
            setShutterDoneEvt(true);
            // Will start the page animation after a third of the shutter animation
        }, ShutterDuration / 3 * 1000);
        shutterContainerRef.current?.classList.add('animate');

        return () => {
            clearTimeout(timeout);
        };
    }, [isIntroDone]);

    return (
        <div
            className="fixed inset-0 z-60 pointer-events-none shutter"
            style={{
                "--flaps": 6,
                "--shutter-duration": `${ShutterDuration}s`,
            } as React.CSSProperties}
            ref={shutterContainerRef}
        >
            <div className="flap" style={{ "--i": 6 } as React.CSSProperties}></div>
            <div className="flap" style={{ "--i": 5 } as React.CSSProperties}></div>
            <div className="flap" style={{ "--i": 4 } as React.CSSProperties}></div>
            <div className="flap" style={{ "--i": 3 } as React.CSSProperties}></div>
            <div className="flap" style={{ "--i": 2 } as React.CSSProperties}></div>
            <div className="flap" style={{ "--i": 1 } as React.CSSProperties}></div>
        </div>
    );
}
