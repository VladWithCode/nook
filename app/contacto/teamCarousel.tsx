import { horizontalLoop } from "@/lib/animationUtils";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export function TeamCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const items = containerRef.current?.querySelectorAll("[data-team-carousel-item]");
        if (items) {
            horizontalLoop(items, {
                repeat: -1,
            })
        }
    }, { scope: containerRef });

    return (
        <div className="relative flex rounded-md overflow-hidden" ref={containerRef}>
            {
                team.map(i => (
                    <div className={cn(
                        "aspect-square h-[30vw]",
                        i % 2 === 0 ? "bg-stone-800/90" : "bg-gray-800/90",
                    )} key={i} data-team-carousel-item>
                    </div>
                ))
            }
        </div>
    );
}

const team = [0, 1, 2, 3, 4, 5];
