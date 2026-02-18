"use server";

import { PortfolioContent } from "@/types/content";
import { savePortfolioContent } from "@/app/_lib/content";

export async function savePortfolioAction(content: PortfolioContent) {
    return savePortfolioContent(content)
        .then(() => ({ success: true }))
        .catch((err) => ({ success: false, error: err }));
}
