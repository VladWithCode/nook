import { getAboutContent } from "@/app/_lib/content";
import PageContent from "./pageContent";

export default function Page() {
    const contentPromise = getAboutContent();
    return <PageContent contentPromise={contentPromise} />;
}
