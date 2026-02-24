'use client';

import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";

const INITIAL_VISIBLE = 4;

interface Pack {
    title: string;
    price: number;
    omitFormat?: boolean;
}

interface PackagesProps {
    packs: Pack[];
    gradients: string[];
}

function getGradient(index: number, gradients: string[]) {
    return gradients[index % gradients.length];
}

function PackageItem({ pack, index, gradients }: { pack: Pack; index: number; gradients: string[] }) {
    const gradientClass = getGradient(index, gradients).replace("bg-gradient-to-br", "bg-gradient-to-r");
    
    return (
        <li className="w-full aspect-4/1 flex items-end justify-between gap-3 p-6 relative">
            <p className="text-current/80 font-secondary">{pack.title}</p>
            <p className="text-2xl tracking-wide">
                {pack.omitFormat ? pack.price : formatPrice(pack.price)} MXN
            </p>
            <div className={cn("absolute bottom-0 left-0 right-0 h-0.5", gradientClass)} />
        </li>
    );
}

export function Packages({ packs, gradients }: PackagesProps) {
    const [isOpen, setIsOpen] = useState(false);
    const showButton = packs.length > INITIAL_VISIBLE;
    const visiblePacks = packs.slice(0, INITIAL_VISIBLE);

    return (
        <section className="p-8 md:p-12 lg:p-18 xl:py-24 space-y-6 2xl:space-y-8 xl:max-w-7xl mx-auto">
            <h3 className="text-lg text-current/80 2xl:text-3xl">Paquetes</h3>

            <div className="xl:hidden">
                <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-3">
                    <ul className="grid grid-cols-1 gap-3 xl:grid-cols-2 xl:gap-x-12">
                        {visiblePacks.map((pack, i) => (
                            <PackageItem
                                key={pack.title}
                                pack={pack}
                                index={i}
                                gradients={gradients}
                            />
                        ))}
                    </ul>

                    <CollapsibleContent>
                        <ul className="grid grid-cols-1 gap-3 xl:grid-cols-2 xl:gap-x-12">
                            {packs.slice(INITIAL_VISIBLE).map((pack, i) => (
                                <PackageItem
                                    key={pack.title}
                                    pack={pack}
                                    index={INITIAL_VISIBLE + i}
                                    gradients={gradients}
                                />
                            ))}
                        </ul>
                    </CollapsibleContent>

                    {showButton && (
                        <CollapsibleTrigger asChild>
                            <button className="text-sm text-current/60 underline">
                                {isOpen ? "Ver menos" : "Ver más"}
                            </button>
                        </CollapsibleTrigger>
                    )}
                </Collapsible>
            </div>

            <div className="hidden xl:block">
                <ul className="grid grid-cols-1 gap-3 xl:grid-cols-2 xl:gap-x-12">
                    {packs.map((pack, i) => (
                        <PackageItem
                            key={pack.title}
                            pack={pack}
                            index={i}
                            gradients={gradients}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}
