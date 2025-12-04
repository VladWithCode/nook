'use client';

import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { NookLogo } from "../svg/nook";
import { DuckSVG } from "../svg/duck";

export type TNavigationMenuProps = {
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
};

export function NavigationMenu({ }: TNavigationMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const onNavigationCb = useCallback(() => setIsOpen(false), [setIsOpen])

    return (
        <>
            <div className="relative z-60 ml-auto pr-2 py-2">
                <Button className="text-inherit" size="icon" variant="ghost" onClick={() => setIsOpen((isOpen) => !isOpen)}>
                    <MenuIcon className="size-6 stroke-current" />
                </Button>
            </div>
            {isOpen ? (
                <div className="fixed inset-0 z-50 flex flex-col items-center gap-20 bg-main text-gray-50 px-12 py-[25vw]">
                    <Link href="/" onClick={onNavigationCb}>
                        <NookLogo className="h-24" />
                    </Link>
                    <nav>
                        <ul className="text-3xl text-center capitalize space-y-6">
                            {/* <li> */}
                            {/*     <Link href="/" onClick={onNavigationCb}>Inicio</Link> */}
                            {/* </li> */}
                            <li>
                                <Link href="/diseno-y-creatividad" onClick={onNavigationCb}>Diseño y Creatividad</Link>
                            </li>
                            <li>
                                <Link href="/produccion-y-medios" onClick={onNavigationCb}>Producción y Medios</Link>
                            </li>
                            <li>
                                <Link href="/estrategia-y-experencia" onClick={onNavigationCb}>Estrategia y Experiencia</Link>
                            </li>
                            <li>
                                <Link href="/descargas-y-activaciones" onClick={onNavigationCb}>Descargas y Activaciones</Link>
                            </li>
                        </ul>
                    </nav>
                    <nav>
                        <ul className="flex gap-2 text-sm font-secondary uppercase underline underline-offset-2">
                            <li>
                                <Link href="/privacidad" onClick={onNavigationCb}>Política de Privacidad</Link>
                            </li>
                            <li>
                                <Link href="/terminos" onClick={onNavigationCb}>Terminos de uso</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="absolute right-0 bottom-12 z-0">
                        <DuckSVG className="h-full w-full transform-3d transform-[rotateY(180deg)_rotateZ(40deg)_translate(-6%,50%)] text-stone-200/20" />
                    </div>
                </div>
            ) : null}
        </>
    );
}
