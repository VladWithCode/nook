import { getServicesContent } from "@/app/_lib/content";
import { ServicesClientPage } from "./_ServicesClientPage";
import { use } from "react";
import { ServicesContent } from "@/types/content";

export default function ServicesPage() {
    const contentPromise = getServicesContent();
    return <ServicesClientPage contentPromise={contentPromise} />;
}
