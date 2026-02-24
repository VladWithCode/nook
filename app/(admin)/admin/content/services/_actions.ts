"use server";

import { ServicesContent } from "@/types/content";
import { saveServicesContent } from "@/app/_lib/content";

export async function saveServicesAction(content: ServicesContent) {
    saveServicesContent(content);
    return { success: true };
}
