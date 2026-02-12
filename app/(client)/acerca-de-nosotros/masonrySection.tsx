import Image, { StaticImageData } from "next/image";
import { useEffect, useEffectEvent, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ChevronsDown } from "lucide-react";
import { ContextSafeFunc } from "@gsap/react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { cols, TCell } from "./gridData";

export function MasonrySection({ isIntroDone, contextSafe, setShowPage }: {
    isIntroDone: boolean,
    setShowPage: React.Dispatch<React.SetStateAction<boolean>>,
    contextSafe: ContextSafeFunc,
}) {
    const scrollSectionRef = useRef<HTMLDivElement>(null);
    const [viewportWidth, setViewportWidth] = useState(0);
    const colGap = 20; // Always 20px
    const [containerTranslate, setContainerTranslate] = useState('0');
    const [colCount, setColCount] = useState(3);
    const [colWidth, setColWidth] = useState(0);
    const [videoMaxWidth, setVideoMaxWidth] = useState("100%");

    useLayoutEffect(() => {
        setViewportWidth(window.innerWidth);

        let resizeTimeout: NodeJS.Timeout;
        const resizeEvt = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                setViewportWidth(window.innerWidth);
            }, 300);
        };
        window.addEventListener('resize', resizeEvt);

        return () => {
            clearTimeout(resizeTimeout);
            window.removeEventListener('resize', resizeEvt);
        };
    }, []);

    useLayoutEffect(() => {
        if (!viewportWidth) return;

        let colCount = 3;
        let colWidth: number;
        let containerTranslate: string;

        if (viewportWidth >= breakpoints.sm) {
            setVideoMaxWidth("80%");
        } else {
            setVideoMaxWidth("100%");
        }

        if (viewportWidth < breakpoints.md) {
            colCount = 3;
            colWidth = 100 / (colCount - 1);
            containerTranslate = ((viewportWidth * colWidth / 100) / 2 + colGap).toFixed(2);
        } else if (viewportWidth < breakpoints.lg) {
            colCount = 5;
            colWidth = 100 / (colCount - 1);
            containerTranslate = ((viewportWidth * colWidth / 100) / 2 + (colGap * 2)).toFixed(2);
        } else {
            colCount = 7;
            colWidth = 100 / (colCount - 1);
            containerTranslate = ((viewportWidth * colWidth / 100) / 2 + (colGap * 3)).toFixed(2);
        }

        setColCount(colCount);
        setColWidth(colWidth);
        setContainerTranslate(containerTranslate);
    }, [viewportWidth]);

    /* eslint-disable */
    const animateSection = contextSafe((videoMaxWidth: string) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scrollSectionRef.current,
                start: "top top",
                end: "+=250%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    if (Number(self.progress.toFixed(2)) >= 0.90) {
                        setShowPage(true);
                    } else {
                        setShowPage(false);
                    }
                },
            }
        });

        tl.to('[data-animatable-column="left"]', {
            x: "-6rem",
            opacity: 0,
            y: "-2.5rem",
        })
            .to('[data-animatable-column="center"] [data-animatable-cell="up"]', {
                opacity: 0,
                y: "-6rem",
            }, "<")
            .to('[data-animatable-column="center"] [data-animatable-cell="down"]', {
                opacity: 0,
                y: "6rem",
            }, "<")
            .to('[data-animatable-column="right"]', {
                x: "6rem",
                opacity: 0,
                y: "-2.5rem",
            }, "<")
            .to('[data-animatable-video]', {
                aspectRatio: "16 / 9",
                width: videoMaxWidth,
                marginBottom: "2rem",
            }, "<")
            .to('[data-animatable-heading]', {
                opacity: 1,
                y: "0rem",
            }, "<15%");
    })
    /* eslint-enable */

    const animateEvt = useEffectEvent(animateSection);

    useEffect(() => {
        if (!isIntroDone) {
            return;
        }

        animateEvt(videoMaxWidth);
    }, [isIntroDone, videoMaxWidth])

    return (
        <section
            className="relative z-0 w-screen h-screen overflow-hidden"
            ref={scrollSectionRef}
            style={{
                "--translate-container": `${containerTranslate}px`,
                "--col-count": `${colCount}`,
                "--col-width": `${colWidth}vw`,
                "--col-gap": `${colGap}px`,
            } as React.CSSProperties}
        >
            <div className="fixed inset-0 z-0 h-full w-full grid grid-cols-[repeat(var(--col-count),var(--col-width))] grid-rows-[100%] gap-5 py-4 pointer-events-none -translate-x-(--translate-container)">
                <GridWrapper colCount={colCount} />
            </div>
            <div className="relative z-10 h-full grid grid-cols-1 grid-rows-1 justify-items-center items-end mt-auto *:col-span-full *:row-span-full">
                <div className="flex flex-col items-center justify-center px-5">
                    <div className="flex flex-col items-center justify-center opacity-0 translate-y-12 px-8" data-animatable-heading>
                        <h1 className="text-4xl text-center md:text-[5vw] xl:text-5xl">
                            <span className="text-5xl lg:text-[6.5vw] xl:text-6xl">NÖOK: </span>
                            La agencia de publicidad para ti.
                        </h1>
                    </div>
                    <div
                        className="w-(--col-width) aspect-3/4 bg-red-800 rounded-lg mt-12 mb-20 overflow-hidden animated-grid-cell"
                        data-animatable-cell
                        data-animatable-video
                    >
                        <video className="h-full w-full object-cover rounded-lg bg-gray-800" autoPlay loop muted playsInline>
                            <source src="/nook_hero.webm" type="video/webm" />
                        </video>
                    </div>
                </div>
            </div>
        </section>
    );
}

