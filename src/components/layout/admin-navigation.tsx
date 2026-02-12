'use client';

import Link from "next/link";
import { NookLogo } from "../svg/nook";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function AdminNavigation() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                    <Link href="/admin" className="flex items-center space-x-2">
                        <NookLogo className="h-6 w-6" />
                        <span className="font-bold text-xl">Admin</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/admin"
                            className="text-sm font-medium transition-colors hover:text-gray-300"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/admin-test"
                            className="text-sm font-medium transition-colors hover:text-gray-300"
                        >
                            Testing
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/">View Site</Link>
                    </Button>
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </header>
    );
}