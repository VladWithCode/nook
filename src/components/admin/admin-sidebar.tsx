'use client';

import * as React from "react";
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Folder,
    Users,
    MessageSquare,
    BarChart3,
    List,
    UserCog,
    UserPlus,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { NookLogo } from "@/src/components/svg/nook";
import { useClerk } from "@clerk/nextjs";

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
    children?: NavItem[];
}

interface NavGroup {
    title: string;
    items: NavItem[];
}

const navigation: NavGroup[] = [
    {
        title: "",
        items: [
            {
                title: "Inicio",
                href: "/admin",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        title: "Gestión de Contenido",
        items: [
            {
                title: "Página Principal",
                href: "/admin/content/home",
                icon: FileText,
            },
            {
                title: "Servicios",
                href: "/admin/content/services",
                icon: Briefcase,
            },
            {
                title: "Nuestro Trabajo",
                href: "/admin/content/portfolio",
                icon: Folder,
            },
            {
                title: "Acerca de Nosotros",
                href: "/admin/content/about",
                icon: Users,
            },
            {
                title: "Página de Contacto",
                href: "/admin/content/contact",
                icon: MessageSquare,
            },
        ],
    },
    // {
    //   title: "Contactos",
    //   items: [
    //     {
    //       title: "Estadísticas",
    //       href: "/admin/contacts/stats",
    //       icon: BarChart3,
    //     },
    //     {
    //       title: "Detalles",
    //       href: "/admin/contacts/details",
    //       icon: List,
    //     },
    //   ],
    // },
    // {
    //   title: "Usuarios",
    //   items: [
    //     {
    //       title: "Lista de Usuarios",
    //       href: "/admin/users",
    //       icon: UserCog,
    //     },
    //     {
    //       title: "Crear Usuario",
    //       href: "/admin/users/new",
    //       icon: UserPlus,
    //     },
    //   ],
    // },
    // {
    //   title: "Perfil",
    //   items: [
    //     {
    //       title: "Configuración",
    //       href: "/admin/profile",
    //       icon: Settings,
    //     },
    //   ],
    // },
];

interface AdminSidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
    const pathname = usePathname();
    const { signOut } = useClerk();

    const isActive = (href: string) => {
        if (href === "/admin") {
            return pathname === "/admin";
        }
        return pathname.startsWith(href);
    };

    return (
        <TooltipProvider delayDuration={0}>
            <aside
                className={cn(
                    "fixed left-0 top-0 z-40 h-screen border-r border-white/10 bg-gray-950 transition-all duration-300",
                    collapsed ? "w-20" : "w-[280px]"
                )}
            >
                {/* Logo Section */}
                <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
                    <Link href="/admin" className="flex items-center gap-3">
                        <NookLogo className={cn("h-8 transition-all", collapsed ? "w-8" : "w-auto")} />
                        {!collapsed && (
                            <span className="font-bold text-xl text-white">Admin</span>
                        )}
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggle}
                        className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                    >
                        {collapsed ? (
                            <ChevronRight className="h-4 w-4" />
                        ) : (
                            <ChevronLeft className="h-4 w-4" />
                        )}
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex h-[calc(100vh-4rem)] flex-col overflow-y-auto p-4">
                    <div className="space-y-6">
                        {navigation.map((group, groupIndex) => (
                            <div key={groupIndex}>
                                {!collapsed && group.title && (
                                    <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                                        {group.title}
                                    </h3>
                                )}
                                <ul className="space-y-1">
                                    {group.items.map((item) => {
                                        const Icon = item.icon;
                                        const active = isActive(item.href);

                                        const navLink = (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                                                    active
                                                        ? "border-l-4 border-white bg-white/10 text-white"
                                                        : "text-white/70 hover:bg-white/5 hover:text-white",
                                                    collapsed ? "justify-center px-2" : ""
                                                )}
                                            >
                                                <Icon className={cn("h-5 w-5 shrink-0", active && "text-white")} />
                                                {!collapsed && <span>{item.title}</span>}
                                            </Link>
                                        );

                                        if (collapsed) {
                                            return (
                                                <Tooltip key={item.href}>
                                                    <TooltipTrigger asChild>{navLink}</TooltipTrigger>
                                                    <TooltipContent side="right" className="bg-gray-900 text-white">
                                                        {item.title}
                                                    </TooltipContent>
                                                </Tooltip>
                                            );
                                        }

                                        return navLink;
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Sign Out */}
                    <div className="mt-auto pt-6 border-t border-white/10">
                        <Button
                            onClick={() => signOut()}
                            variant="ghost"
                            className={cn(
                                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/5 hover:text-white cursor-pointer",
                                collapsed ? "justify-center px-2" : ""
                            )} >
                            <LogOut className="size-5" />
                            {!collapsed && <span>Cerrar Sesión</span>}
                        </Button>
                    </div>
                </nav>
            </aside>
        </TooltipProvider>
    );
}
