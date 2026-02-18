import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContentPage() {
    const pages = [
        {
            title: "Servicios",
            description: "Administra los servicios que ofrece Nook",
            href: "/admin/content/services",
        },
        {
            title: "Nuestro Trabajo",
            description: "Administra el portafolio de proyectos",
            href: "/admin/content/portfolio",
        },
        {
            title: "Acerca de Nosotros",
            description: "Administra el contenido de la página sobre Nook",
            href: "/admin/content/about",
        },
        {
            title: "Página de Contacto",
            description: "Administra la configuración de la página de contacto",
            href: "/admin/content/contact",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Gestión de Contenido</h1>
                <p className="text-white/70 mt-2">
                    Administra el contenido de las páginas públicas del sitio web
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {pages.map((page) => (
                    <Link
                        key={page.href}
                        href={page.href}
                        className="group relative flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">{page.title}</h2>
                            <ArrowUpRight className="h-5 w-5 text-white/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                        <p className="text-white/70">{page.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
