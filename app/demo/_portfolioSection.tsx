import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import portfolioImg1 from './horsect_1.webp';
import portfolioImg2 from './horsect_2.webp';
import Image from 'next/image';
import { BydLogo } from '@/src/components/svg/byd';

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
                                </div>
                                <h3 className="text-xl font-secondary uppercase">
                                    <span className={item.titleIcon ? "sr-only" : undefined}>{item.title}</span>
                                    {
                                        item.titleIcon
                                            ? item.titleIcon
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
        // titleIcon: <BydLogo className="h-6" />,
        titleIcon: null,
        description: "Una experiencia digital creada para impulsar la nueva era de movilidad eléctrica en México.",
        src: portfolioImg1,
        sourceType: "image",
        mimeType: "image/webp",
    } as const,
    {
        title: "Caliente MX",
        titleIcon: null,
        description: "Campañas digitales enfocadas en conversión y presencia local en Durango.",
        src: portfolioImg2,
        sourceType: "image",
        mimeType: "image/webp",
    } as const,
    {
        title: "Q&R",
        titleIcon: null,
        description: "Branding y sistema visual profesional para una empresa dedicada a limpieza industrial y residencial.",
        src: "/horsect_3.mp4",
        sourceType: "video",
        mimeType: "video/mp4",
    } as const,
    {
        title: "Puedes ser tú",
        titleIcon: null,
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
                <video className="h-full w-full object-cover scale-105" muted loop autoPlay playsInline>
                    <source src={item.src} type={item.mimeType} />
                </video>
            );

        default:
            return (
                <div className="h-full w-full bg-primary"> </div>
            );
    }
}
