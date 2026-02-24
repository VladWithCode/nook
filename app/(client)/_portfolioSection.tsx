import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Image from 'next/image';
import Link from 'next/link';
import { HomeBigCard } from '@/types/content';

export function PortfolioSection({ items }: { items: HomeBigCard[] }) {
    return (
        <section className="w-full px-6 pt-8 xl:w-7xl xl:mx-auto 2xl:py-32" data-portfolio-section>
            <ScrollArea>
                <ul className="relative flex gap-6 md:gap-9">
                    {
                        items.map((item) => (
                            <li className="flex flex-col gap-4 shrink-0 grow-0 w-3/4 py-6 px-px md:w-1/2 xl:w-1/3" key={item.title}>
                                <div className="flex items-center w-full aspect-3/4 rounded-sm overflow-hidden shadow-lg lg:rounded-lg">
                                    <ItemMedia item={item} />
                                </div>
                                <PortfolioLink link={item.link}>
                                    <h3 className="text-xl uppercase lg:text-3xl lg:pt-4">{item.title}</h3>
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

function PortfolioLink({ children, link }: React.PropsWithChildren<{ link: string }>) {
    if (!link) {
        return children;
    }

    if (link.startsWith("https://")) {
        return (
            <a href={link} target="_blank">
                {children}
            </a>
        );
    }

    return (
        <Link href={link}>
            {children}
        </Link>
    );
}

function ItemMedia({ item }: { item: HomeBigCard }) {
    switch (item.mediaKind) {
        case "image":
            return (
                <Image src={item.media} alt={item.description} className="h-auto w-full object-cover" width={720} height={900} />
            );
        case "video":
            return (
                <video
                    className="h-full w-full object-cover scale-105"
                    muted
                    loop
                    autoPlay
                    playsInline>
                    <source src={item.media} />
                </video>
            );
        case null:
            return null;

        default:
            return (
                <div className="h-full w-full bg-primary"></div>
            );
    }
}
