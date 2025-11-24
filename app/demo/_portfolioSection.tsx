import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import portfolioImg2 from './horsect_2.webp';
import Image from 'next/image';
import { BydLogo } from '@/src/components/svg/byd';
import calienteDeDgo from './caliente_de_durango.webp';

export function PortfolioSection() {
    return (
        <section className="w-full px-6 pt-8">
            <ScrollArea>
                <ul className="relative flex gap-6">
                    {
                        portfolioItems.map((item) => (
                            <li className="flex flex-col gap-4 shrink-0 grow-0 w-3/4 py-6" key={item.title}>
                                <div className="w-full aspect-3/4 overflow-hidden">
                                    <ItemMedia item={item} />
                                    {
                                        item.titleIconAsMainImg
                                            ? item.titleIcon
                                            : null
                                    }
                                </div>
                                <h3 className="text-xl font-secondary uppercase">
                                    <span className={item.titleIcon && !item.titleIconAsMainImg ? "sr-only" : undefined}>{item.title}</span>
                                    {
                                        !item.titleIconAsMainImg && item.titleIcon
                                            ? (item as unknown as any).titleIcon
                                            : null
                                    }
                                </h3>
                                <p className="text-sm text-current/75 w-[60%] uppercase">{item.description}</p>
                            </li>
                        ))
                    }
                </ul>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </section>
    );
}

const portfolioItems = [
    {
        title: "Byd Durango",
        titleIcon: (
            <div className="h-full flex flex-col">
                <BydLogo className="w-full my-auto" />
            </div>
        ),
        titleIconAsMainImg: true,
        description: "Una experiencia digital creada para impulsar la nueva era de movilidad eléctrica en México.",
        src: "",
        sourceType: null,
        mimeType: null,
    } as const,
    {
        title: "Caliente MX",
        titleIcon: (
            <div className="h-full flex flex-col">
                <Image src={calienteDeDgo} alt="Logo de Caliente de Durango" />
            </div>
        ),
        titleIconAsMainImg: true,
        description: "Campañas digitales enfocadas en conversión y presencia local en Durango.",
        src: portfolioImg2,
        sourceType: "image",
        mimeType: null,
    } as const,
    {
        title: "Q&R",
        titleIcon: null,
        titleIconAsMainImg: false,
        description: "Branding y sistema visual profesional para una empresa dedicada a limpieza industrial y residencial.",
        src: "/qnr.webm",
        sourceType: "video",
        mimeType: "video/webm",
    } as const,
    {
        title: "Puedes ser tú",
        titleIcon: null,
        titleIconAsMainImg: false,
        description: "Identidad visual y estrategia digital para tu negocio!.",
        src: "",
        sourceType: null,
        mimeType: "video/mp4",
    } as const
] as const;

function ItemMedia({ item }: { item: typeof portfolioItems[number] }) {
    switch (item.sourceType) {
        case "image":
            return (
                <Image src={item.src} alt={item.description} className="h-full w-full object-cover scale-105" width={720} height={900} />
            );
        case "video":
            return (
                <video
                    className="h-full w-full object-cover scale-105"
                    muted
                    loop
                    autoPlay
                    playsInline>
                    <source src={item.src} type={item.mimeType} />
                </video>
            );
        case null:
            return null;

        default:
            return (
                <div className="h-full w-full bg-primary"> </div>
            );
    }
}
