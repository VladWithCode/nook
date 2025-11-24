import { DuckSVG } from "../svg/duck";
import { NookLogo } from "../svg/nook";

export function Footer() {
    return (
        <footer className="relative bottom-0 inset-x-0 z-0 px-6 pt-[15vw] pb-[25vw] bg-primary text-primary-foreground overflow-hidden space-y-8">
            <div className="absolute right-0 top-12 -translate-y-1/2 z-0">
                <DuckSVG className="h-full w-full transform-3d transform-[rotateY(180deg)_rotateZ(35deg)_translate(-10%,50%)] text-stone-200/20" />
            </div>
            <div className="relative z-10 space-y-4">
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
                    <p className="">Nos encantaría ayudarte a lograr tus ambiciones.</p>
                    <p>Trabajemos juntos.</p>
                    <a href="mailto:negocios@nook.com" className="text-lg text-primary-foreground underline underline-offset-2 mt-1">negocios@nook.com</a>
                </div>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                        <span className="bg-current size-2.5 rounded-full"></span>
                        <h3 className="font-bold">Redes sociales</h3>
                    </div>
                    <ul className="text-current/75">
                        <li>
                            <a href="https://facebook.com/nook">Facebook</a>
                        </li>
                        <li>
                            <a href="https://facebook.com/nook">Instagram</a>
                        </li>
                        <li>
                            <a href="https://facebook.com/nook">Facebook</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                        <span className="bg-current size-2.5 rounded-full"></span>
                        <h3 className="font-bold">Comunicate con nosotros</h3>
                    </div>
                    <ul className="text-current/75">
                        <li className="flex gap-2">
                            <p className=""></p>
                            <a href="https://facebook.com/nook">Facebook</a>
                        </li>
                        <li>
                            <a href="https://facebook.com/nook">Instagram</a>
                        </li>
                        <li>
                            <a href="https://facebook.com/nook">Facebook</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
