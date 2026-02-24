import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import "./globals.css";

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
            path: "../public/fonts/myriad_vf.ttf",
        },
    ],
    variable: "--font-secondary",
    display: "swap",
});

const secondaryFontItalic = localFont({
    src: [
        {
            path: "../public/fonts/myriad_vf_italic.ttf",
        },
    ],
    variable: "--font-secondary-italic",
    display: "swap",
})


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
        <ClerkProvider>
            <html lang="es">
                <body
                    className={`relative z-0 ${mainFont.variable} ${secondaryFont.variable} ${secondaryFontItalic.variable} antialiased bg-black text-gray-50`}
                >
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
