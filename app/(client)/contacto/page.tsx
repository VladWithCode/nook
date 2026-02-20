import { getContactContent } from "@/app/_lib/content";
import { PageContent } from "./pageContent";

export default function Page() {
    const contentPromise = getContactContent();

    return <PageContent contentPromise={contentPromise} />;
}
