"use server";

import { ContactContent } from "@/types/content";
import { saveContactContent } from "@/app/_lib/content";

export async function saveContactAction(content: ContactContent) {
    saveContactContent(content);
    return { success: true };
}
