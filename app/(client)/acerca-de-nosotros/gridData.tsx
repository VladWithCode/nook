import gridBor from "./gridPics/gridBor.webp";
import gridBor2 from "./gridPics/gridBor2.png";
import gridCrea from "./gridPics/gridCrea.webp";
import gridCrea2 from "./gridPics/gridCrea2.png";
import gridCrea3 from "./gridPics/gridCrea3.webp";
import gridNeg from "./gridPics/gridNeg.webp";
import gridNeg2 from "./gridPics/gridNeg2.png";
import gridLume from "./gridPics/gridLume.webp";
import gridLume2 from "./gridPics/gridLume2.png";
import gridWand from "./gridPics/gridWand.webp";
import gridWand2 from "./gridPics/gridWand2.png";
import gridFru from "./gridPics/gridFru.webp";
import gridFru2 from "./gridPics/gridFru2.png";
import gridCh from "./gridPics/gridCh.webp";
import gridCh2 from "./gridPics/gridCh2.png";
import gridTat from "./gridPics/gridTat.webp";
import gridTat2 from "./gridPics/gridTat2.png";
import { StaticImageData } from "next/image";
import { ChevronsDown } from "lucide-react";
import { JSX } from "react";

export type TCol = {
    key: string,
    position: "left" | "center" | "right",
    animateTo: "left" | "up" | "down" | "right",
    cells: TCell[],
};

export type TCell = {
    key: string,
    heightRatio: number,
    animateTo?: "left" | "up" | "down" | "right",
} & (TCellImage | TCellComponent | TCellEmpty);

export type TCellEmpty = {
    kind: "empty",
    empty: true,
    heightRatio: number,
}

export type TCellComponent = {
    kind: "component",
    component: JSX.Element,
}

export type TCellImage = {
    kind: "image",
    src: string | StaticImageData,
    alt: string,
}

export const cols: Record<"left" | "center" | "right", TCol[]> = {
    left: [{
        key: "left",
        position: "left",
        animateTo: "left",
        cells: [{
            key: "grid-ch-1",
            kind: "image",
            src: gridCh,
            alt: "Imagen de galeria 1",
            heightRatio: .25,
        }, {
            key: "grid-bor-1",
            kind: "image",
            src: gridBor,
            alt: "Imagen de galeria 2",
            heightRatio: .5,
        }, {
            key: "grid-tat-1",
            kind: "image",
            src: gridTat,
            alt: "Imagen de galeria 3",
            heightRatio: 1 / 6,
        }],
    }, {
        key: "lefter",
        position: "left",
        animateTo: "left",
        cells: [{
            key: "grid-bor-2",
            kind: "image",
            src: gridBor2,
            alt: "Imagen de galeria 2",
            heightRatio: 4 / 6,
        },
        {
            key: "grid-crea-2",
            kind: "image",
            src: gridCrea2,
            alt: "Imagen de galeria 1",
            heightRatio: 2 / 6,
        }],
    },
    {
        key: "leftest",
        position: "left",
        animateTo: "left",
        cells: [{
            key: "grid-ch-2",
            kind: "image",
            src: gridCh2,
            alt: "Imagen de galeria 1",
            heightRatio: .2,
        },
        {
            key: "grid-neg-2",
            kind: "image",
            src: gridNeg2,
            alt: "Imagen de galeria 2",
            heightRatio: .5,
        }, {
            key: "grid-fru-2",
            kind: "image",
            src: gridFru2,
            alt: "Imagen de galeria 2",
            heightRatio: 1 / 3,
        }],
    },
    ],
    center: [{
        key: "center",
        position: "center",
        animateTo: "up",
        cells: [{
            key: "grid-crea-1",
            kind: "image",
            src: gridCrea,
            alt: "Imagen de galeria 1",
            heightRatio: .25,
        }, {
            key: "grid-neg-1",
            kind: "image",
            src: gridNeg,
            alt: "Imagen de galeria 2",
            heightRatio: 1,
        }, {
            key: "grid-empty-1",
            kind: "empty",
            empty: true,
            heightRatio: 3 / 4,
        }, {
            key: "grid-button-1",
            kind: "component",
            component: <Button />,
            heightRatio: 1,
        }],
    }],
    right: [{
        key: "right",
        position: "right",
        animateTo: "right",
        cells: [{
            key: "grid-lume-1",
            kind: "image",
            src: gridLume,
            alt: "Imagen de galeria 1",
            heightRatio: .6,
        }, {
            key: "grid-fru-1",
            kind: "image",
            src: gridFru,
            alt: "Imagen de galeria 2",
            heightRatio: .4,
        }, {
            key: "grid-wand-1",
            kind: "image",
            src: gridWand,
            alt: "Imagen de galeria 3",
            heightRatio: .2,
        }],
    },
    {
        key: "righter",
        position: "right",
        animateTo: "right",
        cells: [{
            key: "grid-lume-2",
            kind: "image",
            src: gridLume2,
            alt: "Imagen de galeria 1",
            heightRatio: 2 / 6,
        },
        {
            key: "grid-fru-2",
            kind: "image",
            src: gridFru2,
            alt: "Imagen de galeria 2",
            heightRatio: 4 / 7,
        }],
    },
    {
        key: "rightest",
        position: "right",
        animateTo: "right",
        cells: [{
            key: "grid-wand-2",
            kind: "image",
            src: gridWand2,
            alt: "Imagen de galeria 1",
            heightRatio: 1 / 3,
        }, {
            key: "grid-tat-2",
            kind: "image",
            src: gridTat2,
            alt: "Imagen de galeria 1",
            heightRatio: 1 / 3,
        }, {
            key: "grid-crea-3",
            kind: "image",
            src: gridCrea3,
            alt: "Imagen de galeria 1",
            heightRatio: .3,
        }],
    }],
};

function Button() {
    return (
        <div className="h-12 flex items-center bg-blue-100 basis-auto grow-0 shrink-0 rounded-full animated-grid-cell animated-grid-cell-center" data-animatable-cell="down">
            <ChevronsDown className="mx-auto" />
        </div>
    );
}
