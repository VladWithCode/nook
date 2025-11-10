import { NookClipPath, NookLogo } from "../svg/nook";
import "./logo.css";

export function AnimatedLogoLoad() {
    return (
        <div className="nook-logo-load relative w-64 z-0 overflow-hidden">
            <NookLogo className="w-full invisible" />
            <div className="absolute inset-0 w-full h-full bg-white"></div>
            <NookClipPath />
        </div>
    );
}
