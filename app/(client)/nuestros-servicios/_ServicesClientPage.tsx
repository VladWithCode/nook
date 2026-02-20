'use client';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, PlayCircle } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { use, useRef } from "react";
import basicPlan from "./nook_plan_1.webp";
import enterprisePlan from "./nook_plan_2.webp";
import advancedPlan from "./nook_plan_3.webp";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ServicesContent, ServicePlan } from "@/types/content";

interface ServicesClientPageProps {
    contentPromise: Promise<ServicesContent>;
}

const planImageMap: Record<string, StaticImageData> = {
    "/nook_plan_1.webp": basicPlan,
    "/nook_plan_2.webp": enterprisePlan,
    "/nook_plan_3.webp": advancedPlan,
};

function getPlanImage(src: string): StaticImageData | undefined {
    return planImageMap[src];
}

export function ServicesClientPage({ contentPromise }: ServicesClientPageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const content = use<ServicesContent>(contentPromise);

    useGSAP(() => {
        gsap.to(".marquee h1", {
            duration: 2.5,
            x: "-=100vw",
            ease: "none",
            repeat: -1,
        })
    }, { scope: containerRef, dependencies: [] });

    const getPlanTheme = (theme: ServicePlan["theme"]) => {
        switch (theme) {
            case "dark": return "bg-neutral-900 [&_.showcase-img]:object-center [&_.cta]:bg-main";
            case "special": return "bg-special [&_.showcase-img]:object-center";
            default: return "bg-main [&_.showcase-img]:object-right";
        }
    };

    return (
        <>
            <div className="text-foreground" ref={containerRef}>
                <section className="relative z-10 h-svh overflow-hidden">
                    <div className="absolute inset-0 h-full w-full z-0">
                        <video src={content.heroVideo} className="w-full h-full object-cover" muted autoPlay playsInline loop></video>
                        <div className="absolute z-10 top-1/2 left-1/2 -translate-1/2 flex flex-col justify-center text-stone-50">
                            <button className="">
                                <PlayCircle className="size-20" strokeWidth="0.5" />
                            </button>
                            <p className="text-center font-secondary tracking-widest uppercase">
                                <span>Visita</span>
                            </p>
                        </div>
                    </div>
                </section>
                <section className="relative z-10">
                    <div className="absolute -bottom-6 inset-x-0 z-10 w-full flex items-center text-6xl lg:text-7xl overflow-hidden marquee lg:-bottom-8">
                        <h1 data-animate-marquee className="w-screen font-extrabold uppercase text-center 2xl:w-[50vw]">{content.marqueeText}</h1>
                        <h1 data-animate-marquee className="w-screen font-extrabold uppercase text-center 2xl:w-[50vw]">{content.marqueeText}</h1>
                        <h1 data-animate-marquee className="w-screen font-extrabold uppercase text-center 2xl:w-[50vw]">{content.marqueeText}</h1>
                        <h1 data-animate-marquee className="w-screen font-extrabold uppercase text-center 2xl:w-[50vw]">{content.marqueeText}</h1>
                        <h1 data-animate-marquee className="w-screen font-extrabold uppercase text-center hidden 2xl:block 2xl:w-[50vw]">{content.marqueeText}</h1>
                    </div>
                </section>
                <section className="relative bg-main text-stone-700 px-8 py-12 z-0 md:p-16 lg:p-20 xl:p-24">
                    <div className="mx-auto space-y-6 2xl:w-7xl">
                        <p className="text-2xl font-extrabold font-secondary uppercase sm:max-w-3/5">{content.introText1}</p>
                        <Link href="/" className="flex gap-2.5 tracking-wider uppercase">{content.ctaText} <ArrowRight /></Link>
                    </div>
                </section>
                <section className="relative bg-stone-900 text-stone-50 px-6 py-12 space-y-6 z-0 md:p-16 lg:p-20 xl:p-24">
                    <div className="2xl:w-7xl 2xl:mx-auto">
                        <p className="text-2xl font-extrabold font-secondary uppercase pr-4 text-end ml-auto sm:max-w-3/5">{content.introText2}</p>
                    </div>
                </section>
                <section className="flex flex-col items-center p-8 gap-y-8 md:p-12 md:gap-y-10 lg:p-18 lg:gap-y-16 xl:py-24 xl:gap-y-16 2xl:flex-row 2xl:items-stretch 2xl:gap-x-6">
                    {content.plans.map((plan) => (
                        <PlanCard
                            key={plan.id}
                            className={getPlanTheme(plan.theme)}
                            title={plan.title}
                            features={plan.features}
                            price={plan.price}
                            img={getPlanImage(plan.image)}
                            imgAlt={`Imagen de ${plan.title}`}
                            ctaText={plan.ctaText}
                        />
                    ))}
                </section>
                <section className="flex flex-col justify-center items-center gap-8 bg-gray-800 px-6 py-20 xl:flex-row">
                    <button className="bg-main px-8 py-2 rounded-full text-xl text-stone-50 uppercase xl:py-3 xl:px-12">Contratar ahora</button>
                    <button className="bg-stone-50 px-8 py-2 rounded-full text-xl text-stone-900 uppercase xl:py-3 xl:px-12">Volver al inicio</button>
                </section>
            </div>
        </>
    );
}

function PlanCard({ title, features, price, img, imgAlt, imgLeft, className, ctaText }: {
    title: string,
    features: string[],
    price: string,
    img?: StaticImageData,
    imgAlt: string,
    imgLeft?: boolean,
    className?: string,
    ctaText?: string,
}) {
    return (
        <div className={cn(
            "bg-main text-stone-50 rounded-lg overflow-hidden sm:w-4/5 sm:aspect-square md:grid md:grid-cols-3 md:aspect-auto xl:grid-cols-4",
            className,
        )}>
            <div className="h-full relative z-10 flex flex-col space-y-8 p-6 md:col-span-2 md:row-start-1 md:p-7 lg:p-9 xl:p-10">
                <h2 className="text-4xl font-secondary font-extrabold uppercase mb-6">{title}</h2>
                <ul className="space-y-3 list-disc list-inside text-start">
                    {features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                    ))}
                </ul>
                <p className="text-4xl mt-4">{price}</p>
                <Button className="cta mt-auto md:text-base md:p-5" asChild>
                    <Link href="/contacto">{ctaText || "Contratar ahora"}</Link>
                </Button>
            </div>
            <div className={cn("hidden md:block md:row-start-1 xl:col-span-2", imgLeft && "md:col-start-1 xl:col-start-1")}>
                {img && <Image src={img} alt={imgAlt} width={948} height={948} className="showcase-img w-full h-full object-cover" />}
            </div>
        </div>
    );
}
