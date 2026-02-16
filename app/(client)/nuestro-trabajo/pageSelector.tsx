import { useBreakpoint } from "@/hooks/useBreakpoint";
import MobilePage from "./mobilePage";
import DesktopPage from "./desktopPage";
import { TSection } from "./sections";
import { ContextSafeFunc } from "@gsap/react";
import { PortfolioContent } from "@/types/content";
import { use } from "react";

export default function PageSelector({ isShutterDone, contextSafe, contentPromise }: {
    isShutterDone: boolean,
    contextSafe: ContextSafeFunc,
    contentPromise: Promise<PortfolioContent>
}) {
    const content = use(contentPromise)
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
            ? <MobilePage content={content} animatePage={isShutterDone} />
            : <DesktopPage content={content} animatePage={isShutterDone} contextSafe={contextSafe} />
    );
}
