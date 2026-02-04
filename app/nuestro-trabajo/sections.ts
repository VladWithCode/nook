import { StaticImageData } from "next/image";
import byd from "../byd.webp";
import qnr1 from "../qnr1.webp";
import qnr2 from "../qnr2.webp";

export type TMediaImage = {
    kind: "image",
    src: string | StaticImageData,
    alt: string,
}

export type TMediaVideo = {
    kind: "video",
    src: string,
    mimeType: string,
}

export type TMedia = {
    width: number,
    height: number,
    position?: "left" | "right" | "full",
    mimeType?: string,
    key: string,
} & (TMediaImage | TMediaVideo);

export type TSection = {
    title: string,
    media: Array<TMedia>,
}

export const sections: Array<TSection> = [
    {
        title: "BYD",
        media: [
            {
                src: byd,
                alt: "Imagen de galería de la campaña BYD",
                kind: "image",
                width: 600,
                height: 600,
                key: "byd-image-1",
            },
            {
                src: "/byd.webm",
                kind: "video",
                width: 1080,
                height: 1920,
                position: "full",
                mimeType: "video/webm",
                key: "byd-video-1",
            },
        ],
    },
    {
        title: "Limpieza Q&R",
        media: [
            {
                src: qnr1,
                alt: "Imagen de la Q&R",
                kind: "image",
                width: 1080,
                height: 1620,
                key: "qnr-image-1",
            },
            {
                src: qnr2,
                alt: "Imagen de la campaña de Q&R",
                kind: "image",
                width: 1080,
                height: 1620,
                key: "qnr-image-2",
            },
            {
                src: "/qnr.webm",
                kind: "video",
                width: 720,
                height: 1280,
                position: "full",
                mimeType: "video/webm",
                key: "qnr-video-1",
            },
        ],
    },
];
