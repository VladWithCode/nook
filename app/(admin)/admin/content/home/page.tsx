import { getHomeContent } from "@/app/_lib/content"
import { PageContent } from "./pageContent"

export default function Page() {
    const contentPromise = getHomeContent()
    return <PageContent contentPromise={contentPromise} />
}
