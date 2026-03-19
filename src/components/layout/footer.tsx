import Link from "next/link";
import { DuckSVG } from "../svg/duck";
import { NookLogo } from "../svg/nook";
import { LucideMail, MapPin, Phone } from "lucide-react";
import { TikTokSVG } from "../svg/tiktok";
import Instagram from "../svg/ig";
import { Facebook } from "../svg/fb";

export function Footer() {
    return (
        <footer className="relative bottom-0 inset-x-0 z-10 bg-primary text-primary-foreground overflow-hidden space-y-12 px-6 pt-[15vw]">
            <div className="absolute right-0 top-12 -translate-y-1/2 z-0">
                <DuckSVG className="h-full w-full transform-3d transform-[rotateY(180deg)_rotateZ(40deg)_translate(-6%,50%)] text-stone-200/20" />
            </div>
            <h2 className="flex flex-col gap-1 text-2xl">
                <div className="">
                    <NookLogo className="h-10" />
                </div>
                <span className="text-xs">
                    <i className="sr-only">Nook:</i>
                    <span className="inline-block">minuciosa</span>
                    &nbsp;
                    <span className="inline-block">perfección</span>
                </span>
            </h2>
            <div className="text-current/80">
                <p>Nos encantaría ayudarte a lograr tus ambiciones.</p>
                <p>Trabajemos juntos.</p>
                <a href="mailto:negocios@nook.com" className="text-primary-foreground underline underline-offset-2 mt-1">negocios@nook.com</a>
            </div>
            <div className="space-y-4">
                <div className="flex items-center gap-1.5">
                    <span className="bg-current size-2.5 rounded-full"></span>
                    <h3 className="font-bold">Redes sociales</h3>
                </div>
                <ul className="text-current/60 space-y-2">
                    <li>
                        <a
                            className="flex gap-3"
                            href="https://www.facebook.com/share/173ydBPkk6/?mibextid=wwXIfr"
                        >
                            <Facebook />
                            <span>Facebook</span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="flex gap-3"
                            href="https://www.instagram.com/nook_estudio.creativo?igsh=MW9hYW1ld2V4YTY5eQ%3D%3D&utm_source=qr"
                        >
                            <Instagram />
                            <span>Instagram</span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="flex gap-3"
                            href="https://www.tiktok.com/@nook.creativo?_r=1&_t=ZS-945el4NbI99"
                        >
                            <TikTokSVG />
                            <span>TikTok</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="space-y-4">
                <div className="flex items-center gap-1.5">
                    <span className="bg-current size-2.5 rounded-full"></span>
                    <h3 className="font-bold">Contactanos</h3>
                </div>
                <ul className="text-current/60 space-y-2">
                    <li className="flex gap-3">
                        <LucideMail />
                        <span>negocios@nook.com</span>
                    </li>
                    <li className="flex gap-3">
                        <Phone />
                        <span>618 822 2292</span>
                    </li>
                    <li className="flex gap-3">
                        <MapPin />
                        <span>Calle Nazas 100, Real Country, 34162 Durango, Dgo.</span>
                    </li>
                </ul>
            </div>
            <div className="text-center text-current/40 text-xs uppercase bg-slate-950 -mx-6 px-6 pt-6 pb-3 space-y-1.5">
                <p className="">NÖOK&copy; 2025</p>
                <ul className="flex justify-center gap-3">
                    <li>
                        <Link href="/terminos">Terminos de Servicio</Link>
                    </li>
                    <li>
                        <Link href="/privacidad">Politica de Privacidad</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
