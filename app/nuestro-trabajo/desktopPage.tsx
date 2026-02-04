'use client';

import { useRef } from "react";
import { TMedia, TMediaImage, TMediaVideo, TSection } from "./sections";
import Image from "next/image";

export default function DesktopPage({ sections, animtePage }: { sections: TSection[], animtePage: boolean }) {
    const mainScrollRef = useRef<HTMLDivElement>(null);
    const section = sections[0];

    return (
        <div className="h-dvh w-dvw grid grid-cols-1 grid-rows-1 [&>section]:col-start-1 [&>section]:row-start-1 bg-neutral-950" ref={mainScrollRef}>
            <section className="h-full w-full grid grid-cols-[30%_60%] grid-rows-1">
                <div className="relative">
                    <div className="absolute z-10 inset-0">
                        <video className="h-full w-full object-cover object-center" autoPlay muted playsInline loop>
                            <source src="/nook_hero.webm" type="video/webm" />
                            <source src="/byd.webm" type="video/webm" />
                        </video>
                    </div>
                    <div className="relative z-10 h-full flex flex-col gap-16 items-center justify-center bg-gray-950/50 px-16 backdrop-blur-lg">
                        <h2 className="text-7xl">{section.title}</h2>
                        <p className="text-current/80">BYD es una empresa de automóviles de alta tecnología que se dedica a la construcción de vehículos de alta velocidad y alta precisión, diseñados para atraer a los clientes más atractivos.</p>
                    </div>
                </div>
                <div className="flex items-center -space-x-4 px-16">
                    {
                        section.media.map(media => <MediaCard media={media} key={media.key} />)
                    }
                </div>
            </section>
        </div>
    );
}

function MediaCard({ media }: { media: TMedia }) {
    return (
        <div className="w-96 rounded-lg bg-gray-950 overflow-hidden z-0" key={media.key}>
            {
                media.kind === "image"
                    ? <MediaImg media={media} />
                    : <MediaVideo media={media} />
            }
        </div>
    )
}

function MediaImg({ media }: { media: TMedia & TMediaImage }) {
    return (
        <Image className="w-full h-full object-cover z-0" src={media.src} alt={media.alt} width={media.width} height={media.height} />
    )
}

function MediaVideo({ media }: { media: TMedia & TMediaVideo }) {
    return (
        <video height={media.height} width={media.width} autoPlay muted playsInline loop>
            <source src={media.src} type={media.mimeType} />
        </video>
    );
}
