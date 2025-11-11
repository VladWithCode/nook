import type { Metadata } from "next";
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
                {children}
            </body>
        </html>
    );
}
