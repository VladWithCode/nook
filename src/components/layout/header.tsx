'use client';

import Link from "next/link";
import { NookLogo } from "../svg/nook";
import { NavigationMenu } from "./navigationMenu";
import { useIntroStore } from "@/app/Intro";
import { useEffect, useState } from "react";

export function Header() {
    const triggerReplay = useIntroStore((state) => state.triggerReplay)
    const [hasGlassEffect, setHasGlassEffect] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;

            // Check if we're on the main page and look for PortfolioSection
            const portfolioSection = document.querySelector("[data-portfolio-section]");

            if (portfolioSection) {
                // On main page - check if we've scrolled to PortfolioSection
                const portfolioRect = portfolioSection.getBoundingClientRect();
                const hasScrolledToPortfolio = portfolioRect.top <= viewportHeight * 0.2;
                setHasGlassEffect(hasScrolledToPortfolio);
            } else {
                // On other pages - check if we've scrolled 20% of viewport height
                const hasScrolled20Percent = scrollY > viewportHeight * 0.2;
                setHasGlassEffect(hasScrolled20Percent);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 inset-x-0 w-screen z-30 flex items-center pb-3 md:px-4 md:pt-1 lg:pt-2.5 2xl:pt-4 transition-all duration-300 ${hasGlassEffect
            ? 'bg-black/20 backdrop-blur-md border-b border-white/10 text-white'
            : ''
            }`}>
            <div className="px-4">
                <Link href="/" className="py-2" onClick={triggerReplay}>
                    <NookLogo className="h-6 md:h-8 2xl:h-12" />
                </Link>
            </div>
            <NavigationMenu />
        </header>
    );
}
