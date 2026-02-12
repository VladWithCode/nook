import { AdminNavigation } from "@/src/components/layout/admin-navigation";
import { Toaster } from "@/src/components/layout/toaster";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-50">
            <AdminNavigation />
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
            <Toaster />
        </div>
    );
}