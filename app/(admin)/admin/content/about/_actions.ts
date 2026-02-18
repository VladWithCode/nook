"use server";

import { AboutContent } from "@/types/content";
import { saveAboutContent } from "@/app/_lib/content";

export async function saveAboutAction(content: AboutContent) {
    saveAboutContent(content);
    return { success: true };
}
