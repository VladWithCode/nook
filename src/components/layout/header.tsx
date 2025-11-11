import Link from "next/link";
import { NookLogo } from "../svg/nook";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export function Header() {
    return (
        <header className="fixed top-0 inset-x-0 z-30 flex items-center">
            <div className="px-4">
                <Link href="/" className="py-2">
                    <NookLogo className="h-6" />
                </Link>
            </div>
            <div className="ml-auto">
                <Button variant="ghost">
                    <MenuIcon className="size-6" />
                </Button>
            </div>
        </header>
    );
}
