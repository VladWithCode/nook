import type { Metadata } from "next";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import IntroWrapper from "./IntroWrapper";
import { Toaster } from "@/src/components/layout/toaster";
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
        <>
            <Header />
            <main id="main-content">
                <div className="fixed inset-0 w-screen h-dvh z-0 pointer-events-none overflow-hidden">
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
            <IntroWrapper />
            <Toaster />
        </>
    );
}
