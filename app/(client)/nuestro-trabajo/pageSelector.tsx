import { useBreakpoint } from "@/hooks/useBreakpoint";
import MobilePage from "./mobilePage";
import DesktopPage from "./desktopPage";
import { TSection } from "./sections";
import { ContextSafeFunc } from "@gsap/react";

export default function PageSelector({ sections, isShutterDone, contextSafe }: {
    sections: TSection[],
    isShutterDone: boolean,
    contextSafe: ContextSafeFunc,
}) {
    const breakpoint = useBreakpoint();
    let isMobile = false;
    switch (breakpoint) {
        case 'xs':
        case 'sm':
        case 'md':
        case 'lg':
            isMobile = true;
            break;
        case 'xl':
        case '2xl':
        default:
            isMobile = false;
    }

    return (
        isMobile
            ? <MobilePage sections={sections} animatePage={isShutterDone} />
            : <DesktopPage sections={sections} animatePage={isShutterDone} contextSafe={contextSafe} />
    );
}
