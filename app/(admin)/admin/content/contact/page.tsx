import { getContactContent } from "@/app/_lib/content";
import PageContent from "./pageContent";

export default function ContactContentPage() {
    const contentPromise = getContactContent();

    return <PageContent contentPromise={contentPromise} />;
}
