import { getPortfolioContent } from "@/app/_lib/content";
import { Container } from "./container";

export default function Page() {
    const contentPromise = getPortfolioContent();
    return (
        <Container contentPromise={contentPromise} />
    );
}
