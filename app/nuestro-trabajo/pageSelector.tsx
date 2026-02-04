import { useBreakpoint } from "@/hooks/useBreakpoint";
import MobilePage from "./mobilePage";
import DesktopPage from "./desktopPage";
import { TSection } from "./sections";

export default function PageSelector({ sections, isShutterDone }: { sections: TSection[], isShutterDone: boolean }) {
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
            : <DesktopPage sections={sections} animtePage={isShutterDone} />
    );
}
