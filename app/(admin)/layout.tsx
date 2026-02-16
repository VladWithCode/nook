'use client';

import { useState } from "react";
import { AdminSidebar } from "@/src/components/admin/admin-sidebar";
import { Toaster } from "@/src/components/layout/toaster";
import { AdminOnly } from "@/components/auth/admin-only";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <AdminOnly fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-950">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-white">Acceso Denegado</h1>
                    <p className="text-white/70">Necesitas privilegios de administrador para acceder a esta página.</p>
                </div>
            </div>
        }>
            <div className="min-h-screen bg-gray-950 text-gray-50">
                <AdminSidebar 
                    collapsed={sidebarCollapsed} 
                    onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
                />
                <main className={`
                    transition-all duration-300
                    ${sidebarCollapsed ? "ml-20" : "ml-[280px]"}
                `}>
                    <div className="p-8">
                        {children}
                    </div>
                </main>
                <Toaster />
            </div>
        </AdminOnly>
    );
}