function GridWrapper({ colCount }: {
    colCount: number,
}) {
    const leftCols = useMemo(() => {
        if (colCount === 3) return [cols.left[0]];
        else if (colCount === 5) return [cols.left[1], cols.left[0]];
        else return [cols.left[2], cols.left[1], cols.left[0]];
    }, [colCount]);
    const centerCols = useMemo(() => {
        return [cols.center[0]];
    }, []);
    const rightCols = useMemo(() => {
        if (colCount === 3) return [cols.right[0]];
        else if (colCount === 5) return [cols.right[0], cols.right[1]];
        else return [cols.right[0], cols.right[1], cols.right[2]];
    }, [colCount]);

    return (
        <>
            {leftCols.map((col) => (
                <GridColumn colSide={col.position} key={col.key}>
                    {col.cells.map((cell) => (
                        <GridCell cellData={cell} animateTo={cell.animateTo || col.animateTo} key={cell.key} />
                    ))}
                </GridColumn>
            ))}
            {centerCols.map((col) => (
                <GridColumn colSide={col.position} key={col.key}>
                    {col.cells.map((cell) => (
                        <GridCell cellData={cell} animateTo={cell.animateTo || col.animateTo} key={cell.key} />
                    ))}
                </GridColumn>
            ))}
            {rightCols.map((col) => (
                <GridColumn colSide={col.position} key={col.key}>
                    {col.cells.map((cell) => (
                        <GridCell cellData={cell} animateTo={cell.animateTo || col.animateTo} key={cell.key} />
                    ))}
                </GridColumn>
            ))}
        </>
    );
}

function GridCell({ cellData, animateTo }: {
    cellData: TCell,
    animateTo: "left" | "up" | "down" | "right",
}) {
    const { heightRatio } = cellData;

    if (cellData.kind === "empty") return (
        <div className="grow-0 shrink-0 aspect-3/4 rounded-lg w-full overflow-hidden animated-grid-cell animated-grid-cell-center" />
    );

    if (cellData.kind === "component") return cellData.component;

    return (
        <div
            style={{ "--basis": `${heightRatio * 100}%` } as React.CSSProperties}
            className="grow shrink basis-(--basis) rounded-lg w-full overflow-hidden animated-grid-cell animated-grid-cell-left"
            data-cell
            data-animatable-cell={animateTo}
        >
            <div className="w-full h-full bg-gray-800">
                <Image className="w-full h-full object-cover" src={cellData.src} alt={cellData.alt} />
            </div>
        </div>
    );
}

function GridColumn({ children, colSide, className }: {
    colSide: "left" | "center" | "right",
    className?: string,
} & React.PropsWithChildren) {
    return (
        <div
            className={cn(
                "w-full flex flex-col gap-5 h-full",
                className,
            )}
            data-animatable-column={colSide}
        >
            {children}
        </div>
    );
}

const breakpoints = {
    sm: 768,
    md: 1024,
    lg: 1536,
} as const;
