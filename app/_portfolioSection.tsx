import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import portfolioImg2 from './horsect_2.webp';
import Image from 'next/image';
import calienteDeDgo from './caliente_de_durango.webp';
import Link from 'next/link';

export function PortfolioSection() {
    return (
        <section className="w-full px-6 pt-8">
            <ScrollArea>
                <ul className="relative flex gap-6 md:gap-9">
                    {
                        portfolioItems.map((item) => (
                            <li className="flex flex-col gap-4 shrink-0 grow-0 w-3/4 py-6 px-px md:w-1/2" key={item.title}>
                                <div className="w-full aspect-3/4 rounded-sm overflow-hidden shadow-lg lg:rounded-lg">
                                    <ItemMedia item={item} />
                                    {
                                        item.titleIconAsMainImg
                                            ? item.titleIcon
                                            : null
                                    }
                                </div>
                                <PortfolioLink item={item}>
                                    <h3 className="text-xl uppercase lg:text-3xl lg:pt-4">
                                        <span className={item.titleIcon && !item.titleIconAsMainImg ? "sr-only" : undefined}>{item.title}</span>
                                        {
                                            !item.titleIconAsMainImg && item.titleIcon
                                                ? (item as typeof portfolioItems[number]).titleIcon
                                                : null
                                        }
                                    </h3>
                                </PortfolioLink>
                                <p className="text-sm text-current/60 font-secondary font-medium uppercase lg:text-base">{item.description}</p>
                            </li>
                        ))
                    }
                </ul>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </section>
    );
}

function PortfolioLink({ children, item }: React.PropsWithChildren<{ item: typeof portfolioItems[number] }>) {
    switch (item.href) {
        case "/nuestros-servicios":
            return (
                <Link href={item.href}>
                    {children}
                </Link>
            );
        default:
            return (
                <a href={item.href} target="_blank">
                    {children}
                </a>
            );
    }
}

const portfolioItems = [
    {
        title: "BYD Durango",
        // titleIcon: (
        //     <div className="h-full flex flex-col p-4">
        //         <BydLogo className="w-full my-auto" />
        //     </div>
        // ),
        titleIcon: null,
        titleIconAsMainImg: false,
        description: "Una experiencia digital creada para impulsar la nueva era de movilidad eléctrica en México.",
        src: "/byd.webm",
        sourceType: "video",
        mimeType: "video/webm",
        href: "https://www.byd.com/mx"
    } as const,
    {
        title: "Caliente MX",
        titleIcon: (
            <div className="h-full flex flex-col p-4">
                <Image className="w-full my-auto" src={calienteDeDgo} alt="Logo de Caliente de Durango" />
            </div>
        ),
        titleIconAsMainImg: true,
        description: "Campañas digitales enfocadas en conversión y presencia local en Durango.",
        src: portfolioImg2,
        sourceType: null,
        mimeType: null,
        href: "https://www.instagram.com/calientedgo/"
    } as const,
    {
        title: "Q&R",
        titleIcon: null,
        titleIconAsMainImg: false,
        description: "Branding y sistema visual profesional para una empresa dedicada a limpieza industrial y residencial.",
        src: "/qnr.webm",
        sourceType: "video",
        mimeType: "video/webm",
        href: "https://qrestrellas.com/"
    } as const,
    {
        title: "Puedes ser tú",
        titleIcon: null,
        titleIconAsMainImg: false,
        description: "Identidad visual y estrategia digital para tu negocio!.",
        src: "",
        sourceType: "",
        mimeType: "",
        href: "/nuestros-servicios"
    } as const
] as const;

function ItemMedia({ item }: { item: typeof portfolioItems[number] }) {
    switch (item.sourceType as 'image' | 'video' | null) {
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
                    <source src={item.src as string} type={item.mimeType as string} />
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
