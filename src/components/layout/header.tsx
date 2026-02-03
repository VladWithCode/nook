'use client';

import Link from "next/link";
import { NookLogo } from "../svg/nook";
import { NavigationMenu } from "./navigationMenu";
import { useIntroStore } from "@/app/Intro";

export function Header() {
    const triggerReplay = useIntroStore((state) => state.triggerReplay)
    return (
        <header className="fixed top-0 inset-x-0 w-screen z-30 flex items-center md:px-4 md:pt-1 lg:pt-2.5 2xl:pt-4">
            <div className="px-4">
                <Link href="/" className="py-2" onClick={triggerReplay}>
                    <NookLogo className="h-6 md:h-8 2xl:h-12" />
                </Link>
            </div>
            <NavigationMenu />
        </header>
    );
}
