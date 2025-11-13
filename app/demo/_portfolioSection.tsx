import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import portfolioImg1 from './horsect_1.webp';
import portfolioImg2 from './horsect_2.webp';
import Image from 'next/image';

export function PortfolioSection() {
    return (
        <section className="w-full px-6 pt-8">
            <ScrollArea>
                <ul className="relative flex gap-6">
                    {
                        portfolioItems.map((item) => (
                            <li className="flex flex-col gap-6 shrink-0 grow-0 w-3/4 py-6" key={item.title}>
                                <div className="w-full aspect-3/4 overflow-hidden">
                                    {
                                        item.sourceType === "image"
                                            ? <Image src={item.src} alt={item.description} className="h-full w-full object-cover scale-105" width={720} height={900} />
                                            : (
                                                <video className="h-full w-full object-cover scale-105" muted loop autoPlay playsInline>
                                                    <source src={item.src} type="video/mp4" />
                                                </video>
                                            )
                                    }
                                </div>
                                <h3 className="text-xl font-bold uppercase">{item.title}</h3>
                                <p className="text-sm w-[60%] uppercase font-secondary">{item.description}</p>
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
        title: "Patagonia",
        description: "An ecommerce experience driven by Patagonia's brand mission.",
        src: portfolioImg1,
        sourceType: "image",
        mimeType: "image/webp",
    },
    {
        title: "Wilson",
        description: "A century-old sports brand finding it's place in culture.",
        src: portfolioImg2,
        sourceType: "image",
        mimeType: "image/webp",
    },
    {
        title: "Google Store",
        description: "An ecommerce experience helping Google bring its hardware to people across the globe.",
        src: "/horsect_3.mp4",
        sourceType: "video",
        mimeType: "video/mp4",
    },
] as const;
