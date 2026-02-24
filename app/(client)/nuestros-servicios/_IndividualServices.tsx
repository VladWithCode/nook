'use client';

import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";

const INITIAL_VISIBLE = 4;

interface Service {
    title: string;
    price: number;
}

interface IndividualServicesProps {
    serviceList: Service[];
    gradients: string[];
}

function getGradient(index: number, gradients: string[]) {
    return gradients[index % gradients.length];
}

function ServiceItem({ service, index, gradients }: { service: Service; index: number; gradients: string[] }) {
    return (
        <li className={cn("w-full aspect-2/1 xl:aspect-square flex flex-col justify-between gap-y-3 p-6 rounded-lg", getGradient(index, gradients))}>
            <p className="text-sm font-secondary font-bold">{service.title}</p>
            <p className="text-xl tracking-wide">{formatPrice(service.price)} MXN</p>
        </li>
    );
}

export function IndividualServices({ serviceList, gradients }: IndividualServicesProps) {
    const [isOpen, setIsOpen] = useState(false);
    const showButton = serviceList.length > INITIAL_VISIBLE;
    const visibleServices = serviceList.slice(0, INITIAL_VISIBLE);

    return (
        <section className="p-8 md:p-12 md:gap-y-10 lg:p-18 lg:gap-y-16 xl:py-24 xl:gap-y-16 space-y-6 2xl:space-y-16 xl:max-w-7xl mx-auto">
            <h3 className="text-lg text-current/80 2xl:text-3xl">Servicios individuales</h3>

            <div className="xl:hidden">
                <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-3">
                    <ul className="grid grid-cols-1 gap-3 text-gray-100 md:grid-cols-2 2xl:grid-cols-4">
                        {visibleServices.map((svc, i) => (
                            <ServiceItem
                                key={svc.title}
                                service={svc}
                                index={i}
                                gradients={gradients}
                            />
                        ))}
                    </ul>

                    <CollapsibleContent>
                        <ul className="grid grid-cols-1 gap-3 text-gray-100 md:grid-cols-2 2xl:grid-cols-4">
                            {serviceList.slice(INITIAL_VISIBLE).map((svc, i) => (
                                <ServiceItem
                                    key={svc.title}
                                    service={svc}
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
                <ul className="grid grid-cols-1 gap-3 text-gray-100 xl:grid-cols-4">
                    {serviceList.map((svc, i) => (
                        <ServiceItem
                            key={svc.title}
                            service={svc}
                            index={i}
                            gradients={gradients}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}
