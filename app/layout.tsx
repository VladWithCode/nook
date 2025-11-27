import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import Intro from "./Intro";

const mainFont = localFont({
    src: [
        {
            path: "../public/fonts/world_of_water.otf",
        },
    ],
    variable: "--font-main",
    display: "swap",
});

const secondaryFont = localFont({
    src: [
        {
            path: "../public/fonts/myriad_variable_c.ttf",
        },
    ],
    variable: "--font-secondary",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Nook: Minuciosa Perfección",
    description: "Nook: Minuciosa Perfección",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`relative z-0 ${mainFont.variable} ${secondaryFont.variable} antialiased bg-black`}
            >
                <Header />
                <main id="main-content">
                    <div className="fixed inset-0 w-screen h-dvh z-0 pointer-events-none">
                        <div
                            className="absolute -top-10 -left-10 w-[calc(100%+20rem)] h-[calc(100%+20rem)] bg-[url(/noise.png)] bg-center will-change-transform"
                            style={{
                                animation: "bg-noise 1s infinite steps(2)",
                            } as React.CSSProperties}
                        ></div>
                    </div>
                    <div className="relative z-10">
                        {children}
                    </div>
                </main>
                <Footer />
                <Intro />
            </body>
        </html>
    );
}
